import React, { useReducer } from 'react';
import TareaReducer from './TareaReducer';
import TareaContext from './TareaContext';
import {
    OBTENER_TAREAS,
    AGREGAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    EDITAR_TAREA
} from './../../types';
import clienteAxios from '../../config/axios';

const TareaState = props => {

    const initialState = {
        tareasProyecto: [],
        tareaActual: null,
        cargando: true
    };

    const [state, dispatch] = useReducer(TareaReducer, initialState);

    const agregarTarea = async tarea => {
        try {
            await clienteAxios.post('/api/tareas', tarea);
            dispatch({
                type: AGREGAR_TAREA,
                payload: tarea
            });

            obtenerTareas(tarea.proyectoId);
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarTarea = async (idTarea, proyectoId) => {
        try {
            await clienteAxios.delete(`/api/tareas/${idTarea}`, { params: { proyectoId } })
            dispatch({
                type: ELIMINAR_TAREA,
                payload: idTarea
            });
        } catch (error) {
            console.log(error);
        }

    }

    const obtenerTareas = async proyectoId => {
        try {
            const resultado = await clienteAxios.get('/api/tareas', { params: { proyectoId } });
            dispatch({
                type: OBTENER_TAREAS,
                payload: resultado.data.tareas
            })
        } catch (error) {
            console.log(error);
        }
    }

    const seleccionarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    const actualizarTarea = async tarea => {
        try {
            const respuesta = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
            dispatch({
                type: EDITAR_TAREA,
                payload: respuesta.data.tarea
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TareaContext.Provider
            value={{
                tareasProyecto: state.tareasProyecto,
                tareaActual: state.tareaActual,
                cargando: state.cargando,
                obtenerTareas,
                agregarTarea,
                eliminarTarea,
                seleccionarTareaActual,
                actualizarTarea
            }}
        >
            { props.children}
        </TareaContext.Provider>
    );
}

export default TareaState;