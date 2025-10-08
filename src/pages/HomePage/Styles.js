/**
 * @typedef {Object} HomePageStyles
 * @property {string} container - Clases para el contenedor principal de la página.
 * @property {Object} button - Clases para los diferentes tipos de botones.
 * @property {string} button.primary - Estilo para botones de acción principal.
 * @property {string} button.secondary - Estilo para botones de acción secundaria.
 * @property {string} button.danger - Estilo para botones de acción peligrosa (eliminar).
 * @property {string} button.disabled - Estilo para botones deshabilitados.
 * @property {string} input - Clases para los campos de entrada de texto y fecha.
 */

/** @type {HomePageStyles} */
export const homePageStyles = {
  container:
    "bg-gray-100 w-full min-h-screen text-gray-900 dark:bg-gray-900 dark:text-white p-4 md:p-8",
  button: {
    base: "py-2 px-4 rounded-md font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900",
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary:
      "bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700 dark:text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    disabled:
      "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-500 dark:text-gray-300",
  },
  input:
    "bg-white border border-gray-300 rounded-md p-2 w-full focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white",
};
