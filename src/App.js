import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Registro from './components/auth/Registro';
import Proyectos from './components/proyectos/Proyectos';
import RutaPrivada from './components/rutas/RutaPrivada';
import tokenAuth from './config/token';
import AuntenticacionState from './context/autenticacion/AutenticacionState';
import ProyectoState from './context/proyectos/ProyectoState';
import TareaState from './context/tareas/TareaState';

const token = localStorage.getItem('token');

if (token) {
  tokenAuth(token);
}

const App = () => {
  return (
  <ProyectoState>
    <TareaState>
      <AuntenticacionState>
          <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/registro" component={Registro} />
              <RutaPrivada exact path="/proyectos" component={Proyectos} />
            </Switch>
          </Router>
       </AuntenticacionState>
    </TareaState>
  </ProyectoState>
  );
}

export default App;
