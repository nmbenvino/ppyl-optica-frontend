import { Link, useParams } from "react-router-dom";
import { useSobrePage } from "./useSobrePage";
import { sobrePageStyles } from "./Styles";
import { homePageStyles } from "@pages/HomePage/Styles"; // Reutilizamos estilos de botones

/**
 * Componente para un campo de formulario genérico con una etiqueta flotante.
 * Utiliza un fieldset y legend para un estilo y semántica mejorados.
 * @param {object} props - Propiedades del componente.
 * @param {string} props.label - El texto de la etiqueta para el campo.
 * @param {string} [props.type='text'] - El tipo de input (e.g., 'text', 'number', 'date').
 * @param {string} props.name - El nombre del campo, usado para el estado del formulario.
 * @param {boolean} props.disabled - Si el campo está deshabilitado.
 * @returns {JSX.Element}
 */
const FormField = ({ label, type = "text", name, disabled, ...props }) => (
  <fieldset className={sobrePageStyles.fieldSet}>
    <legend className={sobrePageStyles.legend}>{label}</legend>
    {type === "textarea" ? (
      <textarea
        id={name}
        name={name}
        className={sobrePageStyles.textarea}
        disabled={disabled}
        {...props}
      />
    ) : (
      <input
        id={name}
        name={name}
        type={type}
        className={sobrePageStyles.input}
        step={type === "number" ? "any" : undefined}
        disabled={disabled}
        {...props}
      />
    )}
  </fieldset>
);

/**
 * Componente que renderiza una sección principal del formulario con un título.
 * @param {object} props - Propiedades del componente.
 * @param {string} props.title - El título de la sección.
 * @param {React.ReactNode} props.children - Los campos o contenido de la sección.
 * @returns {JSX.Element}
 */
const FormSection = ({ title, children }) => (
  <fieldset className={sobrePageStyles.section}>
    <legend className={sobrePageStyles.sectionTitle}>{title}</legend>
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {children}
    </div>
  </fieldset>
);

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
const LensTypeSection = ({ type, label, disabled, onChange, value }) => (
  <div className="col-span-full border-t border-gray-300 dark:border-gray-700 pt-4 mt-4 first:border-t-0 first:mt-0 first:pt-0">
    <div className="flex items-center gap-2 mb-4">
      <input
        type="radio"
        id={`check_${type}`}
        name="tipo_lente" // Nombre común para agrupar los radio buttons
        value={type} // El valor de este radio button es su tipo (e.g., "lejos")
        disabled={disabled}
        onChange={onChange}
        checked={value.tipo_lente === type} // Se marca si el valor en formData coincide
        className="h-5 w-5 rounded"
      />
      <label htmlFor={`check_${type}`} className="text-lg font-semibold">
        {label}
      </label>
    </div>
    {/* OD */}
    <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
      <span className="font-bold text-lg self-center text-right pr-2">
        Ojo Derecho
      </span>
      <div className="md:col-span-2">
        <FormField
          label="Esf"
          type="number"
          name={`${type}_od_esf`}
          onChange={onChange}
          value={value[`${type}_od_esf`] || ""}
          disabled={disabled}
        />
      </div>
      <div className="md:col-span-2">
        <FormField
          label="Cil"
          type="number"
          name={`${type}_od_cil`}
          onChange={onChange}
          value={value[`${type}_od_cil`] || ""}
          disabled={disabled}
        />
      </div>
      <div className="md:col-span-2">
        <FormField
          label="Eje"
          type="number"
          name={`${type}_od_eje`}
          onChange={onChange}
          value={value[`${type}_od_eje`] || ""}
          disabled={disabled}
        />
      </div>
    </div>
    {/* OI */}
    <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center mt-2">
      <span className="font-bold text-lg self-center text-right pr-2">
        Ojo Izquierdo
      </span>
      <div className="md:col-span-2">
        <FormField
          label="Esf"
          type="number"
          name={`${type}_oi_esf`}
          onChange={onChange}
          value={value[`${type}_oi_esf`] || ""}
          disabled={disabled}
        />
      </div>
      <div className="md:col-span-2">
        <FormField
          label="Cil"
          type="number"
          name={`${type}_oi_cil`}
          onChange={onChange}
          value={value[`${type}_oi_cil`] || ""}
          disabled={disabled}
        />
      </div>
      <div className="md:col-span-2">
        <FormField
          label="Eje"
          type="number"
          name={`${type}_oi_eje`}
          onChange={onChange}
          value={value[`${type}_oi_eje`] || ""}
          disabled={disabled}
        />
      </div>
    </div>
  </div>
);

/**
 * Página para crear, ver, editar o eliminar un Sobre.
 * El comportamiento del formulario se determina por los parámetros de la URL.
 * @returns {JSX.Element}
 */
