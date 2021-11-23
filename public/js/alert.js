import { _alertmarkup } from "./_markup";
export const alertType = ["success", "error", "info"];

const pendingTimeout = [];

export function showAlert(message, type) {
  if (pendingTimeout.length) {
    window.clearTimeout(pendingTimeout[0]);
    pendingTimeout.length = 0;
  }
  hideAlert();
  const borderColor =
    type === alertType[0] ? "green" : type === alertType[1] ? "red" : "yellow";
  let alertBox = _alertmarkup;
  alertBox = alertBox.replace("%COLOR%", borderColor);
  alertBox = alertBox.replace("%MESSAGE%", message);

  document.querySelector("body").insertAdjacentHTML("afterbegin", alertBox);

  const oberver = window.setTimeout(hideAlert, 4000);
  pendingTimeout.push(oberver);
}

export function hideAlert() {
  const alertBox = document.getElementById("alert-box");
  if (alertBox) {
    alertBox.parentElement.removeChild(alertBox);
  }
}
