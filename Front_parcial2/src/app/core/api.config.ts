/** URL base del backend Spring Boot. */
export const API_URL = 'http://localhost:8080/api';

/** Rutas del backend que NO llevan token (públicas). */
export const RUTAS_PUBLICAS = [
  `${API_URL}/public/`,
  `${API_URL}/auth/login`,
  `${API_URL}/auth/registro`,
  `${API_URL}/auth/existe/`,
];
