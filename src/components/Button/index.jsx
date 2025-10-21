import { Link } from "react-router-dom";
import { buttonStyles } from "./Styles";

/**
 * Componente de botón reutilizable que puede actuar como un botón estándar o un enlace de React Router.
 * @param {object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Contenido del botón.
 * @param {'button' | 'link'} [props.as='button'] - El tipo de elemento a renderizar.
 * @param {'primary' | 'secondary' | 'danger'} [props.variant='primary'] - La variante de estilo del botón.
 * @param {string} [props.to] - La ruta de destino si `as` es 'link'.
 * @param {boolean} [props.disabled=false] - Si el botón está deshabilitado.
 * @param {Function} [props.onClick] - Manejador de clic.
 * @param {string} [props.className] - Clases CSS adicionales.
 * @param {'submit' | 'button' | 'reset'} [props.type='button'] - El tipo de botón (para `as='button'`).
 * @param {string} [props.form] - El ID del formulario al que se asocia el botón.
 * @returns {JSX.Element}
 */
const Button = ({
  children,
  as = "button",
  variant = "primary",
  to = "#",
  disabled = false,
  onClick,
  className = "",
  ...props
}) => {
  const variantClass = buttonStyles[variant] || buttonStyles.primary;
  const disabledClass = disabled ? buttonStyles.disabled : "";

  const combinedClassName = `${buttonStyles.base} ${variantClass} ${disabledClass} ${className}`;

  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    if (onClick) onClick(e);
  };

  if (as === "link") {
    return (
      <Link
        to={disabled ? "#" : to}
        className={combinedClassName}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={combinedClassName}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
