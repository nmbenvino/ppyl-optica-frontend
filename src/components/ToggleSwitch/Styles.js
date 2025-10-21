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
