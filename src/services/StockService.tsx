import axios from "axios";

const STOCK_ALL_API_URL =
  process.env.NEXT_PUBLIC_SERVER_HOST + "/api/stock/getDailySales";
const STOCK_DATERANGE_API_URL =
  process.env.NEXT_PUBLIC_SERVER_HOST + "/api/stock/getAllDateRange";
const STOCK_ID_API_URL =
  process.env.NEXT_PUBLIC_SERVER_HOST + "/api/stock/get?id=";

class StockService {
  getAllUserStocks() {
    return axios.get(STOCK_ALL_API_URL, { withCredentials: true });
  }

  getAllUserStockDateRange(start: Date | undefined, end: Date | undefined) {
    const url =
      STOCK_DATERANGE_API_URL +
      "?start=" +
      start?.toISOString().split("T")[0] +
      "&end=" +
      end?.toISOString().split("T")[0];
    return axios.get(url, { withCredentials: true });
  }

  getStock(id: string) {
    return axios.get(STOCK_ID_API_URL + id, { withCredentials: true });
  }
}

const stockServiceInstance = new StockService();
export default stockServiceInstance;
