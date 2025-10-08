import { useState, useEffect } from "react";
import { mockAllSobresResponse } from "@services/_mockData";
// import { getSobreById } from "@services/sobres";

/**
 * Hook para manejar la lógica de la página de gestión de Sobres.
 * @param {'crear' | 'ver' | 'editar' | 'eliminar'} action - La acción a realizar.
 * @param {string} id - El ID del sobre (si aplica).
 * @returns {{
 *  loading: boolean,
 *  error: string|null,
 *  isFormDisabled: boolean,
 *  formData: object,
 *  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
 * }}
 * Un objeto con el estado y los manejadores para la página del sobre.
 */
export const useSobrePage = (action, id) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isFormDisabled = action === "ver" || action === "eliminar";

  /**
   * Transforma la estructura de datos anidada de un sobre a una estructura plana
   * compatible con el estado del formulario.
   * @param {import('@services/_mockData').Sobre} sobre - El objeto del sobre.
   * @returns {Object} Un objeto plano para el formData.
   */
  const transformSobreToFormData = (sobre) => {
    const flatData = {
      // Información General
      fecha: sobre.sobre_date,
      numero_sobre: sobre.sobre_number,
      cliente: `${sobre.cliente.customer_name} ${sobre.cliente.last_name}`,
      domicilio: sobre.cliente.address,
      dni: sobre.cliente.dni,
      telefono: sobre.cliente.phone,

      // Otros Campos
      obra_social: sobre.social_work,
      facturacion: sobre.billing,
      observaciones: sobre.observations,
      receta_doctor: sobre.recipe,

      // Detalles del Pago
      total: sobre.total,
      sena: sobre.advance_payment,

      // Detalles del Armazón
      color: sobre.glasses.color,
      armazon: sobre.glasses.frame,
      organico: sobre.glasses.organic,
      mineral: sobre.glasses.mineral,
    };

    // Mapeo de lentes
    sobre.glasses.eyes.forEach((eye) => {
      const { type, eye: eyeSide, esf, cil, eje } = eye;
      flatData["tipo_lente"] = type; // Se establece el tipo de lente seleccionado
      flatData[`${type}_${eyeSide}_esf`] = esf;
      flatData[`${type}_${eyeSide}_cil`] = cil;
      flatData[`${type}_${eyeSide}_eje`] = eje;
    });

    return flatData;
  };

  useEffect(() => {
    // Si la acción no es 'crear' y hay un ID, buscamos los datos del sobre.
    if (action !== "crear" && id) {
      const fetchSobreData = async () => {
        setLoading(true);
        try {
          console.log(`Buscando datos para el sobre con ID: ${id}`);
          // const data = await getSobreById(id); // TODO: Usar servicio real

          // --- Simulación con mock data ---
          const sobreEncontrado = mockAllSobresResponse.sobres.find(
            (s) => s.id_sobre === parseInt(id)
          );

          if (sobreEncontrado) {
            setFormData(transformSobreToFormData(sobreEncontrado));
          } else {
            setError(`No se encontró el sobre con ID ${id}`);
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchSobreData();
    }
  }, [action, id]);

  /**
   * Manejador genérico para actualizar el estado del formulario cuando un campo cambia.
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - El evento de cambio.
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return {
    loading,
    error,
    isFormDisabled,
    formData,
    handleChange,
  };
};
