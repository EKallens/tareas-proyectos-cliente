import React, { useState, useContext, useEffect } from 'react';
import AutenticacionContext from '../../context/autenticacion/AutenticacionContext';
import { Link } from 'react-router-dom';
import Notificacion from '../notificaciones/Notificacion';
import './Login.css';

const Registro = props => {

    const authContext = useContext(AutenticacionContext);
    const { autenticado, registrarUsuario } = authContext;

    useEffect(() => {

        if(autenticado){
            props.history.push('/proyectos');
        }

    }, [autenticado, props.history]);

    const [usuario, guardarUsuario] = useState({
        nombre: '',
        correo: '',
        password: ''
    });

    const [ notify, setNotify ] = useState({ isOpen: false, message: '', type: '' })

    const { nombre, correo, password } = usuario;

    const handleChange = (e) => {

        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {

        e.preventDefault();

        //Validar ingreso de datos
        if (nombre.trim() === '' || correo.trim() === '' || password.trim() === '') {
            setNotify({ isOpen: true, message: 'Todos los campos son obligatorios', type: 'error'});
            return;
        }

        if(password.length < 6){
            setNotify({ isOpen: true, message: 'La contraseña debe tener al menos 6 caracteres', type: 'error'});
            return;
        }

        registrarUsuario({
            nombre,
            correo,
            password
        });
    }

    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100 p-t-50 p-b-90">
                    <form onSubmit={handleSubmit} className="login100-form validate-form flex-sb flex-w">
                        <span className="login100-form-title p-b-51">
                            Registro
                        </span>

                        <div className="wrap-input100 validate-input m-b-16">
                            <input
                                className="input100"
                                type="text"
                                name="nombre"
                                placeholder="Nombre"
                                value={nombre}
                                onChange={ handleChange }
                            />
                            <span className="focus-input100"></span>
                        </div>
                        
                        <div className="wrap-input100 validate-input m-b-16">
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
                        
                        <div className="wrap-input100 validate-input m-b-16">
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
                                Registrar
                            </button>
                        </div>

                        <Link to={'/'} className="m-t-20 login-txt">
                            ¿Ya tienes cuenta? Inicia sesión
                        </Link>

                    </form>

                    <Notificacion notify={notify} setNotify={setNotify}/>
                </div>
            </div>
        </div>
     );
}
 
export default Registro;
