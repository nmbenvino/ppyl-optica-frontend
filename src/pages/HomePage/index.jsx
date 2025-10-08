import { useHomePage } from "./useHomePage.js";
import { homePageStyles } from "./Styles.js";
import { Link } from "react-router-dom";

/**
 * Componente que representa la página de inicio de la aplicación.
 * Muestra los sobres del mes actual.
 * La lógica de estado y fetching está abstraída en el hook `useHomePage`.
 * @returns {JSX.Element} El JSX que renderiza la página de inicio.
 */
const HomePage = () => {
  const { sobres, loading, error, selectedSobre, handleSelectSobre } =
    useHomePage();

  if (loading) {
    return <p className={homePageStyles.container}>Cargando sobres...</p>;
  }

  if (error) {
    return <p className={homePageStyles.container}>Error: {error}</p>;
  }

  const isActionDisabled = !selectedSobre;

  return (
    <div className={homePageStyles.container}>
      {/* --- 1. Sección de Cabecera y Acciones --- */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestión de Sobres</h1>
        <div className="flex gap-2">
          <Link
            to="/sobres/crear"
            className={`${homePageStyles.button.base} ${homePageStyles.button.primary}`}
          >
            Crear Sobre
          </Link>
          <Link
            to={`/sobres/editar/${selectedSobre}`}
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
            to={`/sobres/ver/${selectedSobre}`}
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
            to={`/sobres/eliminar/${selectedSobre}`}
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
      <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md flex items-end gap-4">
        <div className="flex-grow">
          <label
            htmlFor="customerName"
            className="block text-sm font-medium mb-1"
          >
            Nombre del Cliente
          </label>
          <input
            type="text"
            id="customerName"
            className={homePageStyles.input}
            placeholder="Buscar por nombre..."
          />
        </div>
        <div>
          <label htmlFor="dateFrom" className="block text-sm font-medium mb-1">
            Fecha Desde
          </label>
          <input type="date" id="dateFrom" className={homePageStyles.input} />
        </div>
        <div>
          <label htmlFor="dateTo" className="block text-sm font-medium mb-1">
            Fecha Hasta
          </label>
          <input type="date" id="dateTo" className={homePageStyles.input} />
        </div>
        <button
          className={`${homePageStyles.button.base} ${homePageStyles.button.primary}`}
        >
          Buscar
        </button>
      </div>

      {/* --- 3. Sección de Tabla --- */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <table className="min-w-full text-left">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="p-4 font-semibold w-12"></th>
              {/* Columna para el radio button */}
              <th className="p-4 font-semibold">Cliente</th>
              <th className="p-4 font-semibold">N° Sobre</th>
              <th className="p-4 font-semibold">Fecha Creación</th>
            </tr>
          </thead>
          <tbody>
            {sobres.map((sobre) => (
              <tr
                key={sobre.id_sobre}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                onClick={() => handleSelectSobre(sobre.id_sobre)}
              >
                <td className="p-4">
                  <input
                    type="radio"
                    name="selectedSobre"
                    checked={selectedSobre === sobre.id_sobre}
                    readOnly
                    className="form-radio h-5 w-5 text-blue-600 bg-gray-200 border-gray-300 dark:bg-gray-700 dark:border-gray-600 focus:ring-blue-500"
                  />
                </td>
                <td className="p-4">{`${sobre.cliente.customer_name} ${sobre.cliente.last_name}`}</td>
                <td className="p-4">{sobre.sobre_number}</td>
                <td className="p-4">{sobre.sobre_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage;
