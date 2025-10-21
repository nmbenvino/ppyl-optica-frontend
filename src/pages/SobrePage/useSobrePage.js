import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mockAllSobresResponse } from "@services/_mockData";
import { addSobre, updateSobre, deleteSobre } from "@services/sobres";
import { useNotification } from "@components/Notification/useNotification.js";
// import { getSobres } from "@services/sobres"; // Se usará getSobres en el futuro

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
 *  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
 * }}
 * Un objeto con el estado y los manejadores para la página del sobre.
 */
export const useSobrePage = (action, id) => {
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
  const [formData, setFormData] = useState({
    fecha: getLocalDate(new Date()),
  });
  const [isNewCustomer, setIsNewCustomer] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { addNotification } = useNotification();

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
    sobre.glasses.lenss.forEach((lens) => {
      const { type, lens: eyeSide, esf, cil, eje } = lens;
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
          // const response = await getSobres({ id_sobre: id }); // TODO: Ajustar API si se busca por id_sobre

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

    // Limita el input de DNI a 8 caracteres
    if (name === "dni" && value.length > 8) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /**
   * Maneja el cambio del toggle "Cliente nuevo".
   * @param {React.ChangeEvent<HTMLInputElement>} e - El evento de cambio.
   */
  const handleNewCustomerToggle = (e) => {
    const isChecked = e.target.checked;
    setIsNewCustomer(isChecked);

    // Si se desmarca (cliente existente), limpiar los campos relacionados
    if (!isChecked) {
      setFormData((prev) => ({
        ...prev,
        dni: "",
        cliente: "",
        domicilio: "",
        telefono: "",
      }));
    }
    // Si se marca, los campos se habilitan para ser llenados manualmente.
  };

  /**
   * Transforma los datos planos del formulario a la estructura anidada que espera la API.
   * @param {object} data - El estado `formData` del formulario.
   * @returns {object} El payload listo para ser enviado a la API.
   */
  const transformFormDataToApiPayload = (data) => {
    const selectedLensType = data.tipo_lente;
    const lenss = [];

    // Solo incluimos los datos de los lentes si se ha seleccionado un tipo
    if (selectedLensType) {
      // Lente OD
      lenss.push({
        type: selectedLensType,
        lens: "od",
        esf: Number(data[`${selectedLensType}_od_esf`]) || 0,
        cil: Number(data[`${selectedLensType}_od_cil`]) || 0,
        eje: Number(data[`${selectedLensType}_od_eje`]) || 0,
      });
      // Lente OI
      lenss.push({
        type: selectedLensType,
        lens: "oi",
        esf: Number(data[`${selectedLensType}_oi_esf`]) || 0,
        cil: Number(data[`${selectedLensType}_oi_cil`]) || 0,
        eje: Number(data[`${selectedLensType}_oi_eje`]) || 0,
      });
    }

    // Estructura para /add_sobre y /update_sobre
    const payload = {
      sobre: {
        social_work: data.obra_social,
        billing: data.facturacion,
        recipe: data.receta_doctor,
        observations: data.observaciones,
        total: Number(data.total) || 0,
        advance_payment: Number(data.sena) || 0,
        sobre_date: data.fecha,
      },
      glasses: {
        color: data.color,
        frame: data.armazon,
        organic: data.organico,
        mineral: data.mineral,
        lenss: lenss,
      },
    };

    // Para /add_sobre, se necesita la información del cliente
    if (action === "crear") {
      // TODO: Implementar lógica para detectar si el cliente ya existe.
      // Por ahora, asumimos que siempre es un cliente nuevo.
      payload.customer = {
        customer_name: data.cliente?.split(" ")[0] || "",
        last_name: data.cliente?.split(" ").slice(1).join(" ") || "",
        dni: Number(data.dni) || 0,
        address: data.domicilio,
        phone: data.telefono,
      };
    }

    // Para /update_sobre, se necesita el `sobre_number` en el nivel raíz
    if (action === "editar") {
      payload.sobre_number = data.numero_sobre;
    }

    return payload;
  };

  /**
   * Manejador para el envío del formulario.
   * @param {React.FormEvent<HTMLFormElement>} e - El evento del formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (action === "crear") {
        const payload = transformFormDataToApiPayload(formData);
        await addSobre(payload);
        addNotification("Sobre creado exitosamente", "success");
      } else if (action === "editar") {
        const payload = transformFormDataToApiPayload(formData);
        await updateSobre(payload);
        addNotification("Sobre actualizado exitosamente", "success");
      } else if (action === "eliminar") {
        await deleteSobre({
          dni: formData.dni,
          sobre_number: formData.numero_sobre,
        });
        addNotification("Sobre eliminado exitosamente", "success");
      }
      navigate("/"); // Redirige a la página principal tras una operación exitosa
    } catch (err) {
      setError(err.message);
      addNotification(`Error: ${err.message}`, "error"); // Muestra el error al usuario
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    isFormDisabled,
    formData,
    handleChange,
    handleNewCustomerToggle,
    isNewCustomer,
    handleSubmit,
  };
};
