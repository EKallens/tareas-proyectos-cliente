import React, { useContext, useState } from 'react';
import TareaContext from './../../context/tareas/TareaContext';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import ConfirmDialog from '../notificaciones/ConfirmDialog';

const Tarea = ({ tarea, confirmDialog, setConfirmDialog }) => {

    const tareasContext = useContext(TareaContext);
    const {eliminarTarea, actualizarTarea, seleccionarTareaActual } = tareasContext;

    // Extraer si un proyecto esta activo
    const proyectosContext = useContext(ProyectoContext);
    const { proyecto } = proyectosContext;

    // Extraer el proyecto
    const [proyectoActual] = proyecto;

    const cambiarEstado = (tarea) => {
        if(tarea.estado){
            tarea.estado = false;
        } else{
            tarea.estado = true;
        }

        actualizarTarea(tarea);
    }

    const tareaEliminar = (idTarea) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        });

        eliminarTarea(idTarea, proyectoActual._id);
    }

    return (
        <li className="tarea animate__animated animate__fadeInLeft">
            <p>{tarea.nombre}</p>
            <div className="estado">
                {
                    tarea.estado ?
                        (<button
                            type="button"
                            className="completo"
                            onClick={() => cambiarEstado(tarea)}
                        >
                            Completo
                        </button>)
                        :
                        (<button
                            type="button"
                            className="incompleto"
                            onClick={() => cambiarEstado(tarea)}
                        >
                            Incompleto
                        </button>)
                }
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => seleccionarTareaActual(tarea)}
                ><FontAwesomeIcon icon={faEdit}/>
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => setConfirmDialog({
                        isOpen: true,
                        titulo: '¿Estás seguro de eliminar esta tarea?',
                        subtitulo: 'No podrás deshacer esta acción',
                        onConfirm: () => tareaEliminar(tarea._id)
                    })}
                ><FontAwesomeIcon icon={faTrashAlt}/>
                </button>
            </div>
        </li>
    );
}

export default Tarea;