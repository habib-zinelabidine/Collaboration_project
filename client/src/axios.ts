import axios from 'axios'

const baseURL = "http://localhost:3000/"
const httpClient = axios.create({baseURL});
export default httpClient;