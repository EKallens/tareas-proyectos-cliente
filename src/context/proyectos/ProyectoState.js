import React, { useReducer } from 'react';
import ProyectoContext from './ProyectoContext';
import ProyectoReducer from './ProyectoReducer';
import {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO
    }
from './../../types';
import clienteAxios from '../../config/axios';

const ProyectoState = props => {

    const initialState = {
        proyectos: [],
        formulario: false, //nuevoProyecto comienza en false. Cuando el usuario clickee en el botón crear proyecto se pasa a true y muestra la opción de agregar proyecto
        proyecto: null // Ningún proyecto está seleccionado
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(ProyectoReducer, initialState);

    //Funciones para el crud de proyectos
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    //Obtener proyectos
    const obtenerProyectos = async() => {
        try {
            const respuesta = await clienteAxios.get('api/proyectos');
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: respuesta.data.proyectos
            });

        } catch (error) {
            console.log(error);
        }
    }

    //Agregar Proyecto
    const agregarProyecto = async proyecto => {
        try {
            const respuesta = await clienteAxios.post('/api/proyectos', proyecto);

            //Mandamos el dispatch con el proyecto completo (id, nombre, creador)
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: respuesta.data.proyecto
            })
        } catch (error) {
            console.log(error);
        }
    }

    //Eliminar Proyecto
    const eliminarProyecto = async (idProyecto) => {
        try {
            await clienteAxios.delete(`/api/proyectos/${idProyecto}`);
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: idProyecto
            });
        } catch (error) {
            console.log(error);
        }
    }

    //Seleccionar el proyecto del sidebar
    const proyectoActual = (idProyecto) => {
        try {
            dispatch({
                type: PROYECTO_ACTUAL,
                payload: idProyecto
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ProyectoContext.Provider
            value={
                {
                    proyectos: state.proyectos,
                    formulario: state.formulario,
                    proyecto: state.proyecto,
                    mostrarFormulario,
                    obtenerProyectos,
                    agregarProyecto,
                    proyectoActual,
                    eliminarProyecto
                }
            }
        >
            { props.children}
        </ProyectoContext.Provider>
    )
}

export default ProyectoState;