const SobrePage = () => {
  const { action, id } = useParams();
  const { loading, error, isFormDisabled, formData, handleChange } =
    useSobrePage(action, id);

  /**
   * Determina la etiqueta del botón de envío según la acción actual.
   * @returns {string} La etiqueta del botón.
   */
  const getButtonLabel = () => {
    switch (action) {
      case "crear":
        return "Crear Sobre";
      case "editar":
        return "Guardar Cambios";
      case "eliminar":
        return "Eliminar Sobre";
      default:
        return "";
    }
  };

  /**
   * Determina la clase de estilo del botón de envío según la acción actual.
   * @returns {string} La clase de Tailwind para el botón.
   */
  const getButtonClass = () => {
    return action === "eliminar"
      ? homePageStyles.button.danger
      : homePageStyles.button.primary;
  };

  if (loading) {
    return (
      <div className={sobrePageStyles.container}>
        Cargando datos del sobre...
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${sobrePageStyles.container} text-red-500`}>
        Error: {error}
      </div>
    );
  }

  return (
    <div className={sobrePageStyles.container}>
      <h1 className="text-3xl font-bold mb-6 capitalize">
        {action} Sobre {id && `#${id}`}
      </h1>

      <form className={sobrePageStyles.formContainer}>
        {/* --- 1. Información General --- */}
        <fieldset className={sobrePageStyles.section}>
          <legend className={sobrePageStyles.sectionTitle}>
            Información General
          </legend>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              label="Fecha"
              type="date"
              name="fecha"
              disabled={isFormDisabled}
              onChange={handleChange}
              value={formData.fecha || ""}
            />
            <FormField
              label="N° Sobre"
              type="number"
              name="numero_sobre"
              disabled={isFormDisabled}
              onChange={handleChange}
              value={formData.numero_sobre || ""}
            />
            <FormField
              label="Cliente"
              type="text"
              name="cliente"
              disabled={isFormDisabled}
              onChange={handleChange}
              value={formData.cliente || ""}
            />
            <FormField
              label="Domicilio"
              type="text"
              name="domicilio"
              disabled={isFormDisabled}
              onChange={handleChange}
              value={formData.domicilio || ""}
            />
            <FormField
              label="DNI/CUIT"
              type="number"
              name="dni"
              disabled={isFormDisabled}
              onChange={handleChange}
              value={formData.dni || ""}
            />
            <FormField
              label="Teléfono"
              type="number"
              name="telefono"
              disabled={isFormDisabled}
              onChange={handleChange}
              value={formData.telefono || ""}
            />
          </div>
        </fieldset>

        {/* --- 2. Tipo de Lente --- */}
        <FormSection title="Tipo de Lente">
          <LensTypeSection
            type="lejos"
            label="Lejos"
            disabled={isFormDisabled}
            onChange={handleChange}
            value={formData}
          />
          <LensTypeSection
            type="cerca"
            label="Cerca"
            disabled={isFormDisabled}
            onChange={handleChange}
            value={formData}
          />
          <LensTypeSection
            type="bifocal"
            label="Bifocal"
            disabled={isFormDisabled}
            onChange={handleChange}
            value={formData}
          />

          {/* Subsección para detalles del armazón */}
          <div className="col-span-full border-t border-gray-300 dark:border-gray-700 pt-4 mt-4">
            <h3 className="text-lg font-semibold mb-4">Detalles del Armazón</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <FormField
                label="Color"
                type="text"
                name="color"
                disabled={isFormDisabled}
                onChange={handleChange}
                value={formData.color || ""}
              />
              <FormField
                label="Armazón"
                type="text"
                name="armazon"
                disabled={isFormDisabled}
                onChange={handleChange}
                value={formData.armazon || ""}
              />
              <FormField
                label="Orgánico"
                type="text"
                name="organico"
                disabled={isFormDisabled}
                onChange={handleChange}
                value={formData.organico || ""}
              />
              <FormField
                label="Mineral"
                type="text"
                name="mineral"
                disabled={isFormDisabled}
                onChange={handleChange}
                value={formData.mineral || ""}
              />
            </div>
          </div>
        </FormSection>

        {/* --- 3. Otros Campos --- */}
        <fieldset className={sobrePageStyles.section}>
          <legend className={sobrePageStyles.sectionTitle}>Otros Campos</legend>
          <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <FormField
                label="Obra Social"
                type="text"
                name="obra_social"
                disabled={isFormDisabled}
                onChange={handleChange}
                value={formData.obra_social || ""}
              />
            </div>
            <div className="md:col-span-2">
              <FormField
                label="Facturación"
                type="text"
                name="facturacion"
                disabled={isFormDisabled}
                onChange={handleChange}
                value={formData.facturacion || ""}
              />
            </div>
            <div className="md:col-span-4">
              <FormField
                label="Observaciones"
                type="textarea"
                name="observaciones"
                disabled={isFormDisabled}
                onChange={handleChange}
                value={formData.observaciones || ""}
              />
            </div>
            <div className="md:col-span-4">
              <FormField
                label="Receta del Doctor"
                type="text"
                name="receta_doctor"
                disabled={isFormDisabled}
                onChange={handleChange}
                value={formData.receta_doctor || ""}
              />
            </div>
          </div>
        </fieldset>

        {/* --- 4. Detalles del Pago --- */}
        <FormSection title="Detalles del Pago">
          <FormField
            label="Total"
            type="number"
            name="total"
            disabled={isFormDisabled}
            onChange={handleChange}
            value={formData.total || ""}
          />
          <FormField
            label="Seña"
            type="number"
            name="sena"
            disabled={isFormDisabled}
            onChange={handleChange}
            value={formData.sena || ""}
          />
          <FormField
            label="A Pagar"
            type="number"
            name="a_pagar"
            disabled={true}
            value={(Number(formData.total) || 0) - (Number(formData.sena) || 0)}
          />
        </FormSection>

        {/* --- 5. Botones --- */}
        <div className="flex justify-end gap-4 mt-8">
          {action === "ver" ? (
            <Link
              to="/"
              className={`${homePageStyles.button.base} ${homePageStyles.button.secondary}`}
            >
              Volver
            </Link>
          ) : (
            <>
              <Link
                to="/"
                className={`${homePageStyles.button.base} ${homePageStyles.button.secondary}`}
              >
                Volver
              </Link>
              <button
                type="submit"
                className={`${homePageStyles.button.base} ${getButtonClass()}`}
              >
                {getButtonLabel()}
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default SobrePage;
