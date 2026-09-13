import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // ปรับให้ตรงกับ Port Backend ของคุณ
});

export default api;