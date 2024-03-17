import axios from 'axios'

const PRODUCT_API_URL = "http:/80.114.173.193:8080/api/product/getAll";
const ADD_PRODUCT_API_URL = "http:/80.114.173.193:8080/api/product/add";
const PRODUCT_NAME_API_URL = "http:/80.114.173.193:8080/api/product/getName?id=";

class ProductService {

    getProducts() {
        return axios.get(PRODUCT_API_URL, { withCredentials: true });
    }

    getProductName(id) {
        return axios.get(PRODUCT_NAME_API_URL+ id, { withCredentials: true });
    }

    addProduct(product) {
        return axios.post(ADD_PRODUCT_API_URL, product, { withCredentials: true });
    }
}

export default new ProductService();