/**
 * @typedef {Object} SobrePageStyles
 * @property {string} container - Clases para el contenedor principal de la página.
 * @property {string} formContainer - Clases para el contenedor del formulario.
 * @property {string} section - Clases para cada sección del formulario (fieldset).
 * @property {string} sectionTitle - Clases para el título de cada sección (legend).
 * @property {string} fieldSet - Estilo para el fieldset que envuelve un input.
 * @property {string} legend - Estilo para la leyenda (label) de un campo.
 * @property {string} input - Clases para los campos de entrada.
 * @property {string} textarea - Clases para los campos de área de texto.
 */

/** @type {SobrePageStyles} */
export const sobrePageStyles = {
  container:
    "bg-gray-100 w-full min-h-screen text-gray-900 dark:bg-gray-900 dark:text-white p-4 md:p-8",
  formContainer: "space-y-8",
  section: "border border-gray-300 dark:border-gray-700 rounded-lg",
  sectionTitle:
    "text-xl font-semibold px-2 text-blue-600 dark:text-blue-400 ml-4", // ml-4 para alinear con los fieldsets de abajo
  fieldSet:
    "border border-gray-300 dark:border-gray-600 rounded-md px-3 pt-2 pb-1",
  legend: "text-sm font-medium px-1 text-gray-600 dark:text-gray-400",
  input:
    "bg-transparent w-full focus:outline-none text-gray-900 dark:text-white disabled:bg-gray-200 dark:disabled:bg-gray-800",
  textarea:
    "bg-transparent w-full h-24 focus:outline-none text-gray-900 dark:text-white disabled:bg-gray-200 dark:disabled:bg-gray-800 resize-none",
};
