import { formFieldStyles } from "./Styles";

/**
 * Componente para un campo de formulario genérico con una etiqueta flotante.
 * Utiliza un fieldset y legend para un estilo y semántica mejorados.
 * @param {object} props - Propiedades del componente.
 * @param {string} props.label - El texto de la etiqueta para el campo.
 * @param {string} [props.type='text'] - El tipo de input (e.g., 'text', 'number', 'date').
 * @param {string} props.name - El nombre del campo, usado para el estado del formulario.
 * @param {Array<{value: string, label: string}>} [props.options] - Las opciones para un campo de tipo 'select'.
 * @param {boolean} props.disabled - Si el campo está deshabilitado.
 * @returns {JSX.Element}
 */
const FormField = ({
  label,
  type = "text",
  name,
  disabled,
  options,
  value,
  ...props
}) => {
  return (
    <fieldset
      className={`${formFieldStyles.fieldSet} ${
        disabled ? formFieldStyles.disabled : ""
      }`}
    >
      <legend className={formFieldStyles.legend}>{label}</legend>
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          className={formFieldStyles.textarea}
          disabled={disabled}
          value={value}
          {...props}
        />
      ) : type === "select" ? (
        <select
          id={name}
          name={name}
          className={formFieldStyles.input}
          disabled={disabled}
          value={value}
          {...props}
        >
          {options &&
            options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className={formFieldStyles.option}
                disabled={option.value === ""}
              >
                {option.label}
              </option>
            ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          className={formFieldStyles.input}
          step={type === "number" ? "any" : undefined}
          disabled={disabled}
          value={value}
          {...props}
        />
      )}
    </fieldset>
  );
};

export default FormField;
