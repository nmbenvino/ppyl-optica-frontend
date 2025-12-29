import React from "react";
import Button from "@components/Button";
import { deleteModalStyles } from "./Styles";

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className={deleteModalStyles.overlay}>
      <div className={deleteModalStyles.content}>
        <h3 className={deleteModalStyles.title}>Advertencia de Eliminación</h3>
        <p className={deleteModalStyles.message}>
          No han pasado 10 años desde la creación de este sobre. <br />
          ¿Está seguro de que desea eliminarlo permanentemente?
        </p>
        <div className={deleteModalStyles.actions}>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Confirmar Eliminación
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
