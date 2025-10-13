import { useState, useEffect } from "react";
import { getSobres } from "@services/sobres.js";

/**
 * Hook personalizado para manejar la lógica y el estado de la HomePage.
 * Se encarga de obtener los sobres del mes actual.
 *
 * @returns {{
 *  sobres: Array,
 *  loading: boolean,
 *  error: string|null,
 *  selectedSobre: {id: number|null, number: number|null},
 *  handleSelectSobre: (id: number, number: number) => void,
 *  filters: {dni: string, date_ini: string, date_fin: string},
 *  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
 *  handleSearch: () => Promise<void>
 * }} Un objeto con el estado y manejadores de la página.
 */
export const useHomePage = () => {
  /**
   * Obtiene la fecha local en formato YYYY-MM-DD para evitar problemas de zona horaria.
   * @param {Date} date - La fecha a convertir.
   * @returns {string} La fecha en formato YYYY-MM-DD.
   */
  const getLocalDate = (date) => {
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);
    return localDate.toISOString().split("T")[0];
  };
  const [sobres, setSobres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSobre, setSelectedSobre] = useState({
    id: null,
    number: null,
  });
  const [filters, setFilters] = useState({
    dni: "",
    date_ini: getLocalDate(
      new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    ),
    date_fin: getLocalDate(new Date()),
  });

  useEffect(() => {
    const fetchSobres = async () => {
      try {
        const today = new Date();
        const date_ini = new Date(today.getFullYear(), today.getMonth(), 1);
        const date_fin = new Date(); // Usar fecha actual para el fin por defecto
        const response = await getSobres({
          date_ini: getLocalDate(date_ini),
          date_fin: getLocalDate(date_fin),
        });
        setSobres(response.data); // La respuesta ahora tiene una propiedad "data"
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSobres();
  }, []);

  /**
   * Maneja la selección de un sobre en la tabla.
   * Si se hace clic en el mismo sobre, se deselecciona.
   * @param {number} id - El ID del sobre (`id_sobre`).
   * @param {number} number - El número del sobre (`sobre_number`).
   */
  const handleSelectSobre = (id, number) => {
    // Si se hace clic en el mismo, se deselecciona. Si no, se selecciona el nuevo.
    setSelectedSobre((prev) =>
      prev.id === id ? { id: null, number: null } : { id, number }
    );
  };

  /**
   * Maneja los cambios en los inputs de filtro.
   * @param {React.ChangeEvent<HTMLInputElement>} e - El evento del input.
   */
  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    // Limita el input de DNI a 8 caracteres
    if (id === "dni" && value.length > 8) {
      return;
    }

    setFilters((prev) => ({ ...prev, [id]: value }));
  };

  /**
   * Ejecuta la búsqueda de sobres basada en los filtros actuales.
   */
  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      // Prepara los filtros, asegurando que se pasen nulos si los campos están vacíos.
      const searchParams = {
        dni: filters.dni ? Number(filters.dni) : null,
        date_ini: filters.date_ini || null,
        date_fin: filters.date_fin || null,
      };
      const response = await getSobres(searchParams);
      setSobres(response.data);
    } catch (err) {
      setError(err.message);
      setSobres([]); // Limpia los sobres en caso de error
    } finally {
      setLoading(false);
    }
  };

  return {
    sobres,
    loading,
    error,
    selectedSobre,
    handleSelectSobre,
    filters,
    handleFilterChange,
    handleSearch,
  };
};
