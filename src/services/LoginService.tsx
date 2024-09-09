
import axios from 'axios';

const LOGIN_API_URL = process.env.NEXT_PUBLIC_SERVER_HOST + "/api/auth/login";
const CHANGE_PASSWORD_API_URL = process.env.NEXT_PUBLIC_SERVER_HOST + "/api/auth/set-password";
const LOGOUT_API_URL = process.env.NEXT_PUBLIC_SERVER_HOST + "/logout";
const GET_USER_API_URL = process.env.NEXT_PUBLIC_SERVER_HOST + "/api/auth/get-user";

class LoginService {
    checkUser(name: string, password: string) {
        return axios.post(LOGIN_API_URL, { 
            username: name,
            password: password
        }, { withCredentials : true });
    }

    logout() {
        return axios.post(LOGOUT_API_URL, {}, { withCredentials : true });
    }

    changePassword(password: string) {
        return axios.post(CHANGE_PASSWORD_API_URL, { 
            username: "[HIDDEN]",
            password: password}, 
            { withCredentials : true }); 
    }

    getUserFromSession() {
        return axios.get(GET_USER_API_URL, { withCredentials: true });
    }
}

const loginServiceInstance = new LoginService();
export default loginServiceInstance;