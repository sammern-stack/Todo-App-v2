import { create } from "axios";
import { axiosConfig } from "@/config/axios.config";

const api = create(axiosConfig);

export default api;
