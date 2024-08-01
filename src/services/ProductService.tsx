import { Product } from '@/data/schema';
import axios, { AxiosResponse } from 'axios'

const PRODUCT_API_URL = process.env.NEXT_PUBLIC_SERVER_HOST + "/api/product/getAll";
const ADD_PRODUCT_API_URL = process.env.NEXT_PUBLIC_SERVER_HOST + "/api/product/add";
const PRODUCT_NAME_API_URL = process.env.NEXT_PUBLIC_SERVER_HOST + "/api/product/getName?id=";

class ProductService {

    getProducts() {
        return axios.get(PRODUCT_API_URL, { withCredentials: true });
    }

    getProductName(id) {
        return axios.get(PRODUCT_NAME_API_URL+ id, { withCredentials: true });
    }

    
    async addProduct(product: Product): Promise<AxiosResponse> {
        try {
        const response = await axios.post(
            ADD_PRODUCT_API_URL,
            {
            id: -1,
            name: product.name,
            url: product.url,
            offerId: -1,
            },
            { withCredentials: true }
        );
        return response;
        } catch (error) {
            console.error('Error adding product:', error);
            throw error; // Re-throw the error to be caught by the calling function
        }
    }
}

export default new ProductService();