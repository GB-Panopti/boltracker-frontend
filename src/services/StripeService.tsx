
import axios from 'axios';

const CHECKOUT_API_URL = process.env.NEXT_PUBLIC_SERVER_HOST + "/api/stripe/create-checkout-session";
const VERIFY_API_URL = process.env.NEXT_PUBLIC_SERVER_HOST + "/api/stripe/verify-payment";


class StripeService {
    createCheckoutSession() {
        axios.get(CHECKOUT_API_URL, { withCredentials : true }).then(response => {
            window.location.assign(response.data);
        }); 
    }

    verifyPayment(sessionId: string) {
        return axios.get(VERIFY_API_URL + "?session_id=" + sessionId)
    }
}

const stripeServiceInstance = new StripeService();
export default stripeServiceInstance;