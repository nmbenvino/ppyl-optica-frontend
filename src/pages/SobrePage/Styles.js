/**
 * Estilos para la sección de Información General.
 * @typedef {Object} GeneralInfoStyles
 * @property {string} grid - Grilla para los campos de información general.
 * @property {string} newCustomerToggleContainer - Contenedor para el toggle de cliente nuevo.
 * @property {string} dateFieldContainer - Contenedor para el campo de fecha.
 * @property {string} sobreNumberFieldContainer - Contenedor para el campo de número de sobre.
 * @property {string} dniSearchFieldContainer - Contenedor para el campo de búsqueda por DNI.
 */
/** @type {GeneralInfoStyles} */
export const generalInfoStyles = {
  grid: "p-6 grid grid-cols-1 md:grid-cols-4 gap-4",
  newCustomerToggleContainer: "md:col-span-4 flex items-center",
  dateFieldContainer: "md:col-span-2",
  sobreNumberFieldContainer: "md:col-span-2",
  dniSearchFieldContainer: "col-span-2",
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
 * @property {string} headerContainer - Contenedor para el encabezado fijo de la página.
 * @property {string} headerTitle - Estilo para el título dentro del encabezado.
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
  headerContainer:
    "flex justify-between items-center sticky top-0 z-10 bg-gray-100 dark:bg-gray-900 py-4 mb-6 -mx-4 md:-mx-8 px-4 md:px-8 border-b",
  headerTitle: "mb-0",
};
