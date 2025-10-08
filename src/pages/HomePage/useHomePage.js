import { useState, useEffect } from "react";
import { getSobresByMonth } from "@services/sobres.js";

/**
 * Hook personalizado para manejar la lógica y el estado de la HomePage.
 * Se encarga de obtener los sobres del mes actual.
 *
 * @returns {{
 *  sobres: Array,
 *  loading: boolean,
 *  error: string|null,
 *  selectedSobre: number|null,
 *  handleSelectSobre: (id: number) => void
 * }} Un objeto con el estado y manejadores de la página.
 */
export const useHomePage = () => {
  const [sobres, setSobres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSobre, setSelectedSobre] = useState(null);

  useEffect(() => {
    const fetchSobres = async () => {
      try {
        const today = new Date();
        const date_ini = new Date(today.getFullYear(), today.getMonth(), 1)
          .toISOString()
          .split("T")[0];
        const date_fin = new Date(today.getFullYear(), today.getMonth() + 1, 0)
          .toISOString()
          .split("T")[0];

        const data = await getSobresByMonth(date_ini, date_fin);
        setSobres(data.sobres);
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
   * @param {number} id - El ID del sobre seleccionado.
   */
  const handleSelectSobre = (id) => {
    // Si se hace clic en el mismo, se deselecciona. Si no, se selecciona el nuevo.
    setSelectedSobre((prevId) => (prevId === id ? null : id));
  };

  return { sobres, loading, error, selectedSobre, handleSelectSobre };
};

// TODO: Implementar la lógica de los filtros para llamar a `filterCustomer`
// y actualizar el estado `sobres`. Se necesitarán estados adicionales para
// los inputs de filtro.
