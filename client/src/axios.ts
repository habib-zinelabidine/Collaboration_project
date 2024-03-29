import axios from "axios";

export const baseURL = "http://localhost:3000/";
const httpClient = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
export default httpClient;
