import { sobresTableStyles } from "./Styles";

/**
 * Componente que renderiza la tabla de sobres.
 * @param {object} props - Propiedades del componente.
 * @param {boolean} props.loading - Indica si los datos se están cargando.
 * @param {string|null} props.error - El mensaje de error, si existe.
 * @param {Array} props.sobres - El array de sobres a mostrar.
 * @param {object} props.selectedSobre - El sobre actualmente seleccionado.
 * @param {Function} props.handleSelectSobre - Función para manejar la selección de un sobre.
 * @param {Function} props.formatDateToDDMMYYYY - Función para formatear la fecha.
 * @returns {JSX.Element}
 */
const SobresTable = ({
  loading,
  error,
  sobres,
  selectedSobre,
  handleSelectSobre,
  formatDateToDDMMYYYY,
}) => (
  <div className={sobresTableStyles.tableContainer}>
    <table className={sobresTableStyles.table}>
      <thead className={sobresTableStyles.tableHead}>
        <tr>
          <th className={`${sobresTableStyles.tableHeader} w-12`}></th>
          <th className={sobresTableStyles.tableHeader}>Cliente</th>
          <th className={sobresTableStyles.tableHeader}>DNI</th>
          <th className={sobresTableStyles.tableHeader}>N° Sobre</th>
          <th className={sobresTableStyles.tableHeader}>Fecha Creación</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan="4" className={sobresTableStyles.tableMessage}>
              Cargando...
            </td>
          </tr>
        ) : error ? (
          <tr>
            <td colSpan="4" className={sobresTableStyles.tableMessageError}>
              Error al cargar los datos: {error}
            </td>
          </tr>
        ) : sobres.length === 0 ? (
          <tr>
            <td colSpan="4" className={sobresTableStyles.tableMessage}>
              No se encontraron sobres con los filtros aplicados.
            </td>
          </tr>
        ) : (
          sobres.map((sobre) => (
            <tr
              key={sobre.id_sobre}
              className={sobresTableStyles.tableRow}
              onClick={() =>
                handleSelectSobre(sobre.id_sobre, sobre.sobre_number)
              }
            >
              <td className={sobresTableStyles.tableCell}>
                <input
                  type="radio"
                  name="selectedSobre"
                  checked={selectedSobre.id === sobre.id_sobre}
                  readOnly
                  className={sobresTableStyles.radioInput}
                />
              </td>
              <td
                className={sobresTableStyles.tableCell}
              >{`${sobre.cliente.customer_name} ${sobre.cliente.last_name}`}</td>
              <td className={sobresTableStyles.tableCell}>
                {sobre.cliente.dni}
              </td>
              <td className={sobresTableStyles.tableCell}>
                {sobre.sobre_number}
              </td>
              <td className={sobresTableStyles.tableCell}>
                {formatDateToDDMMYYYY(sobre.sobre_date)}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default SobresTable;
