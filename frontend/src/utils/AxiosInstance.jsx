import axios from 'axios'

const AxiosInstance = axios.create({
    baseURL: "http://localhost:5000/api/"
});

AxiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Ambil token dari localStorage
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; // Tambahkan token ke header
    }
    return config; // Lanjutkan dengan request
}, (error) => {
    return Promise.reject(error); // Jika ada error, reject
});

AxiosInstance.interceptors.response.use(
    (respose) => respose,
    (error) => {
        if(error.response && error.response.status === 401) {
            console.log("Token Expired or Invalid");
            
            localStorage.removeItem('token');            
            // alert("Sesi login expired, tolong login lagi");

        }
        return Promise.reject(error);
    }
);

export default AxiosInstance;