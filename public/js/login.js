import axios from "axios";
import { showAlert, alertType } from "./alert";

const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("login_btn");
const form = document.getElementById("login_form");

if (form) {
  form.addEventListener("submit", async function (e) {
    try {
      e.preventDefault();
      loginBtn.innerText = "Please wait...";
      const userData = { email: email.value, password: password.value };
      await axios.post("/api/v1/auth/login", userData);
      loginBtn.innerText = "Sign In";
      location.assign("/admin");
    } catch (error) {
      loginBtn.innerText = "Sign In";
      showAlert(error.response.data.message, alertType[1]);
    }
  });
}
