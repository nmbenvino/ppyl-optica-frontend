/**
 * @typedef {Object} HomePageStyles
 * @property {string} container - Clases para el contenedor principal de la página.
 * @property {string} header - Contenedor para el título y los botones de acción.
 * @property {string} title - Título principal de la página.
 * @property {string} actionsContainer - Contenedor para los botones de acción.
 * @property {Object} button - Clases para los diferentes tipos de botones.
 * @property {string} button.base - Estilos base para todos los botones.
 * @property {string} button.primary - Estilo para botones de acción principal.
 * @property {string} button.secondary - Estilo para botones de acción secundaria.
 * @property {string} button.danger - Estilo para botones de acción peligrosa (eliminar).
 * @property {string} button.disabled - Estilo para botones deshabilitados.
 * @property {string} input - Clases para los campos de entrada de texto y fecha.
 * @property {string} filtersContainer - Contenedor para la sección de filtros.
 * @property {string} filterGroup - Contenedor para un grupo de filtro (label + input).
 * @property {string} filterLabel - Estilo para las etiquetas de los filtros.
 * @property {string} tableContainer - Contenedor para la tabla de sobres.
 * @property {string} table - Estilos para la tabla.
 * @property {string} tableHead - Estilos para el encabezado de la tabla.
 * @property {string} tableHeader - Estilos para las celdas del encabezado.
 * @property {string} tableRow - Estilos para las filas de la tabla.
 * @property {string} tableCell - Estilos para las celdas de la tabla.
 * @property {string} tableMessage - Estilo para mensajes dentro de la tabla (ej. "Cargando...").
 * @property {string} radioInput - Estilos para el input de radio en la tabla.
 */

/** @type {HomePageStyles} */
export const homePageStyles = {
  container:
    "bg-gray-100 w-full min-h-screen text-gray-900 dark:bg-gray-900 dark:text-white p-4 md:p-8",
  header: "flex justify-between items-center mb-6",
  title: "text-3xl font-bold",
  actionsContainer: "flex gap-2",
  button: {
    base: "py-2 px-4 rounded-md font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900",
    primary: "bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-500 text-white",
    secondary:
      "bg-gray-500 hover:bg-gray-700 text-white dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white",
    danger: "bg-red-600 hover:bg-red-900 text-white dark:hover:bg-red-400",
    disabled:
      "bg-gray-300 opacity-20 text-gray-500 cursor-not-allowed dark:bg-gray-500 dark:text-gray-300",
  },
  input:
    "bg-white border border-black rounded-md p-2 w-full focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:bg-gray-700 dark:border-gray-500 dark:text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
  filtersContainer:
    "mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg border border-black dark:border-gray-500 flex items-end gap-4",
  filterGroup: "flex-grow",
  filterLabel: "block text-sm font-medium mb-1",
  tableContainer:
    "overflow-x-auto bg-white dark:bg-gray-800 rounded-lg border border-black dark:border-gray-500",
  table: "min-w-full text-left",
  tableHead: "bg-gray-200 dark:bg-gray-700",
  tableHeader: "p-4 font-semibold",
  tableRow:
    "border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer",
  tableCell: "p-4",
  tableMessage: "p-4 text-center text-gray-500 dark:text-gray-400",
  radioInput:
    "form-radio h-5 w-5 text-blue-600 bg-gray-200 border-gray-300 dark:bg-gray-700 dark:border-gray-600 focus:ring-blue-500",
};
