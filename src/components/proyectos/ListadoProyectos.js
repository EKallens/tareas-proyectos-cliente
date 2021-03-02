import React, { useContext, useEffect } from 'react';
import Proyecto from './Proyecto';
import ProyectoContext from './../../context/proyectos/ProyectoContext';

const ListadoProyectos = () => {

    //Extraer proyectos del stateInicial
    const proyectosContext = useContext(ProyectoContext);
    const { proyectos, obtenerProyectos } = proyectosContext;

    useEffect(() => {
       obtenerProyectos();
    }, [])
    

    //Revisar si existen proyectos
    if(proyectos.length === 0) return <p>No hay proyectos, comienza creando uno</p>;

    return ( 
        
            <ul className="listado-proyectos">
                { proyectos.map( proyecto => 
                        <Proyecto
                            key={proyecto._id}
                            proyecto={proyecto}
                        />
                )}
            </ul>
     );
}
 
export default ListadoProyectos;