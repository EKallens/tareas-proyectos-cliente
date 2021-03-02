import React, { useContext } from 'react';
import ProyectoContext from './../../context/proyectos/ProyectoContext';
import TareaContext from './../../context/tareas/TareaContext';

const Proyecto = ({ proyecto }) => {

    //Context de proyectos que pone a disposición todos los valores del state
    const proyectosContext = useContext(ProyectoContext);
    const { proyectoActual } = proyectosContext;

    //Context de tareas que pone a disposición todos los valores del state
    const tareasContext = useContext(TareaContext);
    const { obtenerTareas } = tareasContext;

    const seleccionarProyecto = (idProyecto) => {
        proyectoActual(idProyecto); //Función para fijar el proyecto seleccionado
        obtenerTareas(idProyecto);
    }

    return (
        <li>
            <button 
                onClick={() => seleccionarProyecto(proyecto._id)} 
                type="button" 
                className="btn btn-blank"
                >{ proyecto.nombre }
            </button>
        </li>
     );
}
 
export default Proyecto;
