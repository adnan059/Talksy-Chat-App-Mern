import axios from "axios";
import { Base_Url } from "../constants";
export const axiosInstance = axios.create({
  baseURL: `${Base_Url}/api`,
  withCredentials: true,
});
