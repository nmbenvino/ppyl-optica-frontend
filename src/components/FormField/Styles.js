/**
 * Estilos para el componente FormField.
 * @typedef {Object} FormFieldStyles
 * @property {string} fieldSet - Estilo para el fieldset que envuelve un input.
 * @property {string} legend - Estilo para la leyenda (label) de un campo.
 * @property {string} input - Clases para los campos de entrada.
 * @property {string} textarea - Clases para los campos de área de texto.
 * @property {string} disabled - Clases para el contenedor del campo cuando está deshabilitado.
 */
/** @type {FormFieldStyles} */
export const formFieldStyles = {
  fieldSet: "border border-black dark:border-gray-400 rounded-md px-3 pb-2",
  legend: "text-sm font-medium px-1 text-gray-600 dark:text-gray-400",
  input:
    "bg-transparent w-full focus:outline-none text-gray-900 dark:text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
  textarea:
    "bg-transparent w-full h-24 focus:outline-none text-gray-900 dark:text-white resize-none",
  disabled:
    "bg-gray-200 dark:bg-gray-900 bg-[repeating-linear-gradient(45deg,rgba(0,0,0,0.05),rgba(0,0,0,0.05)_10px,transparent_10px,transparent_20px)] dark:bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.09),rgba(255,255,255,0.09)_10px,transparent_10px,transparent_20px)] bg-[length:28px_28px] animate-stripes",
  option: "dark:bg-gray-900 dark:text-white",
};
