import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AutenticacionContext from '../../context/autenticacion/AutenticacionContext';
import Notificacion from '../notificaciones/Notificacion';
import './Login.css';

const Login = props => {

    const autenticacionContext = useContext(AutenticacionContext);
    const { autenticado, iniciarSesion } = autenticacionContext;

    useEffect(() => {
        if(autenticado){
            props.history.push('/proyectos');
        }

    }, [autenticado, props.history]);

    const [ usuario, guardarUsuario ] = useState({
        correo: '',
        password: ''
    });

    const [ notify, setNotify ] = useState({ isOpen: false, message: '', type: '' })

    const { correo, password } = usuario;

    const handleChange = (e) => {
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(correo.trim() === ''){
            setNotify({ isOpen: true, message: 'Debes ingresar un correo', type: 'error'})
            return;
        }

        if(password.trim() === ''){
            setNotify({ isOpen: true, message: 'Debes ingresar una contraseña', type: 'error'})
            return;
        }
        
        iniciarSesion({correo, password});
    }

    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100 p-t-50 p-b-90">
                    <form onSubmit={handleSubmit} className="login100-form validate-form flex-sb flex-w">
                        <span className="login100-form-title p-b-51">
                            Iniciar Sesión
                        </span>
                        
                        <div className="wrap-input100 validate-input m-b-16" data-validate = "Email is required">
                            <input
                                className="input100"
                                type="email"
                                name="correo"
                                placeholder="Email"
                                value={correo}
                                onChange={ handleChange }
                            />
                            <span className="focus-input100"></span>
                        </div>
                        
                        <div className="wrap-input100 validate-input m-b-16" data-validate = "Password is required">
                            <input
                                className="input100"
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={handleChange}
                            />
                            <span className="focus-input100"></span>
                        </div>

                        <div className="container-login100-form-btn m-t-17">
                            <button
                                className="login100-form-btn button-login"
                                type="submit"
                                >
                                Iniciar Sesión
                            </button>
                        </div>

                        <Link to={'/registro'} className="m-t-20 login-txt">
                            Obtener Cuenta
                        </Link>

                    </form>

                    <Notificacion notify={notify} setNotify={setNotify}/>
                </div>
            </div>
        </div>
     );
}
 
export default Login;