import { Link, useParams } from "react-router-dom";
import { useSobrePage } from "./useSobrePage";
import {
  sobrePageStyles,
  formFieldStyles,
  formSectionStyles,
  lensTypeSectionStyles,
  generalInfoStyles,
  lensDetailsStyles,
  otherFieldsStyles,
  toggleSwitchStyles,
  paymentDetailsStyles,
} from "./Styles";
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
        {...props}
      />
    ) : (
      <input
        id={name}
        name={name}
        type={type}
        className={formFieldStyles.input}
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
 * @param {string} [props.gridClassName] - Clases CSS opcionales para la grilla interna.
 * @returns {JSX.Element}
 */
const FormSection = ({ title, children, gridClassName }) => (
  <fieldset className={formSectionStyles.section}>
    <legend className={formSectionStyles.sectionTitle}>{title}</legend>
    <div className={gridClassName || formSectionStyles.sectionGrid}>
      {children}
    </div>
  </fieldset>
);

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

/**
 * Componente específico para la sección de un ojo (OD o OI).
 * Incluye los radio buttons para el tipo de lente y los campos de graduación.
 * @param {object} props - Propiedades del componente.
 * @param {'od' | 'oi'} props.eye - El ojo que representa esta sección.
 * @param {string} props.label - La etiqueta para la sección (e.g., "Ojo Izquierdo").
 * @param {boolean} props.disabled - Si los campos están deshabilitados.
 * @param {Function} props.onChange - El manejador de cambios para los inputs.
 * @param {object} props.value - El objeto de estado del formulario (`formData`).
 * @returns {JSX.Element}
 */
const EyeLensSection = ({ eye, label, disabled, onChange, value }) => {
  const lensTypes = [
    { value: "lejos", label: "Lejos" },
    { value: "cerca", label: "Cerca" },
    { value: "bifocal", label: "Bifocal" },
  ];
  // El nombre del campo en el estado ahora es específico para cada ojo.
  const selectedLensType = value[`tipo_lente_${eye}`]; // e.g., value['tipo_lente_od']

  return (
    <div className={lensTypeSectionStyles.container}>
      <h4 className="text-lg font-semibold mb-2">{label}</h4>
      {/* Radio Buttons */}
      <div className="flex items-center gap-6 mb-4">
        {lensTypes.map((type) => (
          <div
            className={lensTypeSectionStyles.radioContainer}
            key={type.value}
          >
            <input
              type="radio"
              id={`check_${eye}_${type.value}`}
              name={`tipo_lente_${eye}`} // Nombre único para el grupo de radios de este ojo
              value={type.value}
              disabled={disabled}
              onChange={onChange}
              checked={selectedLensType === type.value}
              className={lensTypeSectionStyles.radioInput}
            />
            <label htmlFor={`check_${eye}_${type.value}`}>{type.label}</label>
          </div>
        ))}
      </div>

      {/* Campos de Graduación */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          label="Esf"
          type="number"
          name={`${eye}_esf`}
          onChange={onChange} // TODO: Ajustar el nombre para que sea único, ej: `${selectedLensType}_${eye}_esf`
          value={selectedLensType ? value[`${eye}_esf`] || "" : ""} // TODO: Ajustar el value para que coincida con el nombre
          disabled={disabled || !selectedLensType}
        />
        <FormField
          label="Cil"
          type="number"
          name={`${eye}_cil`}
          onChange={onChange} // TODO: Ajustar el nombre
          value={selectedLensType ? value[`${eye}_cil`] || "" : ""} // TODO: Ajustar el value
          disabled={disabled || !selectedLensType}
        />
        <FormField
          label="Eje"
          type="number"
          name={`${eye}_eje`}
          onChange={onChange} // TODO: Ajustar el nombre
          value={selectedLensType ? value[`${eye}_eje`] || "" : ""} // TODO: Ajustar el value
          disabled={disabled || !selectedLensType}
        />
      </div>
    </div>
  );
};

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
  <div className={lensTypeSectionStyles.container} key={type}>
    <div className={lensTypeSectionStyles.radioContainer}>
      <input
        type="radio"
        id={`check_${type}`}
        name="tipo_lente" // Nombre común para agrupar los radio buttons
        value={type} // El valor de este radio button es su tipo (e.g., "lejos")
        disabled={disabled}
        onChange={onChange}
        checked={value.tipo_lente === type} // Se marca si el valor en formData coincide
        className={lensTypeSectionStyles.radioInput}
      />
      <label
        htmlFor={`check_${type}`}
        className={lensTypeSectionStyles.radioLabel}
      >
        {label}
      </label>
    </div>
    {/* OD */}
    <div className={lensTypeSectionStyles.grid}>
      <span className={lensTypeSectionStyles.eyeLabel}>Ojo Derecho</span>
      <div className="md:col-span-2">
        <FormField
          label="Esf"
          type="number"
          name={`${type}_od_esf`}
          onChange={onChange}
          value={value.tipo_lente === type ? value[`${type}_od_esf`] || "" : ""}
          disabled={disabled || value.tipo_lente !== type}
        />
      </div>
      <div className="md:col-span-2">
        <FormField
          label="Cil"
          type="number"
          name={`${type}_od_cil`}
          onChange={onChange}
          value={value.tipo_lente === type ? value[`${type}_od_cil`] || "" : ""}
          disabled={disabled || value.tipo_lente !== type}
        />
      </div>
      <div className="md:col-span-2">
        <FormField
          label="Eje"
          type="number"
          name={`${type}_od_eje`}
          onChange={onChange}
          value={value.tipo_lente === type ? value[`${type}_od_eje`] || "" : ""}
          disabled={disabled || value.tipo_lente !== type}
        />
      </div>
    </div>
    {/* OI */}
    <div className={`${lensTypeSectionStyles.grid} mt-2`}>
      <span className={lensTypeSectionStyles.eyeLabel}>Ojo Izquierdo</span>
      <div className="md:col-span-2">
        <FormField
          label="Esf"
          type="number"
          name={`${type}_oi_esf`}
          onChange={onChange}
          value={value.tipo_lente === type ? value[`${type}_oi_esf`] || "" : ""}
          disabled={disabled || value.tipo_lente !== type}
        />
      </div>
      <div className="md:col-span-2">
        <FormField
          label="Cil"
          type="number"
          name={`${type}_oi_cil`}
          onChange={onChange}
          value={value.tipo_lente === type ? value[`${type}_oi_cil`] || "" : ""}
          disabled={disabled || value.tipo_lente !== type}
        />
      </div>
      <div className="md:col-span-2">
        <FormField
          label="Eje"
          type="number"
          name={`${type}_oi_eje`}
          onChange={onChange}
          value={value.tipo_lente === type ? value[`${type}_oi_eje`] || "" : ""}
          disabled={disabled || value.tipo_lente !== type}
        />
      </div>
    </div>
  </div>
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
const NewLensTypeSection = ({ type, label, disabled, onChange, value }) => {
  const isOdSelected = value.tipo_lente_od === type;
  const isOiSelected = value.tipo_lente_oi === type;

  return (
    <div className={lensTypeSectionStyles.container} key={type}>
      <label className={lensTypeSectionStyles.radioLabel}>{label}</label>
      <div className="grid grid-cols-7 gap-4 items-center mt-2">
        {/* Col 1: Radio Button (OI) */}
        <div className="flex items-center gap-2">
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
          <label htmlFor={`check_oi_${type}`}>Ojo Izquierdo</label>
        </div>

        {/* Col 2, 3, 4: FormFields (OI) */}
        <div className="col-span-2">
          <FormField
            label="Esf"
            type="number"
            name={`${type}_oi_esf`}
            onChange={onChange}
            value={isOiSelected ? value[`${type}_oi_esf`] || "" : ""}
            disabled={disabled || !isOiSelected}
          />
        </div>
        <div className="col-span-2">
          <FormField
            label="Cil"
            type="number"
            name={`${type}_oi_cil`}
            onChange={onChange}
            value={isOiSelected ? value[`${type}_oi_cil`] || "" : ""}
            disabled={disabled || !isOiSelected}
          />
        </div>
        <div className="col-span-2">
          <FormField
            label="Eje"
            type="number"
            name={`${type}_oi_eje`}
            onChange={onChange}
            value={isOiSelected ? value[`${type}_oi_eje`] || "" : ""}
            disabled={disabled || !isOiSelected}
          />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-4 items-center">
        {/* Col 1: Radio Button (OD) */}
        <div className="flex items-center gap-2">
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
          <label htmlFor={`check_od_${type}`}>Ojo Derecho</label>
        </div>

        {/* Col 2, 3, 4: FormFields (OD) */}
        <div className="col-span-2">
          <FormField
            label="Esf"
            type="number"
            name={`${type}_od_esf`}
            onChange={onChange}
            value={isOdSelected ? value[`${type}_od_esf`] || "" : ""}
            disabled={disabled || !isOdSelected}
          />
        </div>
        <div className="col-span-2">
          <FormField
            label="Cil"
            type="number"
            name={`${type}_od_cil`}
            onChange={onChange}
            value={isOdSelected ? value[`${type}_od_cil`] || "" : ""}
            disabled={disabled || !isOdSelected}
          />
        </div>
        <div className="col-span-2">
          <FormField
            label="Eje"
            type="number"
            name={`${type}_od_eje`}
            onChange={onChange}
            value={isOdSelected ? value[`${type}_od_eje`] || "" : ""}
            disabled={disabled || !isOdSelected}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Página para crear, ver, editar o eliminar un Sobre.
 * El comportamiento del formulario se determina por los parámetros de la URL.
 * @returns {JSX.Element}
 */
const SobrePage = () => {
  const { action, id } = useParams();
  const {
    loading,
    error,
    isFormDisabled,
    formData,
    handleChange,
    handleNewCustomerToggle,
    isNewCustomer,
    handleSubmit,
  } = useSobrePage(action, id);

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

  // Helper para obtener la fecha local en formato YYYY-MM-DD
  const getLocalDate = (date) => {
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);
    return localDate.toISOString().split("T")[0];
  };
  const today = getLocalDate(new Date());
  if (loading) {
    return (
      <div className={sobrePageStyles.container}>
        {sobrePageStyles.loadingText}
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`${sobrePageStyles.container} ${sobrePageStyles.errorText}`}
      >
        Error: {error}
      </div>
    );
  }

  return (
    <div className={sobrePageStyles.container}>
      {/* --- Encabezado Fijo --- */}
      <div className="flex justify-between items-center sticky top-0 z-10 bg-gray-100 dark:bg-gray-900 py-4 mb-6 -mx-4 md:-mx-8 px-4 md:px-8 border-b">
        <h1 className={`${sobrePageStyles.pageTitle} mb-0`}>
          {action} Sobre {id && `#${formData.numero_sobre || id}`}
        </h1>

        {/* --- Botones --- */}
        <div className={sobrePageStyles.buttonContainer}>
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
                form="sobre-form" // Asocia el botón con el formulario
                className={`${homePageStyles.button.base} ${getButtonClass()}`}
              >
                {getButtonLabel()}
              </button>
            </>
          )}
        </div>
      </div>

      <form
        id="sobre-form" // ID para asociar con el botón de submit
        className={sobrePageStyles.formContainer}
        onSubmit={handleSubmit}
      >
        {/* --- 1. Información General --- */}
        <FormSection
          title="Información General"
          gridClassName={generalInfoStyles.grid}
        >
          {/* Fila 1: Toggle Cliente Nuevo */}
          {action === "crear" && (
            <div className="md:col-span-4 flex items-center">
              <ToggleSwitch
                label="Cliente nuevo"
                checked={isNewCustomer}
                onChange={handleNewCustomerToggle}
              />
            </div>
          )}

          {/* Fila 2: Fecha y N° Sobre */}
          <div className="md:col-span-2">
            <FormField
              label="Fecha"
              type="date"
              name="fecha"
              disabled={isFormDisabled}
              onChange={handleChange}
              value={formData.fecha || ""}
              max={today}
            />
          </div>
          <div className="md:col-span-2">
            <FormField
              label="N° Sobre"
              type="number"
              name="numero_sobre"
              disabled={true}
              onChange={handleChange}
              value={formData.numero_sobre || ""}
            />
          </div>

          {/* Fila 3: Campos de Cliente */}

          {!isNewCustomer && (
            <>
              {/* <div className="col-span-1"></div> */}
              <fieldset className={`${formFieldStyles.fieldSet} col-span-2`}>
                <legend className={formFieldStyles.legend}>
                  Buscar por DNI
                </legend>
                <select
                  name="dni"
                  id="dni"
                  className={formFieldStyles.input}
                  value={formData.dni || ""}
                  onChange={handleChange}
                  disabled={isFormDisabled}
                >
                  <option value="">Seleccionar cliente...</option>
                  {/* TODO: Cargar dinámicamente desde getClientes() */}
                </select>
              </fieldset>
              <div className="col-span-2"></div>
            </>
          )}
          <FormField
            label="DNI"
            type="number"
            name="dni"
            disabled={isFormDisabled || !isNewCustomer}
            onChange={handleChange}
            value={formData.dni || ""}
          />
          <FormField
            label="Cliente"
            type="text"
            name="cliente"
            disabled={isFormDisabled || !isNewCustomer}
            onChange={handleChange}
            value={formData.cliente || ""}
          />
          <FormField
            label="Domicilio"
            type="text"
            name="domicilio"
            disabled={isFormDisabled || !isNewCustomer}
            onChange={handleChange}
            value={formData.domicilio || ""}
          />
          <FormField
            label="Teléfono"
            type="text"
            name="telefono"
            disabled={isFormDisabled || !isNewCustomer}
            onChange={handleChange}
            value={formData.telefono || ""}
          />

          {/* Fila 3: Campos de Cliente */}
          {/* {!isNewCustomer && (
            <>
              <fieldset className={`${formFieldStyles.fieldSet} col-span-2`}>
                <legend className={formFieldStyles.legend}>
                  Buscar por DNI
                </legend>
                <select
                  name="dni"
                  id="dni"
                  className={formFieldStyles.input}
                  value={formData.dni || ""}
                  onChange={handleChange}
                  disabled={isFormDisabled}
                >
                  <option value="">Seleccionar cliente...</option>
                </select>
              </fieldset>
            </>
          )}
          <FormField
            label="DNI"
            type="number"
            name="dni"
            disabled={isFormDisabled || !isNewCustomer}
            onChange={handleChange}
            value={formData.dni || ""}
          />
          <FormField
            label="Cliente"
            type="text"
            name="cliente"
            disabled={isFormDisabled || !isNewCustomer}
            onChange={handleChange}
            value={formData.cliente || ""}
          />
          {!isNewCustomer && <div className="col-span-2"></div>}
          <FormField
            label="Domicilio"
            type="text"
            name="domicilio"
            disabled={isFormDisabled || !isNewCustomer}
            onChange={handleChange}
            value={formData.domicilio || ""}
          />
          <FormField
            label="Teléfono"
            type="text"
            name="telefono"
            disabled={isFormDisabled || !isNewCustomer}
            onChange={handleChange}
            value={formData.telefono || ""}
          /> */}
        </FormSection>

        {/* --- 2. Tipo de Lente --- */}
        {/* <FormSection title="Tipo de Lente">
          <div className={lensDetailsStyles.container}>
            <h3 className={lensDetailsStyles.title}>Detalles del Armazón</h3>
            <div className={lensDetailsStyles.grid}>
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

          <EyeLensSection
            eye="oi"
            label="Ojo Izquierdo"
            disabled={isFormDisabled}
            onChange={handleChange}
            value={formData}
          />

          <EyeLensSection
            eye="od"
            label="Ojo Derecho"
            disabled={isFormDisabled}
            onChange={handleChange}
            value={formData}
          />
        </FormSection> */}

        {/* --- 2. Tipo de Lente --- */}
        {/* <FormSection title="Tipo de Lente">
          <div className={lensDetailsStyles.container}>
            <h3 className={lensDetailsStyles.title}>Detalles del Armazón</h3>
            <div className={lensDetailsStyles.grid}>
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
        </FormSection> */}

        {/* --- 2. Tipo de Lente --- */}
        <FormSection title="Tipo de Lente">
          <div className={lensDetailsStyles.container}>
            <h3 className={lensDetailsStyles.title}>Detalles del Armazón</h3>
            <div className={lensDetailsStyles.grid}>
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

          <NewLensTypeSection
            type="lejos"
            label="Lejos"
            disabled={isFormDisabled}
            onChange={handleChange}
            value={formData}
          />
          <NewLensTypeSection
            type="cerca"
            label="Cerca"
            disabled={isFormDisabled}
            onChange={handleChange}
            value={formData}
          />
          <NewLensTypeSection
            type="bifocal"
            label="Bifocal"
            disabled={isFormDisabled}
            onChange={handleChange}
            value={formData}
          />
        </FormSection>

        {/* --- 3. Otros Campos --- */}
        <FormSection
          title="Otros Campos"
          gridClassName={otherFieldsStyles.grid}
        >
          <div className={otherFieldsStyles.span2}>
            <FormField
              label="Obra Social"
              type="text"
              name="obra_social"
              disabled={isFormDisabled}
              onChange={handleChange}
              value={formData.obra_social || ""}
            />
          </div>
          <div className={otherFieldsStyles.span2}>
            <FormField
              label="Facturación"
              type="text"
              name="facturacion"
              disabled={isFormDisabled}
              onChange={handleChange}
              value={formData.facturacion || ""}
            />
          </div>
          <div className={otherFieldsStyles.span4}>
            <FormField
              label="Observaciones"
              type="textarea"
              name="observaciones"
              disabled={isFormDisabled}
              onChange={handleChange}
              value={formData.observaciones || ""}
            />
          </div>
          <div className={otherFieldsStyles.span4}>
            <FormField
              label="Receta del Doctor"
              type="text"
              name="receta_doctor"
              disabled={isFormDisabled}
              onChange={handleChange}
              value={formData.receta_doctor || ""}
            />
          </div>
        </FormSection>

        {/* --- 4. Detalles del Pago --- */}
        <FormSection
          title="Detalles del Pago"
          gridClassName={paymentDetailsStyles.grid}
        >
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
      </form>
    </div>
  );
};

export default SobrePage;
