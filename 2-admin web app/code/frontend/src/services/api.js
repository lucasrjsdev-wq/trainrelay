import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8000/api",
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("tr_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authService = {
  login: (username, password, captchaToken) =>
    api.post("/login", { username, password, captcha_token: captchaToken }),

  logout: () => api.post("/logout"),

  me: () => api.get("/me"),

  forgotPassword: (email) =>
    api.post("/forgot-password", { email }),

  resetPassword: (email, token, password, passwordConfirmation) =>
    api.post("/reset-password", {
      email,
      token,
      password,
      password_confirmation: passwordConfirmation,
    }),

  registrarse: ({ nombre, apellido, email, username, tipo }) =>
    api.post("/registrarse", { nombre, apellido, email, username, tipo }),
};

export const usuarioService = {
  listar:          (params)      => api.get("/usuarios", { params }),
  obtener:         (id)          => api.get(`/usuarios/${id}`),
  actualizar:      (id, data)    => api.put(`/usuarios/${id}`, data),
  actualizarEstado:(id, estado)  => api.patch(`/usuarios/${id}/estado`, { estado }),
  chequearSuscripcion: (id) => api.post(`/usuarios/${id}/chequear-suscripcion`),
  suspender:           (id) => api.post(`/usuarios/${id}/suspender`),
  rehabilitar: (id) => api.post(`/usuarios/${id}/rehabilitar`),
  subirFoto: (id, file) => {
    const formData = new FormData();
    formData.append("foto", file);
    return api.post(`/usuarios/${id}/foto`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

export const dashboardService = {
  resumenUsuarios:    (params) => api.get("/dashboard/resumen-usuarios", { params }),
  registrosPorMes:    (params) => api.get("/dashboard/registros-por-mes", { params }),
  suscripcionesPorMes:(params) => api.get("/dashboard/suscripciones-por-mes", { params }),
  usuariosPorPais:    (params) => api.get("/dashboard/usuarios-por-pais", { params }),
};

export default api;
