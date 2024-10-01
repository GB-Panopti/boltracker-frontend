import axios from "axios";

const LOGIN_API_URL = process.env.NEXT_PUBLIC_SERVER_HOST + "/api/auth/login";
const CHANGE_EMAIL_API_URL =
  process.env.NEXT_PUBLIC_SERVER_HOST + "/api/auth/set-email";
const CHANGE_PASSWORD_API_URL =
  process.env.NEXT_PUBLIC_SERVER_HOST + "/api/auth/set-password";
const LOGOUT_API_URL = process.env.NEXT_PUBLIC_SERVER_HOST + "/logout";
const GET_USER_API_URL =
  process.env.NEXT_PUBLIC_SERVER_HOST + "/api/auth/get-user";
const SAVE_EMAIL_API_URL =
  process.env.NEXT_PUBLIC_SERVER_HOST + "/api/auth/save-email";
const UNSUBSCRIBE_API_URL =
  process.env.NEXT_PUBLIC_SERVER_HOST + "/api/auth/unsubscribe";
const FORGOTTEN_PASSWORD_API_URL = 
  process.env.NEXT_PUBLIC_SERVER_HOST + "/api/auth/forgotten-password";
const RESET_PASSWORD_API_URL = 
  process.env.NEXT_PUBLIC_SERVER_HOST + "/api/auth/reset-password";

class LoginService {
  checkUser(name: string, password: string) {
    return axios.post(
      LOGIN_API_URL,
      {
        username: name,
        password: password,
      },
      { withCredentials: true }
    );
  }

  logout() {
    return axios.post(LOGOUT_API_URL, {}, { withCredentials: true });
  }

  changeEmail(email: string) {
    return axios.post(
      CHANGE_EMAIL_API_URL,
      {
        username: email,
        password: "[HIDDEN]",
      },
      { withCredentials: true }
    );
  }

  changePassword(password: string) {
    return axios.post(
      CHANGE_PASSWORD_API_URL,
      {
        username: "[HIDDEN]",
        password: password,
      },
      { withCredentials: true }
    );
  }

  getUserFromSession() {
    return axios.get(GET_USER_API_URL, { withCredentials: true });
  }

  saveEmailAddr(emailAddr: string, source: string) {
    return axios.post(
      SAVE_EMAIL_API_URL,
      {
        email: emailAddr,
        source: source,
      },
      { withCredentials: true }
    );
  }

  cancelSubscription(reason: string, comment: string) {
    return axios.post(
      UNSUBSCRIBE_API_URL,
      { reason: reason, comment: comment },
      { withCredentials: true }
    );
  }

  forgottenPassword(email: string) {
    return axios.get(FORGOTTEN_PASSWORD_API_URL + "?email=" + email);
  }

  resetPassword(password: string) {
    // get the seed from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const seed = urlParams.get("seed");
    return axios.post(RESET_PASSWORD_API_URL, {
      seed: seed,
      password: password
    });
  }
}

const loginServiceInstance = new LoginService();
export default loginServiceInstance;
