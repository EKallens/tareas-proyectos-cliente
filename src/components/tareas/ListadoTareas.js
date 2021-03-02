import React, { useContext, useState } from 'react';
import Tarea from './Tarea';
import ProyectoContext from './../../context/proyectos/ProyectoContext';
import TareaContext from './../../context/tareas/TareaContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import ConfirmDialog from '../notificaciones/ConfirmDialog';

const ListadoTareas = () => {

    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        titulo: '',
        subtitulo: ''
    });

    const proyectosContext = useContext(ProyectoContext);
    const { proyecto, eliminarProyecto } = proyectosContext;

    const tareasContext = useContext(TareaContext);
    const { obtenerTareas, tareasProyecto, cargando } = tareasContext;

    if (!proyecto) return <h2 className="mt-4">Selecciona un proyecto</h2>;

    const [proyectoActual] = proyecto;

    const eliminarProyectoActual = (proyectoId) => {
        
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        });

        eliminarProyecto(proyectoId);
    }
    return (

        !cargando ?
            <>
                <h2><span className="nombre-proyecto mt-4">{proyectoActual.nombre}</span></h2>
                <ul className="listado-tareas">
                    {
                        tareasProyecto.length === 0 ?
                            (
                                <li className="sin-tarea animate__animated animate__fadeInLeft">No hay tareas agregadas al proyecto</li>
                            )

                            :
                            tareasProyecto.map(tarea => (
                                <Tarea key={tarea._id} tarea={tarea} confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
                            )) 
                    }
                </ul>

                <div className="text-center">
                    <button
                        type="button"
                        className="btn btn-danger text-center mt-3 mb-5"
                        // onClick={() => eliminarProyectoActual(proyectoActual._id)}
                        onClick={() => setConfirmDialog({
                            isOpen: true,
                            titulo: '¿Estás seguro de eliminar el proyecto actual?',
                            subtitulo: 'No podrás deshacer esta acción',
                            onConfirm: () => eliminarProyectoActual(proyectoActual._id)
                        })}
                    >Eliminar Proyecto <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                </div>

                <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog}/>

            </> : null

    );
}

export default ListadoTareas;
