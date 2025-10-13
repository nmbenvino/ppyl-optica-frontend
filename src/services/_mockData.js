/**
 * Este archivo contiene datos simulados (mock data) que imitan las respuestas
 * de la API del backend. Es útil para desarrollar el frontend sin necesidad
 * de una conexión real al servidor.
 */

/**
 * @typedef {Object} Eye
 * @property {number} id_eye
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
 * @property {Eye[]} lenss - Array de lentes
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
            type: "cerca",
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
