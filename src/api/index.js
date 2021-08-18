import axios from "axios";

const endPointParibu = "https://www.paribu.com/ticker";
const endPointBinance = "https://api.binance.com/api/v3/ticker/24hr";

export const fetchParibuApi = async () => await axios.get(endPointParibu);
export const fetchBinanceApi = async () => await axios.get(endPointBinance);
