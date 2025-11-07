import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  addSobre,
  updateSobre,
  deleteSobre,
  getNumeroSobre,
  getCustomers,
} from "@services/sobres";
import { useNotification } from "@components/Notification/useNotification.js";
import { getSobres } from "@services/sobres"; // Se usará getSobres en el futuro

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
    // Inicializa la fecha al cargar el componente
    fecha: getLocalDate(new Date()),
  });
  const [isNewCustomer, setIsNewCustomer] = useState(true);
  const [isCustomerModified, setIsCustomerModified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [originalDni, setOriginalDni] = useState(null);
  const sobreDesdeEstado = location.state?.sobre; // Accede al sobre enviado desde HomePage
  console.log(location)
  console.log ("Sobre desde estado:", sobreDesdeEstado);
  const { addNotification } = useNotification();
  const [customers, setCustomers] = useState([]);

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

    // Mapeo de lentes: cada ojo puede tener un tipo de lente diferente.
    sobre.glasses.lenss.forEach((lens) => {
      const { type, lens: eyeSide, esf, cil, eje } = lens;
      // Se establece el tipo de lente para el ojo correspondiente (od/oi)
      flatData[`tipo_lente_${eyeSide}`] = type;

      // Se asignan los valores de graduación a los campos específicos del tipo y ojo.
      flatData[`${type}_${eyeSide}_esf`] = esf;
      flatData[`${type}_${eyeSide}_cil`] = cil;
      flatData[`${type}_${eyeSide}_eje`] = eje;
    });

    return flatData;
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        // Siempre se obtienen los clientes para el selector
        const customersData = await getCustomers();
        setCustomers(customersData);

        if (action === "crear") {
          // Si estamos creando, obtenemos el siguiente número de sobre.
          const nextSobreNumber = await getNumeroSobre();
          setFormData((prev) => ({
            ...prev,
            numero_sobre: nextSobreNumber,
          }));
        } else if (id && sobreDesdeEstado) {
          // Para editar/ver/eliminar, usamos los datos pasados por el estado de la navegación.
          setFormData(transformSobreToFormData(sobreDesdeEstado));
          if (sobreDesdeEstado.cliente) {
            setIsNewCustomer(false);
            setOriginalDni(sobreDesdeEstado.cliente.dni);
          }
        } else if (id && !sobreDesdeEstado) {
          // Si hay un ID pero no hay estado (ej: recarga de página), no podemos mostrar datos.
          // Redirigimos al inicio para evitar una página vacía o con errores.
          addNotification(
            "No se encontraron datos para mostrar, se redirigió al inicio.",
            "warning"
          );
          navigate("/");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [action, id, sobreDesdeEstado]);

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
    // Nuevo: si el usuario cambia datos del cliente existente, marcarlo como modificado
  if (
    !isNewCustomer &&
    ["cliente", "domicilio", "telefono", "dni"].includes(name)
  ) {
    setIsCustomerModified(true);
  }
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
   * Maneja la selección de un cliente existente desde el dropdown.
   * @param {React.ChangeEvent<HTMLSelectElement>} e - El evento de cambio del select.
   */
  const handleCustomerSelect = (e) => {
    const selectedDni = e.target.value;
    const selectedCustomer = customers.find(
      (c) => c.dni === Number(selectedDni)
    );

    if (selectedCustomer) {
      setFormData((prev) => ({
        ...prev,
        dni: selectedCustomer.dni,
        cliente: `${selectedCustomer.customer_name} ${selectedCustomer.last_name}`,
        domicilio: selectedCustomer.address,
        telefono: selectedCustomer.phone,
      }));
      setIsCustomerModified(false);
      setOriginalDni(selectedCustomer.dni);
    } else {
      // Si se deselecciona, se limpian los campos
      handleChange(e); // Deja que el handleChange genérico limpie el DNI
      handleNewCustomerToggle({ target: { checked: false } }); // Llama a la lógica de limpieza
    }
  };

  /**
   * Transforma los datos planos del formulario a la estructura anidada que espera la API.
   * @param {object} data - El estado `formData` del formulario.
   * @returns {object} El payload listo para ser enviado a la API.
   */
  const transformFormDataToApiPayload = (data) => {
    const lenss = [];
    const lensTypeOD = data.tipo_lente_od;
    const lensTypeOI = data.tipo_lente_oi;

    // Añadir lente OD si se ha seleccionado un tipo
    if (lensTypeOD) {
      lenss.push({
        type: lensTypeOD,
        lens: "od",
        esf: Number(data[`${lensTypeOD}_od_esf`]) || 0,
        cil: Number(data[`${lensTypeOD}_od_cil`]) || 0,
        eje: Number(data[`${lensTypeOD}_od_eje`]) || 0,
      });
    }

    // Añadir lente OI si se ha seleccionado un tipo
    if (lensTypeOI) {
      lenss.push({
        type: lensTypeOI,
        lens: "oi",
        esf: Number(data[`${lensTypeOI}_oi_esf`]) || 0,
        cil: Number(data[`${lensTypeOI}_oi_cil`]) || 0,
        eje: Number(data[`${lensTypeOI}_oi_eje`]) || 0,
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
   // CASO 1: Cliente nuevo
  if (isNewCustomer) {
    payload.edit = false;
    payload.customer = {
      customer_name: data.cliente?.split(" ")[0] || "",
      last_name: data.cliente?.split(" ").slice(1).join(" ") || "",
      dni: Number(data.dni) || 0,
      address: data.domicilio,
      phone: data.telefono,
    };
  }

  // CASO 2: Cliente existente sin cambios
  else if (!isCustomerModified) {
    payload.edit = false;
    payload.dni = Number(data.dni);
  }

  // CASO 3: Cliente existente con cambios
  else if (isCustomerModified) {
    payload.edit = true;
    payload.dni = Number(originalDni); // 👈 el DNI original (viejo)
    payload.customer = {
      customer_name: data.cliente?.split(" ")[0] || "",
      last_name: data.cliente?.split(" ").slice(1).join(" ") || "",
      dni: Number(data.dni) || 0, // 👈 el nuevo (si cambió)
      address: data.domicilio,
      phone: data.telefono,
    };
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
    customers,
    handleCustomerSelect,
    handleSubmit,
  };
};
