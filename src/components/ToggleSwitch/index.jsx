import { toggleSwitchStyles } from "./Styles";

/**
 * Componente para un interruptor de tipo toggle.
 * @param {object} props - Propiedades del componente.
 * @param {string} props.label - El texto que se muestra junto al toggle.
 * @param {boolean} props.checked - Si el toggle está activado.
 * @param {Function} props.onChange - El manejador de cambios.
 * @returns {JSX.Element}
 */
const ToggleSwitch = ({ label, checked, onChange }) => (
  <label className={toggleSwitchStyles.container}>
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className={toggleSwitchStyles.input}
    />
    <div className={toggleSwitchStyles.slider}></div>
    <span className={toggleSwitchStyles.text}>{label}</span>
  </label>
);

export default ToggleSwitch;
