import axios from 'axios'

const STOCK_ALL_API_URL = process.env.NEXT_PUBLIC_SERVER_HOST + "/api/stock/getAllUser";
const STOCK_ID_API_URL = process.env.NEXT_PUBLIC_SERVER_HOST + "/api/stock/get?id=";

class StockService {

    getAllUserStocks() {
        return axios.get(STOCK_ALL_API_URL, { withCredentials: true });
    }

    getStock(id: string) {
        return axios.get(STOCK_ID_API_URL + id, { withCredentials: true });
    }
}

export default new StockService();