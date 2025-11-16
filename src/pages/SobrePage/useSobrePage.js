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
        addNotification(
          `Error al cargar datos iniciales: ${err.message}`,
          "error"
        );
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

    setFormData((prev) => {
      let newState = { ...prev };

      // --- INICIO DE LA CORRECCIÓN ---

      if (type === "radio") {
        // Si se hace clic en un radio button que ya estaba seleccionado, deseleccionarlo.
        if (prev[name] === value) {
          newState[name] = null; // Deselecciona
        } else {
          // Si se selecciona un nuevo radio, primero limpiar los campos del anterior (si existía).
          if (prev[name]) {
            const eye = name.split("_")[2]; // 'od' u 'oi'
            const oldType = prev[name]; // El tipo que estaba seleccionado antes
            delete newState[`${oldType}_${eye}_esf`];
            delete newState[`${oldType}_${eye}_cil`];
            delete newState[`${oldType}_${eye}_eje`];
          }
          newState[name] = value; // Selecciona el nuevo
        }
      } else {
        // Para cualquier otro tipo de input (text, checkbox, etc.)
        newState[name] = type === "checkbox" ? checked : value;
      }

      // --- FIN DE LA CORRECCIÓN ---

      return newState;
    });

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
      handleNewCustomerToggle({ target: { checked: false } }); //lógica de limpieza
    }
  };

  /**
   * Transforma los datos planos del formulario a la estructura anidada que espera la API.
   * @param {object} data - El estado `formData` del formulario.
   * @returns {object} El payload listo para ser enviado a la API.
   */
  const transformFormDataToApiPayload = (data) => {
    const lensTypeOD = data.tipo_lente_od;
    const lensTypeOI = data.tipo_lente_oi;
    let lensOD = null;
    let lensOI = null;
    const lenss = [];

    // Añadir lente OD si se ha seleccionado un tipo
    if (lensTypeOD) {
      lensOD = {
        type: lensTypeOD,
        lens: "od",
        esf: Number(data[`${lensTypeOD}_od_esf`]) || 0,
        cil: Number(data[`${lensTypeOD}_od_cil`]) || 0,
        eje: Number(data[`${lensTypeOD}_od_eje`]) || 0,
      };
    }

    // Añadir lente OI si se ha seleccionado un tipo
    if (lensTypeOI) {
      lensOI = {
        type: lensTypeOI,
        lens: "oi",
        esf: Number(data[`${lensTypeOI}_oi_esf`]) || 0,
        cil: Number(data[`${lensTypeOI}_oi_cil`]) || 0,
        eje: Number(data[`${lensTypeOI}_oi_eje`]) || 0,
      };
    }

    // Se añaden los lentes al array solo si no son nulos
    if (lensOD) lenss.push(lensOD);
    if (lensOI) lenss.push(lensOI);

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
        address: data.domicilio || "",
        phone: data.telefono || "",
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
      payload.dni = Number(originalDni);
      payload.customer = {
        customer_name: data.cliente?.split(" ")[0] || "",
        last_name: data.cliente?.split(" ").slice(1).join(" ") || "",
        dni: Number(data.dni) || 0,
        address: data.domicilio,
        phone: data.telefono,
      };
    }
    return payload;
  };

  /**
   * Transforma los datos del formulario al payload que espera PATCH /update_sobre
   * (SobreUpdatePayload)
   * @param {object} data - El estado `formData`
   * @returns {object} El payload para actualizar.
   */
  const transformFormDataToUpdatePayload = (data) => {
    const lensTypeOD = data.tipo_lente_od;
    const lensTypeOI = data.tipo_lente_oi;
    let lensOD = null;
    let lensOI = null;
    const lenss = [];

    // Añadir lente OD si se ha seleccionado un tipo
    if (lensTypeOD) {
      lensOD = {
        lens: "od", // Campo identificador ('od' o 'oi')
        type: lensTypeOD,
        esf: Number(data[`${lensTypeOD}_od_esf`]) || 0,
        cil: Number(data[`${lensTypeOD}_od_cil`]) || 0,
        eje: Number(data[`${lensTypeOD}_od_eje`]) || 0,
      };
    }

    // Añadir lente OI si se ha seleccionado un tipo
    if (lensTypeOI) {
      lensOI = {
        lens: "oi", // Campo identificador ('od' o 'oi')
        type: lensTypeOI,
        esf: Number(data[`${lensTypeOI}_oi_esf`]) || 0,
        cil: Number(data[`${lensTypeOI}_oi_cil`]) || 0,
        eje: Number(data[`${lensTypeOI}_oi_eje`]) || 0,
      };
    }

    // Se añaden los lentes al array solo si no son nulos
    if (lensOD) lenss.push(lensOD);
    if (lensOI) lenss.push(lensOI);

    // Este payload SÍ coincide con lo que el backend espera para editar
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
    return payload;
  };

  /**
   * Manejador para el envío del formulario.
   * @param {React.FormEvent<HTMLFormElement>} e - El evento del formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // --- INICIO DE VALIDACIÓN (ESTO ARREGLA TODO) ---
    if (action === "crear") {
      if (
        !formData.dni ||
        !formData.cliente ||
        !formData.domicilio ||
        !formData.telefono
      ) {
        addNotification(
          "Todos los campos de cliente son obligatorios.",
          "warning"
        );
        return; // Detiene el envío
      }
      if (formData.dni.length < 7) {
        addNotification("El DNI debe tener al menos 7 u 8 dígitos.", "warning");
        return; // Detiene el envío
      }
    } else {
      // Validaciones para cliente existente
      if (!formData.dni) {
        addNotification("Debes seleccionar un cliente existente.", "warning");
        return;
      }
    }

    // Validar Lentes: si se selecciona un tipo, los campos deben estar llenos
    const checkLens = (eye) => {
      const type = formData[`tipo_lente_${eye}`]; // ej: "lejos"
      if (!type) return true; // Si no hay tipo, es válido.

      // Si hay un tipo, verifica que los 3 campos existan
      const esf = formData[`${type}_${eye}_esf`];
      const cil = formData[`${type}_${eye}_cil`];
      const eje = formData[`${type}_${eye}_eje`];

      // Verifica que los campos no sean nulos, indefinidos o strings vacíos.
      const areFieldsPresent = esf != null && cil != null && eje != null;

      if (!areFieldsPresent || esf === "" || cil === "" || eje === "") {
        // Usa 'toUpperCase' para "OD" o "OI"
        addNotification(
          `Faltan datos (esf, cil, eje) para el lente ${type} del Ojo ${eye.toUpperCase()}.`,
          "warning"
        );
        return false;
      }
      return true;
    };

    // Nueva validación: al menos un lente debe estar seleccionado
    if (!formData.tipo_lente_od && !formData.tipo_lente_oi) {
      addNotification(
        "Debes definir la graduación para al menos un ojo.",
        "warning"
      );
      return;
    }

    if (!checkLens("od") || !checkLens("oi")) {
      return; // Detiene el envío si la validación de Ojo Derecho o Izquierdo falla
    }

    if (!formData.total) {
      addNotification("Se debe definir un monto total.", "warning");
      return;
    }
    // --- FIN DE LA VALIDACIÓN ---

    setLoading(true);
    setError(null);

    try {
      if (action === "crear") {
        const payload = transformFormDataToApiPayload(formData);
        await addSobre(payload);
        addNotification("Sobre creado exitosamente", "success");
      } else if (action === "editar") {
        // (Tu lógica de editar que ya arreglamos)
        const payload = transformFormDataToUpdatePayload(formData);
        const sobreId = formData.numero_sobre || id;
        await updateSobre(sobreId, payload);
        addNotification("Sobre actualizado exitosamente", "success");
      } else if (action === "eliminar") {
        await deleteSobre({
          dni: formData.dni,
          sobre_number: formData.numero_sobre,
        });
        addNotification("Sobre eliminado exitosamente", "success");
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
      addNotification(`Error: ${err.message}`, "error");
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
