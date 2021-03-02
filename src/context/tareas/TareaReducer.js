import {
    OBTENER_TAREAS,
    AGREGAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    EDITAR_TAREA
} from './../../types';

const TareaReducer = (state, action) => {
    switch (action.type) {
        case OBTENER_TAREAS:
            return {
                ...state,
                tareasProyecto: action.payload,
                cargando: false
            };
        case AGREGAR_TAREA:
            return {
                ...state,
                tareasProyecto: [action.payload, ...state.tareasProyecto],
                cargando: false
            };
        case ELIMINAR_TAREA:
            return {
                ...state,
                tareasProyecto: state.tareasProyecto.filter(tarea => tarea._id !== action.payload),
                cargando: false
            };

        case TAREA_ACTUAL:
            return {
                ...state,
                tareaActual: action.payload,
                cargando: false
            };
        case EDITAR_TAREA:
            return {
                ...state,
                tareasProyecto: state.tareasProyecto.map( tarea => tarea._id === action.payload._id ? action.payload : tarea ),
                tareaActual: null,
                cargando: false
            };
        default:
            return state;
    }
}

export default TareaReducer;