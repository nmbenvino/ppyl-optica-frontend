/**
 * @typedef {Object} sobresTableStyles
 * @property {string} tableContainer - Contenedor para la tabla de sobres.
 * @property {string} table - Estilos para la tabla.
 * @property {string} tableHead - Estilos para el encabezado de la tabla.
 * @property {string} tableHeader - Estilos para las celdas del encabezado.
 * @property {string} tableRow - Estilos para las filas de la tabla.
 * @property {string} tableCell - Estilos para las celdas de la tabla.
 * @property {string} tableMessage - Estilo para mensajes dentro de la tabla (ej. "Cargando...").
 */

/** @type {sobresTableStyles} */
export const sobresTableStyles = {
  tableContainer:
    "overflow-x-auto bg-white dark:bg-gray-800 rounded-lg border border-black dark:border-gray-500",
  table: "min-w-full text-left",
  tableHead: "bg-gray-200 dark:bg-gray-700",
  tableHeader: "p-4 font-semibold",
  tableRow:
    "border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer",
  tableCell: "p-4",
  tableMessage: "p-4 text-center text-gray-500 dark:text-gray-400",
  tableMessageError:
    "p-4 text-2xl font-bold text-center text-red-500 dark:text-red-400",
};
