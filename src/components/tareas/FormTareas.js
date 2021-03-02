import React, { useContext, useState, useEffect } from 'react';
import Notificacion from '../notificaciones/Notificacion';
import ProyectoContext from './../../context/proyectos/ProyectoContext';
import TareaContext from './../../context/tareas/TareaContext';

const FormTareas = () => {

    const [tarea, guardarTarea] = useState({
        nombre: '',
        proyectoId: null
    });

    const [ notify, setNotify ] = useState({ isOpen: false, message: '', type: '' })

    const { nombre } = tarea;

    //Context de proyectos que pone a disposición todos los valores del state
    const proyectosContext = useContext(ProyectoContext);
    const { proyecto } = proyectosContext;

    //Context de tareas que pone a disposición todos los valores del state
    const tareasContext = useContext(TareaContext);
    const { obtenerTareas, agregarTarea, tareaActual, actualizarTarea } = tareasContext;

    useEffect(() => {

        if (!tareaActual) {
            guardarTarea({
                nombre: '',
                proyectoId: null
            });

        } else {
            guardarTarea(tareaActual);
        }

    }, [tareaActual]);

    if (!proyecto) return null;

    const [proyectoActual] = proyecto;

    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value,
            proyectoId: proyectoActual._id
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (nombre === '') {
            setNotify({ isOpen: true, message: 'Ingresa un nombre para la tarea', type: 'error'});
            return;
        }

        if (!tareaActual) {
            agregarTarea(tarea);
        } else {
            actualizarTarea(tarea);
        }

        //obtenerTareas(tarea.proyectoId);

        guardarTarea({
            nombre: '',
            proyectoId: null
        });
    }

    return (
        <div className="formulario">
            <form onSubmit={handleSubmit}>
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre tarea"
                        name="nombre"
                        onChange={handleChange}
                        value={nombre}
                    />
                </div>

                <div className="contenedor-input">
                    <button
                        type="submit"
                        className="btn btn-agregar btn-block mt-3"
                    >
                        {tareaActual ? 'Editar Tarea  ' : 'Agregar Tarea  '}
                    </button>
                </div>
            </form>

            <Notificacion notify={notify} setNotify={setNotify}/>
        </div>
    );
}

export default FormTareas;
