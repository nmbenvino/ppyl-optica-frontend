/**
 * Este archivo contiene datos simulados (mock data) que imitan las respuestas
 * de la API del backend. Es útil para desarrollar el frontend sin necesidad
 * de una conexión real al servidor.
 */

/**
 * @typedef {Object} Lens
 * @property {number} id_lens
 * @property {'cerca' | 'lejos' | 'bifocal'} type - El tipo de lente
 * @property {'od' | 'oi'} lens - El lado del ojo (Ojo Derecho / Ojo Izquierdo)
 * @property {number} esf
 * @property {number} cil
 * @property {number} eje
 */

/**
 * @typedef {Object} Glasses
 * @property {number} id_glasses
 * @property {string} color
 * @property {string} frame
 * @property {string} organic
 * @property {string} mineral
 * @property {Lens[]} lenss - Array de lentes
 */

/**
 * @typedef {Object} Customer
 * @property {number} id_customer
 * @property {string} customer_name
 * @property {string} last_name
 * @property {number} dni
 * @property {string} address
 * @property {string} phone
 */

/**
 * @typedef {Object} Sobre
 * @property {number} id_sobre
 * @property {number} sobre_number
 * @property {string} social_work
 * @property {string} billing
 * @property {string} recipe
 * @property {string} observations
 * @property {number} total
 * @property {number} advance_payment
 * @property {number} pay
 * @property {string} sobre_date - Formato YYYY-MM-DD
 * @property {Glasses} glasses
 * @property {Customer} cliente - Cliente asociado al sobre.
 */

/**
 * Simula la respuesta para el endpoint `/filtrar_customer`.
 * @type {{cliente: Customer, sobres: Sobre[]}}
 */
export const mockFilteredCustomerResponse = {
  sobres: [
    {
      id_sobre: 456,
      sobre_number: 7890,
      social_work: "OSDE",
      billing: "Factura A",
      recipe: "Receta 1",
      observations: "Lente antireflex",
      total: 15000.0,
      advance_payment: 500.0,
      pay: 14500.0,
      sobre_date: "2025-10-02",
      cliente: {
        id_customer: 123,
        customer_name: "Juan",
        last_name: "Pérez",
        dni: 12345678,
        address: "Calle Falsa 123",
        phone: "1234-5678",
      },
      glasses: {
        id_glasses: 111,
        color: "Negro",
        frame: "Metal",
        organic: "Sí",
        mineral: "No",
        lenss: [
          {
            id_lens: 1001,
            type: "cerca",
            lens: "od",
            esf: -1.25,
            cil: -0.5,
            eje: 90,
          },
          {
            id_lens: 1002,
            type: "lejos",
            lens: "oi",
            esf: -1.0,
            cil: -0.25,
            eje: 80,
          },
        ],
      },
    },
  ],
};

/**
 * Simula la respuesta para el endpoint `/get_all_sobres`.
 * @type {{sobres: Sobre[]}}
 */
export const mockAllSobresResponse = {
  sobres: [
    // Sobre de Juan Pérez (el mismo que en la respuesta filtrada)
    mockFilteredCustomerResponse.sobres[0],
    // Agregamos otro sobre para tener más datos
    {
      id_sobre: 457,
      sobre_number: 7891,
      social_work: "Swiss Medical",
      billing: "Factura B",
      recipe: "Receta 2",
      observations: "Lentes de sol con graduación",
      total: 32000.0,
      advance_payment: 1200.0,
      pay: 30800.0,
      sobre_date: "2025-10-12",
      cliente: {
        id_customer: 124,
        customer_name: "Maria",
        last_name: "Gomez",
        dni: 23456789,
        address: "Av. Siempre Viva 123",
        phone: "5555-4321",
      },
      glasses: {
        id_glasses: 112,
        color: "Marrón",
        frame: "Plástico",
        organic: "Sí",
        mineral: "No",
        lenss: [
          {
            id_lens: 1003,
            type: "lejos",
            lens: "od",
            esf: -2.0,
            cil: -0.75,
            eje: 180,
          },
          {
            id_lens: 1004,
            type: "lejos",
            lens: "oi",
            esf: -2.25,
            cil: -0.5,
            eje: 175,
          },
        ],
      },
    },
  ],
};

/**
 * Simula la respuesta para el endpoint `/customers`.
 * @type {{customers: Customer[]}}
 */
export const mockAllCustomersResponse = {
  customers: [
    {
      id_customer: 123,
      customer_name: "Juan",
      last_name: "Pérez",
      dni: 12345678,
      address: "Calle Falsa 123",
      phone: "1234-5678",
    },
    {
      id_customer: 124,
      customer_name: "Maria",
      last_name: "Gomez",
      dni: 23456789,
      address: "Av. Siempre Viva 123",
      phone: "5555-4321",
    },
  ],
};

const MOCK_DELAY = 500; // Simula la latencia de la red

/**
 * Simula una llamada a la API, devolviendo datos de prueba después de un retraso.
 * A futuro se va a eliminar cuando ya este todo funcionando al 100%.
 * @param {string} endpoint - El endpoint de la API que se está simulando.
 * @returns {Promise<any>} Una promesa que resuelve con los datos simulados.
 */
export const handleMockRequest = (endpoint) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const [path, queryString] = endpoint.split("?");
      const params = new URLSearchParams(queryString);
      console.log(
        `[MOCK] Calling endpoint: ${path}`,
        Object.fromEntries(params)
      );

      switch (path) {
        case "/getNumeroSobre":
          // Simula la obtención del siguiente número de sobre.
          // En un caso real, esto sería dinámico.
          // Si no hay sobres, el backend devuelve 1.
          resolve(mockAllSobresResponse.sobres.length + 1);
          break;
        case "/getSobre":
          // Simula tanto la búsqueda por DNI como la general (que antes era get_all_sobres)
          {
            const dni = params.get("dni");
            const date_ini = params.get("fecha_ini");
            const date_fin = params.get("fecha_fin");
            const id_sobre = params.get("id_sobre");
            let filteredData = mockAllSobresResponse.sobres;

            if (id_sobre) {
              // Filtrar por ID de sobre específico
              filteredData = filteredData.filter(
                (sobre) => sobre.id_sobre === Number(id_sobre)
              );
            } else if (dni) {
              filteredData = filteredData.filter(
                (sobre) => sobre.cliente.dni === Number(dni)
              );
            }

            if (date_ini && date_fin) {
              filteredData = filteredData.filter(
                (sobre) =>
                  sobre.sobre_date >= date_ini && sobre.sobre_date <= date_fin
              );
            }
            resolve({ data: filteredData });
          }
          break;
        case "/customers":
          resolve(mockAllCustomersResponse.customers);
          break;
        case (path.match(/^\/customers\/\d+$/) || {}).input: {
          const dni = Number(path.split("/")[2]);
          const customer = mockAllCustomersResponse.customers.find(
            (c) => c.dni === dni
          );
          if (customer) {
            resolve(customer);
          } else {
            // En un caso real, esto sería un reject, pero para el mock resolvemos con null o un objeto de error.
            resolve(null);
          }
          break;
        }
        case "/add_sobre":
          resolve({ message: "agregado exitosamente" });
          break;
        case "/update_sobre":
          resolve({ message: "actualizacion exitosa" });
          break;
        case "/deleteSobre":
          resolve({ detail: "Sobre eliminado correctamente" });
          break;
      }
    }, MOCK_DELAY);
  });
};
