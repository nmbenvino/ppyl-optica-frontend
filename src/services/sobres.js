/**
 * Este archivo contiene todos los servicios para interactuar con la API de sobres.
 */
import {
  mockAllSobresResponse,
  mockFilteredCustomerResponse,
} from "@services/_mockData.js";

const API_BASE_URL = "http://localhost:3000/api";
const USE_MOCK_DATA = true; // Cambiar a false para usar la API real
const MOCK_DELAY = 500; // Simula la latencia de la red

/**
 * Realiza una petición fetch y maneja la respuesta y los errores.
 * @param {string} endpoint - El endpoint de la API al que se va a llamar.
 * @param {RequestInit} options - Las opciones para la petición fetch (método, body, headers, etc.).
 * @returns {Promise<any>} La respuesta de la API en formato JSON.
 * @throws {Error} Si la respuesta de la red no es 'ok'.
 */
const apiFetch = async (endpoint, options = {}) => {
  // Inicio del mock, despues se va a eliminar junto con USE_MOCK_DATA (linea 10) Y MOCK_DELAY (linea 11)
  // --- Simulación con mock data ---
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(
          `[MOCK] Calling endpoint: ${endpoint}`,
          options.body ? JSON.parse(options.body) : ""
        );
        switch (endpoint) {
          case "/getSobre":
            // Simula tanto la búsqueda por DNI como la general (que antes era get_all_sobres)
            {
              const body = options.body ? JSON.parse(options.body) : {};
              let filteredData = mockAllSobresResponse.sobres;

              if (body.dni) {
                filteredData = filteredData.filter(
                  (sobre) => sobre.cliente.dni === body.dni
                );
              }

              if (body.date_ini && body.date_fin) {
                filteredData = filteredData.filter(
                  (sobre) =>
                    sobre.sobre_date >= body.date_ini &&
                    sobre.sobre_date <= body.date_fin
                );
              }
              resolve({ data: filteredData });
            }
            break;
          case "/add_sobre":
          case "/update_sobre":
          case "/deleteSobre":
          default:
            resolve({
              message: "Operación simulada exitosa",
              detail: `Endpoint ${endpoint} llamado.`,
            });
            break;
        }
      }, MOCK_DELAY);
    });
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
    const errorData = await response.json().catch(() => ({
      error: "Error desconocido en el servidor",
    }));
    throw new Error(errorData.error || `Error ${response.status}`);
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
 * @returns {Promise<{data: import('@services/_mockData').Sobre[]}>} La lista de sobres.
 */
export const getSobres = ({ dni = null, date_ini = null, date_fin = null }) => {
  return apiFetch("/getSobre", {
    method: "POST",
    body: JSON.stringify({ dni, date_ini, date_fin }),
  });
};

/**
 * Crea un nuevo sobre.
 * Corresponde al endpoint `/add_sobre`.
 * @param {Object} data - Los datos del sobre, cliente y lentes, según la especificación de la API.
 * @returns {Promise<Object>} El mensaje de éxito.
 */
export const addSobre = (data) => {
  return apiFetch("/add_sobre", {
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
  return apiFetch("/deleteSobre", {
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
  return apiFetch("/update_sobre", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};
