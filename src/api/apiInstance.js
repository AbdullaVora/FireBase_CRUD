import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://fir-1-3f6df-default-rtdb.firebaseio.com",
})

export default axiosInstance;