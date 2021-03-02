import React, { useState, useContext } from 'react';
import ProyectoContext from './../../context/proyectos/ProyectoContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import Notificacion from '../notificaciones/Notificacion';

const NuevoProyecto = () => {

    const [proyecto, guardarProyecto] = useState({
        nombre: ''
    });

    const [ notify, setNotify ] = useState({ isOpen: false, message: '', type: '' });

    const proyectosContext = useContext(ProyectoContext);
    const { formulario, mostrarFormulario, agregarProyecto } = proyectosContext;
    const { nombre } = proyecto;

    const handleChange = (e) => {
        guardarProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(nombre === '') {
            setNotify({ isOpen: true, message: 'Ingresa un nombre para el proyecto', type: 'error'});
            return;   
        };
        
        agregarProyecto(proyecto);

        //Limpia el formulario
        guardarProyecto({
            nombre: ''
        })
    }

    const handleClick = () => {
        mostrarFormulario();
    }

    return (
        <>
            <button
                type="button"
                className="btn btn-block btn-primario mb-5"
                onClick={handleClick}
                >Nuevo Proyecto <FontAwesomeIcon icon={faPlusSquare}/>
            </button>

            {
                formulario ?
                    <>
                        <form onSubmit={handleSubmit} className="formulario-nuevo-proyecto">
                            <input
                                type="text"
                                className="input-text"
                                placeholder="Nombre del proyecto"
                                name="nombre"
                                value={nombre}
                                onChange={handleChange}
                            />

                            <input
                                type="submit"
                                className="btn btn-primario btn-block mb-5 mt-5"
                                value="Agregar Proyecto"
                            />
                        </form>
                        
                        <Notificacion notify={notify} setNotify={setNotify}/>
                    </>
                
                    : null
            }
        </>
    );
}

export default NuevoProyecto;
