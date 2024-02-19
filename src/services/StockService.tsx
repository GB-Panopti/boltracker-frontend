import axios from 'axios'

const STOCK_ALL_API_URL = "http://localhost:8080/api/stock/getAll";
const STOCK_ID_API_URL = "http://localhost:8080/api/stock/get?id=";

class StockService {

    getAllStocks() {
        return axios.get(STOCK_ALL_API_URL, { withCredentials: true });
    }

    getStock(id) {
        return axios.get(STOCK_ID_API_URL + id, { withCredentials: true });
    }
}

export default new StockService();