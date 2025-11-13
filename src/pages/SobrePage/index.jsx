import { useParams } from "react-router-dom";
import { useSobrePage } from "./useSobrePage";
import {
  sobrePageStyles,
  generalInfoStyles,
  lensDetailsStyles,
  otherFieldsStyles,
  paymentDetailsStyles,
} from "./Styles";
import FormField from "@components/FormField";
import FormSection from "@components/FormSection";
import ToggleSwitch from "@components/ToggleSwitch";
import Button from "@components/Button";
import LensTypeSection from "./localComponents/LensTypeSection";

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
    handleCustomerSelect,
    isNewCustomer,
    customers,
    handleSubmit,
  } = useSobrePage(action, id);

  /**
   * Prepara las opciones para el selector de clientes.
   */
  const customerOptions = [
    { value: "", label: "Seleccionar cliente..." },
    ...customers.map((c) => ({
      value: c.dni,
      label: `${c.dni} - ${c.customer_name} ${c.last_name}`,
    })),
  ];
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
   * Determina la variante de estilo del botón de envío según la acción actual.
   * @returns {'primary' | 'danger'} La variante del botón.
   */
  const getButtonVariant = () => (action === "eliminar" ? "danger" : "primary");

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
      {/* --- Header Fijo --- */}
      <div className={sobrePageStyles.headerContainer}>
        <h1
          className={`${sobrePageStyles.pageTitle} ${sobrePageStyles.headerTitle}`}
        >
          {action} Sobre {id && `#${formData.numero_sobre || id}`}
        </h1>

        {/* --- Botones --- */}
        <div className={sobrePageStyles.buttonContainer}>
          {action === "ver" ? (
            <Button as="link" to="/" variant="secondary">
              Volver
            </Button>
          ) : (
            <>
              <Button as="link" to="/" variant="secondary">
                Volver
              </Button>
              <Button
                type="submit"
                form="sobre-form" // Asocia el botón con el formulario
                variant={getButtonVariant()}
              >
                {getButtonLabel()}
              </Button>
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
            <div className={generalInfoStyles.newCustomerToggleContainer}>
              <ToggleSwitch
                label="Cliente nuevo"
                checked={isNewCustomer}
                onChange={handleNewCustomerToggle}
              />
            </div>
          )}

          {/* Fila 2: Fecha y N° Sobre */}
          <div className={generalInfoStyles.dateFieldContainer}>
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
          <div className={generalInfoStyles.sobreNumberFieldContainer}>
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
          {action === "crear" && !isNewCustomer && (
            <>
              <div className={generalInfoStyles.dniSearchFieldContainer}>
                <FormField
                  label="Buscar por DNI"
                  type="select"
                  name="dni"
                  value={formData.dni || ""}
                  onChange={handleCustomerSelect}
                  disabled={isFormDisabled || action === "editar"}
                  options={customerOptions}
                />
              </div>
              <div className={generalInfoStyles.dniSearchFieldContainer}></div>
            </>
          )}
          <FormField
            label="DNI"
            type="number"
            name="dni"
            disabled={isFormDisabled || action === "editar"}
            onChange={handleChange}
            value={formData.dni || ""}
          />
          <FormField
            label="Cliente"
            type="text"
            name="cliente"
            disabled={isFormDisabled || action === "editar"}
            onChange={handleChange}
            value={formData.cliente || ""}
          />
          <FormField
            label="Domicilio"
            type="text"
            name="domicilio"
            disabled={isFormDisabled || action === "editar"}
            onChange={handleChange}
            value={formData.domicilio || ""}
          />
          <FormField
            label="Teléfono"
            type="text"
            name="telefono"
            disabled={isFormDisabled}
            onChange={handleChange}
            value={formData.telefono || ""}
          />
        </FormSection>

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
