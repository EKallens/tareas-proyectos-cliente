import React from 'react';
import ListadoProyectos from '../proyectos/ListadoProyectos';
import NuevoProyecto from '../proyectos/NuevoProyecto';

const Sidebar = () => {
    return ( 
        <aside>
            <h1>MERN <span>Tasks</span></h1>
            <NuevoProyecto />
            <hr/>
            <div className="proyectos">
                <h2>Mis Proyectos</h2>
                <ListadoProyectos />
            </div>
        </aside>
     );
}
 
export default Sidebar;
