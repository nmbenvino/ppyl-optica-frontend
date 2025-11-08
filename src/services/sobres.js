/**
 * Este archivo contiene todos los servicios para interactuar con la API de sobres.
 */
import { handleMockRequest } from "@services/_mockData.js";

const API_BASE_URL = "http://localhost:8000";
const USE_MOCK_DATA = false; // Cambiar a false para usar la API real

/**
 * Realiza una petición fetch y maneja la respuesta y los errores.
 * @param {string} endpoint - El endpoint de la API al que se va a llamar.
 * @param {RequestInit} options - Las opciones para la petición fetch (método, body, headers, etc.).
 * @returns {Promise<any>} La respuesta de la API en formato JSON.
 * @throws {Error} Si la respuesta de la red no es 'ok'.
 */
const apiFetch = async (endpoint, options = {}) => {
  // --- Simulación con mock data ---
  if (USE_MOCK_DATA) {
    return handleMockRequest(endpoint);
  }

  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  const response = await fetch(url, defaultOptions);

  if (!response.ok) {
    let errorDetail = `Error ${response.status}: ${response.statusText}`;
    try {
      const errorData = await response.json();
      // La API devuelve el mensaje en la propiedad 'detail'
      errorDetail = errorData.detail || JSON.stringify(errorData);
    } catch (e) {
      // Si el cuerpo del error no es JSON, usamos el statusText.
    }
    throw new Error(errorDetail);
  }

  return response.json();
};

/**
 * Obtiene sobres filtrando por DNI y/o rango de fechas.
 * Corresponde al endpoint `/getSobre`.
 * @param {Object} filters - Objeto con los filtros.
 * @param {number|null} filters.dni - DNI del cliente a buscar.
 * @param {string|null} filters.date_ini - Fecha de inicio (opcional, YYYY-MM-DD).
 * @param {string|null} filters.date_fin - Fecha de fin (opcional, YYYY-MM-DD).
 * @returns {Promise<{data: Sobre[]}>} La lista de sobres.
 */
export const getSobres = ({ dni = null, date_ini = null, date_fin = null, id_sobre = null }) => {
  const params = new URLSearchParams();
  if (dni) params.append("dni", dni);
  if (date_ini) params.append("fecha_ini", date_ini);
  if (date_fin) params.append("fecha_fin", date_fin);
  if (id_sobre) params.append("id_sobre", id_sobre);

  const queryString = params.toString();
  return apiFetch(`/sobre/getSobre${queryString ? `?${queryString}` : ""}`, {
    method: "GET",
  });
};

/**
 * Crea un nuevo sobre.
 * Corresponde al endpoint `/add_sobre`.
 * @param {Object} data - Los datos del sobre, cliente y lentes, según la especificación de la API.
 * @returns {Promise<Object>} El mensaje de éxito.
 */
export const addSobre = (data) => {
  return apiFetch("/sobre/add_sobre", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

/**
 * Elimina un sobre por su número.
 * Corresponde al endpoint `/deleteSobre`.
 * @param {Object} params - Los parámetros para eliminar.
 * @param {number} params.dni - El DNI del cliente asociado al sobre.
 * @param {number} params.sobre_number - El número del sobre a eliminar.
 * @returns {Promise<Object>} El mensaje de éxito.
 */
export const deleteSobre = ({ dni, sobre_number }) => {
  return apiFetch("/sobre/deleteSobre", {
    method: "DELETE",
    body: JSON.stringify({ dni, sobre_number }),
  });
};

/**
 * Actualiza un sobre existente.
 * Corresponde al endpoint `/update_sobre`.
 * @param {Object} data - Los datos a actualizar. El `sobre_number` es obligatorio para identificar el sobre.
 * @returns {Promise<Object>} El mensaje de éxito.
 */
export const updateSobre = (data) => {
  return apiFetch("/sobre/update_sobre", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};

/**
 * Obtiene el siguiente número de sobre disponible.
 * Corresponde al endpoint `/getNumeroSobre`.
 * @returns {Promise<number>} El siguiente número de sobre.
 */
export const getNumeroSobre = () => {
  return apiFetch("/sobre/getNumeroSobre", {
    method: "GET",
  });
};

/**
 * Obtiene una lista de todos los clientes.
 * Corresponde al endpoint `/customers`.
 * @returns {Promise<Customer[]>} Una lista de todos los clientes.
 */
export const getCustomers = () => {
  return apiFetch(`/customers`, {
    method: "GET",
  });
};
y
/**
 * Actualiza un cliente existente por DNI.
 * Corresponde al endpoint `/customers/{dni}`.
 * @param {number} dni - El DNI original del cliente a actualizar.
 * @param {Object} data - Los datos del cliente a modificar (customer_name, last_name, dni, address, phone).
 * @returns {Promise<Object>} El mensaje de éxito.
 */
export const updateCustomer = (dni, data) => {
  return apiFetch(`/customers/${dni}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};
