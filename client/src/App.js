import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PokeListContainer from './components/PokeListContainer/PokeListContainer';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import PokeDetailContainer from './components/PokeDetailContainer/PokeDetailContainer';
import CreatePokemon from './components/CreatePokemon/CreatePokemon';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/PokeList" component={PokeListContainer} />
          <Route path="/PokeDetail/:id" component={PokeDetailContainer} />
          <Route path="/Create" component={CreatePokemon} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
