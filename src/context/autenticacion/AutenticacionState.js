import React, { useReducer } from 'react';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';

import {
    REGISTRO_EXITOSO,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from './../../types';
import AutenticacionContext from './AutenticacionContext';
import AutenticacionReducer from './AutenticacionReducer';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const AuntenticacionState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true
    }

    const [ state, dispatch ] = useReducer(AutenticacionReducer, initialState);

    const registrarUsuario = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios',datos);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            });
        } catch (error) {
            console.log(error.response);
        }

        usuarioAutenticado();
    }

        //Retorna el usuario autenticado
        const usuarioAutenticado = async() => {
            const token = localStorage.getItem('token');
            if(token){
                tokenAuth(token);
            }
    
            try {
                const respuesta = await clienteAxios.get('/api/auth');
                dispatch({
                    type: OBTENER_USUARIO,
                    payload: respuesta.data
                })
            } catch (error) {
                dispatch({
                    type: LOGIN_ERROR
                });
            }
        }
    
        //Iniciar Sesión
        const iniciarSesion = async datos => {
            try {
                const respuesta = await clienteAxios.post('/api/auth', datos);
                dispatch({
                    type: LOGIN_EXITOSO,
                    payload: respuesta.data
                })
    
                usuarioAutenticado();
            } catch (error) {
                NotificationManager.error(error.response.data.msg);
                console.log(error.response);
            }
        }
    
        //Cierra la sesión del usuario
        const cerrarSesion = () => {
            dispatch({
                type: CERRAR_SESION
            })
        }

        return(
            <AutenticacionContext.Provider
                value={{
                    token: state.token,
                    autenticado: state.autenticado,
                    usuario: state.usuario,
                    mensaje: state.mensaje,
                    cargando: state.cargando,
                    registrarUsuario,
                    iniciarSesion,
                    usuarioAutenticado,
                    cerrarSesion
                }}
            >
                {props.children}
                <NotificationContainer />
            </AutenticacionContext.Provider>
        )
}

export default AuntenticacionState;
