import React, {useContext, useEffect} from 'react';
import AutenticacionContext from '../../context/autenticacion/AutenticacionContext';
import Barra from '../shared/Barra';
import Sidebar from '../shared/Sidebar';
import FormTareas from '../tareas/FormTareas';
import ListadoTareas from '../tareas/ListadoTareas';

const Proyectos = () => {

    const autenticacionContext = useContext(AutenticacionContext);
    const { usuarioAutenticado } = autenticacionContext;

    useEffect(() => {
        usuarioAutenticado();
    }, [])

    return ( 
        <div className="contenedor-app">
            <Sidebar />
            <div className="seccion-principal">
                <Barra />
                <main>
                    <FormTareas />
                    <div className="contendor-tareas">
                        <ListadoTareas />
                    </div>
                </main>
            </div>
        </div>
     );
}
 
export default Proyectos;