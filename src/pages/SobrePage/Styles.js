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
};

/**
 * Estilos para el componente ToggleSwitch.
 * @typedef {Object} ToggleSwitchStyles
 * @property {string} container - Contenedor del toggle.
 * @property {string} input - Estilos para el input de checkbox oculto.
 * @property {string} slider - Estilos para el fondo del toggle.
 * @property {string} text - Estilos para el texto junto al toggle.
 */
/** @type {ToggleSwitchStyles} */
export const toggleSwitchStyles = {
  container: "relative inline-flex items-center cursor-pointer",
  input: "sr-only peer",
  slider:
    "w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600",
  text: "ml-3 text-sm font-medium text-gray-900 dark:text-gray-300",
};
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

/**
 * Estilos para el componente LensTypeSection.
 * @typedef {Object} LensTypeSectionStyles
 * @property {string} container - Contenedor para una sección de tipo de lente (lejos, cerca).
 * @property {string} radioContainer - Contenedor para el input de radio y su label.
 * @property {string} radioInput - Estilos para el input de radio.
 * @property {string} radioLabel - Estilos para el label del radio.
 * @property {string} grid - Grilla para los campos de graduación de un ojo.
 * @property {string} eyeLabel - Etiqueta para "Ojo Derecho" / "Ojo Izquierdo".
 */
/** @type {LensTypeSectionStyles} */
export const lensTypeSectionStyles = {
  container:
    "col-span-full border-t border-gray-800 dark:border-gray-500 pt-4 mt-4 first:border-t-0 first:mt-0 first:pt-0",
  radioContainer: "flex items-center gap-2 mb-4",
  radioInput: "h-5 w-5 rounded",
  radioLabel: "text-lg font-semibold",
  grid: "grid grid-cols-1 md:grid-cols-7 gap-4 items-center",
  eyeLabel: "font-bold text-lg self-center text-right pr-2",
};

/**
 * Estilos para la sección de Información General.
 * @typedef {Object} GeneralInfoStyles
 * @property {string} grid - Grilla para los campos de información general.
 */
/** @type {GeneralInfoStyles} */
export const generalInfoStyles = {
  grid: "p-6 grid grid-cols-1 md:grid-cols-4 gap-4",
};

/**
 * Estilos para la sub-sección de Detalles del Armazón.
 * @typedef {Object} LensDetailsStyles
 * @property {string} container - Contenedor para la sub-sección.
 * @property {string} title - Título de la sub-sección.
 * @property {string} grid - Grilla para los campos de detalles del armazón.
 */
/** @type {LensDetailsStyles} */
export const lensDetailsStyles = {
  container: "col-span-full",
  title: "text-lg font-semibold mb-4",
  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
};

/**
 * Estilos para la sección de Otros Campos.
 * @typedef {Object} OtherFieldsStyles
 * @property {string} grid - Grilla para la sección.
 * @property {string} span2 - Utilidad para que un campo ocupe 2 columnas.
 * @property {string} span4 - Utilidad para que un campo ocupe 4 columnas.
 */
/** @type {OtherFieldsStyles} */
export const otherFieldsStyles = {
  grid: "p-6 grid grid-cols-1 md:grid-cols-4 gap-4",
  span2: "md:col-span-2",
  span4: "md:col-span-4",
};

/**
 * Estilos para la sección de Detalles del Pago.
 * @typedef {Object} PaymentDetailsStyles
 * @property {string} grid - Grilla para los campos de detalles del pago.
 */
/** @type {PaymentDetailsStyles} */
export const paymentDetailsStyles = {
  grid: "p-6 grid grid-cols-1 md:grid-cols-3 gap-4",
};

/**
 * Estilos para la página SobrePage.
 * @typedef {Object} SobrePageStyles
 * @property {string} container - Clases para el contenedor principal de la página.
 * @property {string} pageTitle - Clases para el título principal de la página.
 * @property {string} formContainer - Clases para el contenedor del formulario.
 * @property {string} buttonContainer - Contenedor para los botones de acción del formulario.
 * @property {string} loadingText - Estilo para el texto de carga.
 * @property {string} errorText - Estilo para el texto de error.
 */
/** @type {SobrePageStyles} */
export const sobrePageStyles = {
  container:
    "bg-gray-100 min-h-screen text-gray-900 dark:bg-gray-900 dark:text-white px-4 pb-4 md:px-8 md:pb-8",
  pageTitle: "text-3xl font-bold capitalize",
  formContainer: "space-y-8 relative",
  buttonContainer: "flex justify-end gap-4",
  loadingText: "Cargando datos del sobre...",
  errorText: "text-red-500",
};
