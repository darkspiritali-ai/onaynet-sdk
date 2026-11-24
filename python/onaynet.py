"""
Official OnayNet REST API v1 Python Client (Python 3.8+)
Zero third-party dependencies — built on standard library `urllib.request`.

Documentation: https://onaynet.co/en/api-docs
Turkish Docs:  https://onaynet.co/tr/api-docs
"""

import json
import time
import urllib.error
import urllib.parse
import urllib.request
from typing import Any, Dict, List, Optional, Union


class OnayNetError(Exception):
    """Exception raised for OnayNet REST API v1 errors."""

    def __init__(self, message: str, status: int = 0, code: str = "ONAYNET_API_ERROR", details: Any = None):
        super().__init__(message)
        self.message = message
        self.status = status
        self.code = code
        self.details = details


class OnayNetClient:
    """
    Official Python SDK for OnayNet Non-VoIP Physical GSM SIM Verification API v1.
    Supports 190+ countries including US (+1 Tier-1 carriers), UK (+44), EU, and Turkey (+90).
    """

    def __init__(
        self,
        api_key: str,
        base_url: str = "https://onaynet.co/api/v1",
        timeout_sec: int = 15,
    ) -> None:
        if not api_key or not isinstance(api_key, str):
            raise OnayNetError(
                "An OnayNet API key (onay_live_...) is required. Generate one at https://onaynet.co/en/profile",
                status=401,
                code="MISSING_API_KEY",
            )
        self.api_key = api_key.strip()
        self.base_url = base_url.rstrip("/")
        self.timeout_sec = timeout_sec

    def _request(self, method: str, path: str, body: Optional[Dict[str, Any]] = None) -> Any:
        url = f"{self.base_url}{path}"
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "X-API-Key": self.api_key,
            "Accept": "application/json",
            "User-Agent": "onaynet-sdk-python/1.0.0 (+https://onaynet.co/en/api-docs)",
        }
        data_bytes: Optional[bytes] = None
        if body is not None:
            headers["Content-Type"] = "application/json"
            data_bytes = json.dumps(body).encode("utf-8")

        req = urllib.request.Request(url, data=data_bytes, headers=headers, method=method)
        try:
            with urllib.request.urlopen(req, timeout=self.timeout_sec) as resp:
                raw = resp.read().decode("utf-8")
                payload = json.loads(raw) if raw else {}
                if isinstance(payload, dict) and payload.get("success") is False:
                    raise OnayNetError(
                        payload.get("error") or "API request failed",
                        status=resp.status,
                        code=payload.get("code", "API_REQUEST_FAILED"),
                        details=payload,
                    )
                return payload.get("data", payload) if isinstance(payload, dict) else payload
        except urllib.error.HTTPError as exc:
            err_body = exc.read().decode("utf-8", errors="replace")
            try:
                err_json = json.loads(err_body)
            except Exception:
                err_json = {"error": err_body}
            raise OnayNetError(
                err_json.get("error") or f"HTTP {exc.code} on {method} {path}",
                status=exc.code,
                code=err_json.get("code", "HTTP_ERROR"),
                details=err_json,
            ) from exc

    def get_balance(self) -> Dict[str, Any]:
        """Returns current wallet balance, account email, and currency (USD)."""
        return self._request("GET", "/balance")

    def list_countries(self) -> List[Dict[str, Any]]:
        """Lists all 190+ country IDs (e.g. '187' for USA +1, '16' for UK +44, '62' for Turkey +90)."""
        return self._request("GET", "/countries")

    def list_services(self, country: Union[str, int] = "187") -> List[Dict[str, Any]]:
        """Lists real-time physical SIM inventory and prices for a country."""
        q = urllib.parse.urlencode({"country": str(country)})
        return self._request("GET", f"/services?{q}")

    def buy_number(
        self,
        service: str,
        country: Union[str, int] = "187",
        operator: str = "any",
    ) -> Dict[str, Any]:
        """Allocates a dedicated Non-VoIP E.164 phone number for the given service and country."""
        return self._request(
            "POST",
            "/orders/buy",
            {"service": service.lower(), "country": str(country), "operator": operator},
        )

    def get_order(self, order_id: Union[int, str]) -> Dict[str, Any]:
        """Polls live SS7/SMPP gateway for incoming SMS and returns `sms_code` and `status`."""
        return self._request("GET", f"/orders/{urllib.parse.quote(str(order_id))}")

    def cancel_order(self, order_id: Union[int, str]) -> Dict[str, Any]:
        """Cancels an active order where no SMS arrived and triggers a 100% atomic refund."""
        return self._request("POST", f"/orders/{urllib.parse.quote(str(order_id))}/cancel")

    def finish_order(self, order_id: Union[int, str]) -> Dict[str, Any]:
        """Marks an order that already received an SMS code as completed."""
        return self._request("POST", f"/orders/{urllib.parse.quote(str(order_id))}/finish")

    def wait_for_otp(
        self,
        order_id: Union[int, str],
        poll_interval_sec: float = 3.0,
        timeout_sec: float = 120.0,
        auto_cancel_on_timeout: bool = True,
    ) -> Dict[str, Any]:
        """Polls an order until `sms_code` arrives, or auto-cancels and refunds on timeout."""
        deadline = time.time() + timeout_sec
        while time.time() < deadline:
            state = self.get_order(order_id)
            if state.get("sms_code"):
                return state
            if state.get("status") in ("CANCELLED", "EXPIRED"):
                raise OnayNetError(
                    f"Order #{order_id} ended with status {state.get('status')}",
                    status=410,
                    code="ORDER_CLOSED",
                    details=state,
                )
            time.sleep(poll_interval_sec)

        if auto_cancel_on_timeout:
            try:
                self.cancel_order(order_id)
            except Exception:
                pass
        raise OnayNetError(
            f"OTP timeout after {int(timeout_sec)}s for order #{order_id}",
            status=408,
            code="OTP_TIMEOUT",
        )
