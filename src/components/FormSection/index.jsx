import { formSectionStyles } from "./Styles";

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

export default FormSection;
