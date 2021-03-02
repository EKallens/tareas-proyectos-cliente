import React, {useContext, useEffect} from 'react';
import AutenticacionContext from '../../context/autenticacion/AutenticacionContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';

const Barra = () => {

    const autenticacionContext = useContext(AutenticacionContext);
    const { usuarioAutenticado, usuario, cerrarSesion } = autenticacionContext;

    useEffect(() => {
        usuarioAutenticado();
    }, []);

    return ( 
        <header className="app-header">
            {usuario ? <span className="nombre-usuario"><FontAwesomeIcon icon={faUser}/> <span>{ usuario.nombre } <h6>{ usuario.correo }</h6></span></span> : null}
            <nav className="nav-principal">
                <button
                    className="btn btn-danger"
                    onClick={() => cerrarSesion()}
                    >Cerrar Sesión <FontAwesomeIcon icon={faSignOutAlt}/>
                </button>
            </nav>
        </header>
     );
}
 
export default Barra;
