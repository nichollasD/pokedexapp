import React, { Component } from 'react';
import PokemonChart from './Pokechart';
import axios from 'axios';
import Pokechart from './Pokechart';

export default class Pokelist extends Component {
  state = {
    // url: 'https://pokeapi.co/api/v2/pokemon/',
    url: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=807',
    pokemon: null
  };

  async componentDidMount() {
    const res = await axios.get(this.state.url);
    this.setState({ pokemon: res.data['results'] });
  }

  render() {
    return (
      <div>
        {this.state.pokemon ? (
          <div className="row">
            {this.state.pokemon.map(pokemon => (
              <Pokechart
                key={pokemon.name}
                name={pokemon.name}
                url={pokemon.url}
              />
            ))}
          </div>
        ) : (
            <h1>Carregando...</h1>
        )}
      </div>
    );
  }
}