/**
 * @typedef {Object} HomePageStyles
 * @property {string} container - Clases para el contenedor principal de la página.
 * @property {string} header - Contenedor para el título y los botones de acción.
 * @property {string} title - Título principal de la página.
 * @property {string} actionsContainer - Contenedor para los botones de acción.
 * @property {string} input - Clases para los campos de entrada de texto y fecha.
 * @property {string} filtersContainer - Contenedor para la sección de filtros. * @property {string} filterGroup - Contenedor para un grupo de filtro (label + input).
 * @property {string} radioInput - Estilos para el input de radio en la tabla. * @property {string} filterLabel - Estilo para las etiquetas de los filtros.
 */

/** @type {HomePageStyles} */
export const homePageStyles = {
  container:
    "bg-gray-100 w-full min-h-screen text-gray-900 dark:bg-gray-900 dark:text-white p-4 md:p-8",
  error: "align-center text-4xl font-bold",
  header: "flex justify-between items-center mb-6",
  title: "text-3xl font-bold",
  actionsContainer: "flex gap-2",
  filtersContainer:
    "mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg border border-black dark:border-gray-500 flex items-end gap-4",
  filterGroup: "flex-grow", // Ahora se usa como clase de contenedor para FormField
  radioInput:
    "form-radio h-5 w-5 text-blue-600 bg-gray-200 border-gray-300 dark:bg-gray-700 dark:border-gray-600 focus:ring-blue-500",
};
