import { create } from "axios";

const api = create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
});

export default api;
