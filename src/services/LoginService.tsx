import axios from 'axios'



const LOGIN_API_URL = "http://80.114.173.193:8080/api/auth/login";

class LoginService {

    checkUser(name, password) {
        return axios.post(LOGIN_API_URL, { 
            username: name,
            password: password
        }, { withCredentials : true });
    }
}

export default new LoginService();