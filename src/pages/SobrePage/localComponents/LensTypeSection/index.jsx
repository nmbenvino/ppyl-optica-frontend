import FormField from "@components/FormField";

import { lensTypeSectionStyles } from "./Styles";

/**
 * Componente específico para una opción de tipo de lente (Lejos, Cerca, Bifocal).
 * Incluye el radio button y los campos de graduación para ambos ojos.
 * @param {object} props - Propiedades del componente.
 * @param {'lejos' | 'cerca' | 'bifocal'} props.type - El tipo de lente que representa esta sección.
 * @param {string} props.label - La etiqueta para el radio button (e.g., "Lejos").
 * @param {boolean} props.disabled - Si los campos están deshabilitados.
 * @param {Function} props.onChange - El manejador de cambios para los inputs.
 * @param {object} props.value - El objeto de estado del formulario (`formData`).
 * @returns {JSX.Element}
 */
const LensTypeSection = ({ type, label, disabled, onChange, value }) => {
  const isOdSelected = value.tipo_lente_od === type;
  const isOiSelected = value.tipo_lente_oi === type;

  return (
    <div className={lensTypeSectionStyles.container} key={type}>
      <label className={lensTypeSectionStyles.sectionTitle}>{label}</label>
      <div className={lensTypeSectionStyles.eyeGrid}>
        {/* Col 1: Radio Button (OI) */}
        <div className={lensTypeSectionStyles.radioGroup}>
          <input
            type="radio"
            id={`check_oi_${type}`}
            name="tipo_lente_oi"
            value={type}
            disabled={disabled}
            onChange={onChange}
            checked={isOiSelected}
            className={lensTypeSectionStyles.radioInput}
          />
          <label
            htmlFor={`check_oi_${type}`}
            className={lensTypeSectionStyles.eyeLabel}
          >
            Ojo Izquierdo
          </label>
        </div>

        {/* Col 2, 3, 4: FormFields (OI) */}
        <div className={lensTypeSectionStyles.fieldSpan}>
          <FormField
            label="Esf"
            type="number"
            name={`${type}_oi_esf`}
            onChange={onChange}
            value={value[`${type}_oi_esf`] || ""}
            disabled={!isOiSelected || disabled}
          />
        </div>
        <div className={lensTypeSectionStyles.fieldSpan}>
          <FormField
            label="Cil"
            type="number"
            name={`${type}_oi_cil`}
            onChange={onChange}
            value={value[`${type}_oi_cil`] || ""}
            disabled={!isOiSelected || disabled}
          />
        </div>
        <div className={lensTypeSectionStyles.fieldSpan}>
          <FormField
            label="Eje"
            type="number"
            name={`${type}_oi_eje`}
            onChange={onChange}
            value={value[`${type}_oi_eje`] || ""}
            disabled={!isOiSelected || disabled}
          />
        </div>
      </div>
      <div className={lensTypeSectionStyles.eyeGrid}>
        {/* Col 1: Radio Button (OD) */}
        <div className={lensTypeSectionStyles.radioGroup}>
          <input
            type="radio"
            id={`check_od_${type}`}
            name="tipo_lente_od"
            value={type}
            disabled={disabled}
            onChange={onChange}
            checked={isOdSelected}
            className={lensTypeSectionStyles.radioInput}
          />
          <label
            htmlFor={`check_od_${type}`}
            className={lensTypeSectionStyles.eyeLabel}
          >
            Ojo Derecho
          </label>
        </div>

        {/* Col 2, 3, 4: FormFields (OD) */}
        <div className={lensTypeSectionStyles.fieldSpan}>
          <FormField
            label="Esf"
            type="number"
            name={`${type}_od_esf`}
            onChange={onChange}
            value={value[`${type}_od_esf`] || ""}
            disabled={!isOdSelected || disabled}
          />
        </div>
        <div className={lensTypeSectionStyles.fieldSpan}>
          <FormField
            label="Cil"
            type="number"
            name={`${type}_od_cil`}
            onChange={onChange}
            value={value[`${type}_od_cil`] || ""}
            disabled={!isOdSelected || disabled}
          />
        </div>
        <div className={lensTypeSectionStyles.fieldSpan}>
          <FormField
            label="Eje"
            type="number"
            name={`${type}_od_eje`}
            onChange={onChange}
            value={value[`${type}_od_eje`] || ""}
            disabled={!isOdSelected || disabled}
          />
        </div>
      </div>
    </div>
  );
};

export default LensTypeSection;
