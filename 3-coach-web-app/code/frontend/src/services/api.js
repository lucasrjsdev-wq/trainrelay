import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8000/api",
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("tr_coach_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const coachService = {
  me: () => api.get("/me"),
  actualizarPerfil: (data) => api.put("/coach/perfil", data),
  cambiarPassword: (data) => api.put("/coach/password", data),
  iniciarSuscripcionMp: () => api.post("/coach/suscripcion/iniciar"),
};

export default api;
