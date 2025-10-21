/**
 * Estilos para el componente LensTypeSection.
 * @typedef {Object} LensTypeSectionStyles
 * @property {string} container - Contenedor para una sección de tipo de lente.
 * @property {string} sectionTitle - Título de la sección (Lejos, Cerca, etc.).
 * @property {string} eyeGrid - Grilla para una fila de ojo (radio + campos).
 * @property {string} radioGroup - Contenedor para el input de radio y su label.
 * @property {string} radioInput - Estilos para el input de radio.
 * @property {string} eyeLabel - Etiqueta para "Ojo Derecho" / "Ojo Izquierdo" junto al radio.
 * @property {string} fieldSpan - Clase para que los campos de graduación ocupen 2 columnas.
 */
/** @type {LensTypeSectionStyles} */
export const lensTypeSectionStyles = {
  container:
    "col-span-full border-t border-gray-800 dark:border-gray-500 pt-4 mt-4 first:border-t-0 first:mt-0 first:pt-0",
  sectionTitle: "text-lg font-semibold",
  eyeGrid: "grid grid-cols-7 gap-4 items-center mt-2",
  radioGroup: "flex items-center gap-2",
  radioInput: "h-5 w-5 rounded",
  eyeLabel: "", // Se usa el label por defecto del input, se puede añadir estilo si es necesario.
  fieldSpan: "col-span-2",
};
