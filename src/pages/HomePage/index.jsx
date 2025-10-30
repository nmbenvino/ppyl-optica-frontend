import SobresTable from "./localComponents/SobresTable";
import { useHomePage } from "./useHomePage.js";
import { homePageStyles } from "./Styles.js";
import FormField from "@components/FormField/index.jsx";
import Button from "@components/Button/index.jsx";

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
  const getLocalDate = (date) => {
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);
    return localDate.toISOString().split("T")[0];
  };
  const today = getLocalDate(new Date());

  // Encuentra el objeto completo del sobre seleccionado para pasarlo en el estado de la navegación.
  const sobreSeleccionadoCompleto = sobres.find(
    (s) => s.id_sobre === selectedSobre.id
  );

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
          <Button as="link" to="/sobres/crear" variant="primary">
            Crear Sobre
          </Button>

          <Button
            as="link"
            to={`/sobres/editar/${selectedSobre.id}`}
            state={{ sobre: sobreSeleccionadoCompleto }}
            variant="secondary"
            disabled={isActionDisabled}
          >
            Editar
          </Button>
          <Button
            as="link"
            to={`/sobres/ver/${selectedSobre.id}`}
            state={{ sobre: sobreSeleccionadoCompleto }}
            variant="secondary"
            disabled={isActionDisabled}
          >
            Ver
          </Button>
          <Button
            as="link"
            to={`/sobres/eliminar/${selectedSobre.id}`}
            state={{ sobre: sobreSeleccionadoCompleto }}
            variant="danger"
            disabled={isActionDisabled}
          >
            Eliminar
          </Button>
        </div>
      </div>

      {/* --- 2. Sección de Filtros --- */}
      <div className={homePageStyles.filtersContainer}>
        <FormField
          label="DNI del Cliente"
          type="number"
          name="dni"
          placeholder="Buscar por DNI..."
          value={filters.dni}
          onChange={handleFilterChange}
          containerClassName={homePageStyles.filterGroup}
        />
        <FormField
          label="Fecha Desde"
          type="date"
          name="date_ini"
          value={filters.date_ini}
          onChange={handleFilterChange}
          max={today}
          containerClassName={homePageStyles.filterGroup}
        />
        <FormField
          label="Fecha Hasta"
          type="date"
          name="date_fin"
          value={filters.date_fin}
          onChange={handleFilterChange}
          max={today}
          containerClassName={homePageStyles.filterGroup}
        />
        <Button onClick={handleSearch} variant="primary">
          Buscar
        </Button>
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
