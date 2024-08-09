import axios from 'axios'



const LOGIN_API_URL = process.env.NEXT_PUBLIC_SERVER_HOST + "/api/auth/login";

const LOGOUT_API_URL = process.env.NEXT_PUBLIC_SERVER_HOST + "/logout";

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
}

const loginServiceInstance = new LoginService();
export default loginServiceInstance;