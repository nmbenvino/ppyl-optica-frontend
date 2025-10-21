/**
 * Estilos para el componente FormSection.
 * @typedef {Object} FormSectionStyles
 * @property {string} section - Clases para cada sección del formulario (fieldset).
 * @property {string} sectionTitle - Clases para el título de cada sección (legend).
 * @property {string} sectionGrid - Clases para la grilla de campos dentro de una sección.
 */
/** @type {FormSectionStyles} */
export const formSectionStyles = {
  section:
    "border bg-white dark:bg-gray-800 border-black dark:border-gray-400 rounded-lg",
  sectionTitle:
    "text-xl font-semibold px-2 text-blue-600 dark:text-blue-400 ml-4",
  sectionGrid: "p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
};
