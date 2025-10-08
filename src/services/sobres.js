/**
 * Este archivo contiene todos los servicios para interactuar con la API de sobres.
 */

const API_BASE_URL = "http://localhost:3000/api"; // Cambia esto por la URL real de tu backend
const USE_MOCK_DATA = true;
const MOCK_DELAY = 500;

/**
 * Realiza una petición fetch y maneja la respuesta y los errores.
 * @param {string} endpoint - El endpoint de la API al que se va a llamar.
 * @param {RequestInit} options - Las opciones para la petición fetch (método, body, headers, etc.).
 * @returns {Promise<any>} La respuesta de la API en formato JSON.
 * @throws {Error} Si la respuesta de la red no es 'ok'.
 */
const apiFetch = async (endpoint, options = {}) => {
  // Inicio del mock, despues se va a eliminar junto con USE_MOCK_DATA (linea 6) Y MOCK_DELAY (linea 7)
  if (USE_MOCK_DATA) {
    const mockData = await import("@services/_mockData.js");
    return new Promise((resolve) => {
      setTimeout(() => {
        switch (endpoint) {
          case "/get_all_sobres":
            resolve(mockData.mockAllSobresResponse);
            break;
          case "/filtrar_customer":
            resolve(mockData.mockFilteredCustomerResponse);
            break;
          default:
            resolve({ message: "Operación simulada exitosa" });
            break;
        }
      }, MOCK_DELAY);
    });
  }
  // Fin del mock

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
 * Obtiene todos los sobres dentro de un rango de fechas.
 * Corresponde al endpoint `/get_all_sobres`.
 * @param {string} date_ini - Fecha de inicio (formato YYYY-MM-DD).
 * @param {string} date_fin - Fecha de fin (formato YYYY-MM-DD).
 * @returns {Promise<Object>} La lista de sobres.
 */
export const getSobresByMonth = (date_ini, date_fin) => {
  return apiFetch("/get_all_sobres", {
    method: "POST",
    body: JSON.stringify({ date_ini, date_fin }),
  });
};

/**
 * Filtra sobres por nombre de cliente y/o rango de fechas.
 * Corresponde al endpoint `/filtrar_customer`.
 * @param {Object} filters - Objeto con los filtros.
 * @param {string} filters.username - Nombre del cliente a buscar.
 * @param {string|null} filters.date_ini - Fecha de inicio (opcional).
 * @param {string|null} filters.date_fin - Fecha de fin (opcional).
 * @returns {Promise<Object>} Los datos del cliente y sus sobres.
 */
export const filterCustomer = ({ username, date_ini, date_fin }) => {
  return apiFetch("/filtrar_customer", {
    method: "POST",
    body: JSON.stringify({ username, date_ini, date_fin }),
  });
};

/**
 * Crea un nuevo sobre.
 * Corresponde al endpoint `/add_sobre`.
 * @param {Object} data - Los datos del sobre y del cliente (si es nuevo).
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
 * Corresponde al endpoint `/del_sobre`.
 * @param {number} sobre_number - El número del sobre a eliminar.
 * @returns {Promise<Object>} El mensaje de éxito.
 */
export const deleteSobre = (sobre_number) => {
  return apiFetch("/del_sobre", {
    method: "DELETE", // Usamos DELETE, pero el cuerpo se envía como en la especificación.
    body: JSON.stringify({ sobre_number }),
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
    method: "PUT", // PUT o PATCH son semánticamente correctos para actualizaciones.
    body: JSON.stringify(data),
  });
};

/**
 * Busca un usuario para precargar sus datos.
 * Esta función podría reutilizar `filterCustomer` o apuntar a un nuevo endpoint si fuera necesario.
 * @param {string} username - El nombre del usuario a buscar.
 * @returns {Promise<Object>} Los datos del cliente y sus sobres.
 */
export const searchUser = (username) => {
  // Reutilizamos la función de filtro, pasando fechas nulas.
  return filterCustomer({ username, date_ini: null, date_fin: null });
};
