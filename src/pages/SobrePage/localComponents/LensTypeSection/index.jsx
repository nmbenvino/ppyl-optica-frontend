import FormField from "@components/FormField"; // eslint-disable-line no-unused-vars

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
 * @param {'crear' | 'editar' | 'ver' | 'eliminar'} [props.action] - La acción actual de la página padre.
 * @returns {JSX.Element}
 */
const LensTypeSection = ({
  type,
  label,
  disabled,
  onChange,
  value,
  action,
}) => {
  const isOdSelected = value.tipo_lente_od === type;
  const isOiSelected = value.tipo_lente_oi === type;

  /**
   * Componente interno para evitar la repetición de los campos de graduación.
   * @param {{eye: 'od' | 'oi', isSelected: boolean}} props
   * @returns {JSX.Element}
   */
  const GraduationFields = ({ eye, isSelected }) => {
    return (
      <>
        <div className={lensTypeSectionStyles.fieldSpan}>
          <FormField
            label="Esf"
            type="number"
            name={`${type}_${eye}_esf`}
            onChange={onChange}
            value={value[`${type}_${eye}_esf`] || ""}
            disabled={
              !isSelected ||
              disabled ||
              action === "ver" ||
              action === "eliminar"
            }
          />
        </div>
        <div className={lensTypeSectionStyles.fieldSpan}>
          <FormField
            label="Cil"
            type="number"
            name={`${type}_${eye}_cil`}
            onChange={onChange}
            value={value[`${type}_${eye}_cil`] || ""}
            disabled={
              !isSelected ||
              disabled ||
              action === "ver" ||
              action === "eliminar"
            }
          />
        </div>
        <div className={lensTypeSectionStyles.fieldSpan}>
          <FormField
            label="Eje"
            type="number"
            name={`${type}_${eye}_eje`}
            onChange={onChange}
            value={value[`${type}_${eye}_eje`] || ""}
            disabled={
              !isSelected ||
              disabled ||
              action === "ver" ||
              action === "eliminar"
            }
          />
        </div>
      </>
    );
  };

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
            disabled={
              disabled ||
              action === "editar" ||
              action === "ver" ||
              action === "eliminar"
            }
            onClick={onChange}
            checked={isOiSelected}
            className={lensTypeSectionStyles.radioInput}
          />
          <label
            htmlFor={`check_oi_${type}`}
            className={`${lensTypeSectionStyles.eyeLabel} ${
              isOiSelected ? lensTypeSectionStyles.selected : ""
            }`}
          >
            Ojo Izquierdo
          </label>
        </div>

        {/* Col 2, 3, 4: FormFields (OI) */}
        <GraduationFields eye="oi" isSelected={isOiSelected} />
      </div>
      <div className={lensTypeSectionStyles.eyeGrid}>
        {/* Col 1: Radio Button (OD) */}
        <div className={lensTypeSectionStyles.radioGroup}>
          <input
            type="radio"
            id={`check_od_${type}`}
            name="tipo_lente_od"
            value={type}
            disabled={
              disabled ||
              action === "editar" ||
              action === "ver" ||
              action === "eliminar"
            }
            onClick={onChange}
            checked={isOdSelected}
            className={lensTypeSectionStyles.radioInput}
          />
          <label
            htmlFor={`check_od_${type}`}
            className={`${lensTypeSectionStyles.eyeLabel} ${
              isOdSelected ? lensTypeSectionStyles.selected : ""
            }`}
          >
            Ojo Derecho
          </label>
        </div>

        {/* Col 2, 3, 4: FormFields (OD) */}
        <GraduationFields eye="od" isSelected={isOdSelected} />
      </div>
    </div>
  );
};

export default LensTypeSection;
