/**
 * Este archivo contiene datos simulados (mock data) que imitan las respuestas
 * de la API del backend. Es útil para desarrollar el frontend sin necesidad
 * de una conexión real al servidor.
 */

/**
 * @typedef {Object} Eye
 * @property {number} id_eye
 * @property {'cerca' | 'lejos' | 'bifocal'} type
 * @property {'od' | 'oi'} eye
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
 * @property {Eye[]} eyes
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
 * @property {Partial<Customer>} [cliente] - Cliente asociado, puede ser parcial.
 */

/**
 * Simula la respuesta para el endpoint `/filtrar_customer`.
 * @type {{cliente: Customer, sobres: Sobre[]}}
 */
export const mockFilteredCustomerResponse = {
  cliente: {
    id_customer: 123,
    customer_name: "Juan",
    last_name: "Pérez",
    dni: 12345678,
    address: "Calle Falsa 123",
    phone: "1234-5678",
  },
  sobres: [
    {
      id_sobre: 456,
      sobre_number: 7890,
      social_work: "OSDE",
      billing: "Factura A",
      recipe: "Receta 1",
      observations: "Lente antireflex",
      total: 1500.0,
      advance_payment: 500.0,
      pay: 1000.0,
      sobre_date: "2024-07-15",
      glasses: {
        id_glasses: 111,
        color: "Negro",
        frame: "Metal",
        organic: "Sí",
        mineral: "No",
        eyes: [
          {
            id_eye: 1001,
            type: "cerca",
            eye: "od",
            esf: -1.25,
            cil: -0.5,
            eje: 90,
          },
          {
            id_eye: 1002,
            type: "cerca",
            eye: "oi",
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
    // Copiamos el sobre de Juan Pérez y le añadimos la info del cliente
    {
      ...mockFilteredCustomerResponse.sobres[0],
      cliente: {
        id_customer: 123,
        customer_name: "Juan",
        last_name: "Pérez",
      },
    },
    // Agregamos otro sobre para tener más datos
    {
      id_sobre: 457,
      sobre_number: 7891,
      social_work: "Swiss Medical",
      billing: "Factura B",
      recipe: "Receta 2",
      observations: "Lentes de sol con graduación",
      total: 3200.0,
      advance_payment: 1200.0,
      pay: 2000.0,
      sobre_date: "2024-07-20",
      cliente: {
        id_customer: 124,
        customer_name: "Maria",
        last_name: "Gomez",
      },
      glasses: {
        id_glasses: 112,
        color: "Marrón",
        frame: "Plástico",
        organic: "Sí",
        mineral: "No",
        eyes: [
          {
            id_eye: 1003,
            type: "lejos",
            eye: "od",
            esf: -2.0,
            cil: -0.75,
            eje: 180,
          },
          {
            id_eye: 1004,
            type: "lejos",
            eye: "oi",
            esf: -2.25,
            cil: -0.5,
            eje: 175,
          },
        ],
      },
    },
  ],
};
