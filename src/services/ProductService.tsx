import { Product } from '@/data/schema';
import axios, { AxiosResponse } from 'axios'

const PRODUCT_API_URL = process.env.NEXT_PUBLIC_SERVER_HOST + "/api/product/getAll";
const ADD_PRODUCT_API_URL = process.env.NEXT_PUBLIC_SERVER_HOST + "/api/product/add";
const EDIT_PRODUCT_API_URL = process.env.NEXT_PUBLIC_SERVER_HOST + "/api/product/edit";
const DELETE_PRODUCT_API_URL = process.env.NEXT_PUBLIC_SERVER_HOST + "/api/product/delete";

class ProductService {

    getProducts() {
        return axios.get(PRODUCT_API_URL, { withCredentials: true });
    }

    async addProduct(product: Product): Promise<AxiosResponse> {
        try {
            const response = await axios.post(
                ADD_PRODUCT_API_URL, { id: -1, name: product.name, url: product.url, offerId: -1, }, { withCredentials: true }
            );
            return response;
        } catch (error) {
            console.error('Error adding product:', error);
            throw error; // Re-throw the error to be caught by the calling function
        }
    }
    
    async editProduct(id: number, name: string): Promise<AxiosResponse> {
        try {
            const response = await axios.post(
                EDIT_PRODUCT_API_URL,
                { id: id, name: name, }, 
                { withCredentials: true }
            );
            return response;
        } catch (error) {
            console.error('Error editing product:', error);
            throw error; // Re-throw the error to be caught by the calling function
        }
    }

    async deleteProduct(id: number): Promise<AxiosResponse> {
        try {
            console.log(
                DELETE_PRODUCT_API_URL + '?id=' + String(id),)
            const response = await axios.post(
                DELETE_PRODUCT_API_URL + '?id=' + String(id),
                { withCredentials: true }
            );
            return response;
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error; // Re-throw the error to be caught by the calling function
        }
    }
}

export default new ProductService();