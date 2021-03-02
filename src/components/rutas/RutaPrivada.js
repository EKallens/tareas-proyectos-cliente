import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AutenticacionContext from '../../context/autenticacion/AutenticacionContext';

const RutaPrivada = ({ component: Component, ...props }) => {

    const authContext = useContext(AutenticacionContext);
    const { autenticado, cargando, usuarioAutenticado } = authContext;

    useEffect(() => {
        usuarioAutenticado();
    }, [])

    return ( 
        <Route { ...props } render={ props => !autenticado && !cargando ? (
            <Redirect to="/" />
        ) : (
            <Component { ...props } />
        )  }/>
     );
}
 
export default RutaPrivada;