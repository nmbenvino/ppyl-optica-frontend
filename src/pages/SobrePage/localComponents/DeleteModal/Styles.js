/**
 * Estilos para el componente DeleteModal utilizando Tailwind CSS.
 * @typedef {Object} DeleteModalStyles
 * @property {string} overlay - Estilos para el fondo oscuro/overlay.
 * @property {string} content - Estilos para el contenedor del modal (incluye modo oscuro).
 * @property {string} title - Estilos para el título de advertencia.
 * @property {string} message - Estilos para el mensaje descriptivo.
 * @property {string} actions - Estilos para el contenedor de botones.
 */
export const deleteModalStyles = {
  overlay: "fixed inset-0 bg-black/50 flex items-center justify-center z-50",
  content:
    "bg-white dark:bg-gray-800 p-6 rounded-lg max-w-[500px] w-[90%] shadow-lg text-center",
  title: "text-xl font-bold mb-4 text-red-600 dark:text-red-400",
  message: "mb-6 text-gray-600 dark:text-gray-300 leading-normal",
  actions: "flex justify-end gap-3",
};
