import { useHomePage } from "./useHomePage.js";
import { homePageStyles } from "./Styles.js";
import { Link } from "react-router-dom";

/**
 * Componente que renderiza la tabla de sobres.
 * @param {object} props - Propiedades del componente.
 * @param {boolean} props.loading - Indica si los datos se están cargando.
 * @param {Array} props.sobres - El array de sobres a mostrar.
 * @param {object} props.selectedSobre - El sobre actualmente seleccionado.
 * @param {Function} props.handleSelectSobre - Función para manejar la selección de un sobre.
 * @param {Function} props.formatDateToDDMMYYYY - Función para formatear la fecha.
 * @returns {JSX.Element}
 */
const SobresTable = ({
  loading,
  sobres,
  selectedSobre,
  handleSelectSobre,
  formatDateToDDMMYYYY,
}) => (
  <div className={homePageStyles.tableContainer}>
    <table className={homePageStyles.table}>
      <thead className={homePageStyles.tableHead}>
        <tr>
          <th className={`${homePageStyles.tableHeader} w-12`}></th>
          <th className={homePageStyles.tableHeader}>Cliente</th>
          <th className={homePageStyles.tableHeader}>N° Sobre</th>
          <th className={homePageStyles.tableHeader}>Fecha Creación</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan="4" className={homePageStyles.tableMessage}>
              Cargando...
            </td>
          </tr>
        ) : sobres.length === 0 ? (
          <tr>
            <td colSpan="4" className={homePageStyles.tableMessage}>
              No se encontraron sobres con los filtros aplicados.
            </td>
          </tr>
        ) : (
          sobres.map((sobre) => (
            <tr
              key={sobre.id_sobre}
              className={homePageStyles.tableRow}
              onClick={() =>
                handleSelectSobre(sobre.id_sobre, sobre.sobre_number)
              }
            >
              <td className={homePageStyles.tableCell}>
                <input
                  type="radio"
                  name="selectedSobre"
                  checked={selectedSobre.id === sobre.id_sobre}
                  readOnly
                  className={homePageStyles.radioInput}
                />
              </td>
              <td
                className={homePageStyles.tableCell}
              >{`${sobre.cliente.customer_name} ${sobre.cliente.last_name}`}</td>
              <td className={homePageStyles.tableCell}>{sobre.sobre_number}</td>
              <td className={homePageStyles.tableCell}>
                {formatDateToDDMMYYYY(sobre.sobre_date)}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

/**
 * Componente que representa la página de inicio de la aplicación.
 * Muestra los sobres del mes actual.
 * La lógica de estado y fetching está abstraída en el hook `useHomePage`.
 * @returns {JSX.Element} El JSX que renderiza la página de inicio.
 */
const HomePage = () => {
  const {
    sobres,
    loading,
    error,
    selectedSobre,
    handleSelectSobre,
    filters,
    handleFilterChange,
    handleSearch,
  } = useHomePage();

  if (error) {
    return <p className={homePageStyles.container}>Error: {error}</p>;
  }

  const isActionDisabled = !selectedSobre.id;
  // Helper para obtener la fecha local en formato YYYY-MM-DD
  const getLocalDate = (date) => {
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);
    return localDate.toISOString().split("T")[0];
  };
  const today = getLocalDate(new Date());

  /**
   * Formatea una fecha de YYYY-MM-DD a DD/MM/YYYY.
   * @param {string} dateString - La fecha en formato YYYY-MM-DD.
   * @returns {string} La fecha formateada.
   */
  const formatDateToDDMMYYYY = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div className={homePageStyles.container}>
      {/* --- 1. Sección de Cabecera y Acciones --- */}
      <div className={homePageStyles.header}>
        <h1 className={homePageStyles.title}>Gestión de Sobres</h1>
        <div className={homePageStyles.actionsContainer}>
          <Link
            to="/sobres/crear"
            className={`${homePageStyles.button.base} ${homePageStyles.button.primary}`}
          >
            Crear Sobre
          </Link>
          <Link
            to={isActionDisabled ? "#" : `/sobres/editar/${selectedSobre.id}`}
            className={
              isActionDisabled
                ? `${homePageStyles.button.base} ${homePageStyles.button.disabled}`
                : `${homePageStyles.button.base} ${homePageStyles.button.secondary}`
            }
            onClick={(e) => isActionDisabled && e.preventDefault()}
          >
            Editar
          </Link>
          <Link
            to={isActionDisabled ? "#" : `/sobres/ver/${selectedSobre.id}`}
            className={
              isActionDisabled
                ? `${homePageStyles.button.base} ${homePageStyles.button.disabled}`
                : `${homePageStyles.button.base} ${homePageStyles.button.secondary}`
            }
            onClick={(e) => isActionDisabled && e.preventDefault()}
          >
            Ver
          </Link>
          <Link
            to={isActionDisabled ? "#" : `/sobres/eliminar/${selectedSobre.id}`}
            className={
              isActionDisabled
                ? `${homePageStyles.button.base} ${homePageStyles.button.disabled}`
                : `${homePageStyles.button.base} ${homePageStyles.button.danger}`
            }
            onClick={(e) => isActionDisabled && e.preventDefault()}
          >
            Eliminar
          </Link>
        </div>
      </div>

      {/* --- 2. Sección de Filtros --- */}
      <div className={homePageStyles.filtersContainer}>
        <div className={homePageStyles.filterGroup}>
          <label htmlFor="customerDni" className={homePageStyles.filterLabel}>
            DNI del Cliente
          </label>
          <input
            type="number"
            id="dni"
            className={homePageStyles.input}
            placeholder="Buscar por DNI..."
            value={filters.dni}
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <label htmlFor="dateFrom" className={homePageStyles.filterLabel}>
            Fecha Desde
          </label>
          <input
            type="date"
            id="date_ini"
            className={homePageStyles.input}
            value={filters.date_ini}
            onChange={handleFilterChange}
            max={today}
          />
        </div>
        <div>
          <label htmlFor="dateTo" className={homePageStyles.filterLabel}>
            Fecha Hasta
          </label>
          <input
            type="date"
            id="date_fin"
            className={homePageStyles.input}
            value={filters.date_fin}
            onChange={handleFilterChange}
            max={today}
          />
        </div>
        <button
          className={`${homePageStyles.button.base} ${homePageStyles.button.primary}`}
          onClick={handleSearch}
        >
          Buscar
        </button>
      </div>

      {/* --- 3. Sección de Tabla --- */}
      <SobresTable
        loading={loading}
        sobres={sobres}
        selectedSobre={selectedSobre}
        handleSelectSobre={handleSelectSobre}
        formatDateToDDMMYYYY={formatDateToDDMMYYYY}
      />
    </div>
  );
};

export default HomePage;
