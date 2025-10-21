/**
 * @typedef {Object} ButtonStyles
 * @property {string} base - Estilos base para todos los botones.
 * @property {string} primary - Estilo para botones de acción principal.
 * @property {string} secondary - Estilo para botones de acción secundaria.
 * @property {string} danger - Estilo para botones de acción peligrosa (eliminar).
 * @property {string} disabled - Estilo para botones deshabilitados.
 */

/** @type {ButtonStyles} */
export const buttonStyles = {
  base: "py-2 px-4 rounded-md font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 inline-flex items-center justify-center",
  primary: "bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-500 text-white",
  secondary:
    "bg-gray-500 hover:bg-gray-700 text-white dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white",
  danger: "bg-red-600 hover:bg-red-900 text-white dark:hover:bg-red-400",
  disabled:
    "bg-gray-300 opacity-50 text-gray-500 cursor-not-allowed dark:bg-gray-500 dark:text-gray-300",
};
