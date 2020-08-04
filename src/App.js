import React from 'react';
import './App.css';
import Header from "./Componentes/Layout/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Componentes/Layout/Dashboard';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Pokemon from './Componentes/Pokemons/Pokemon';
import backgroundImg from './background.png';

function App() {
  return (
    <Router>
      <div className="App" style={{ background: `url(${backgroundImg})` }}>
        <Header />
        <div className="container">
        <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/pokemon/:pokemonIndex" component={Pokemon} />
            </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
