import React, { Component } from 'react';
import Axios from 'axios';
import pkimg2 from '../Layout/pkimg2.png';
import '../../../src/App.css';

const TYPE_COLORS = {
  bug: 'B1C12E',
  dark: '4F3A2D',
  dragon: '755EDF',
  electric: 'FCBC17',
  fairy: 'F4B1F4',
  fighting: '823551D',
  fire: 'E73B0C',
  flying: 'A3B3F7',
  ghost: '6060B2',
  grass: '3E5C2D',
  ground: 'D3B357',
  ice: 'A3E7FD',
  normal: 'C8C4BC',
  poison: '934594',
  psychic: 'ED4882',
  rock: 'B9A156',
  steel: 'B5B5C3',
  water: '3295F6'
};

export default class Pokemon extends Component {
  state = {
    name: '',
    pokemonIndex: '',
    imageUrl: '',
    types: [],
    description: '',
    stats: {
      hp: '',
      attack: '',
      defense: '',
      speed: '',
      abilities: '',
    },
  };

  async componentDidMount() {
    const { pokemonIndex } = this.props.match.params;

    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

    const pokemonRes = await Axios.get(pokemonUrl);

    const name = pokemonRes.data.name;
    const imageUrl = pokemonRes.data.sprites.front_default;

    let { hp, attack, defense, speed } = '';

    pokemonRes.data.stats.map(stat => {
      switch (stat.stat.name) {
        case 'hp':
          hp = stat['base_stat'];
          break;
        case 'attack':
          attack = stat['base_stat'];
          break;
        case 'defense':
          defense = stat['base_stat'];
          break;
        case 'speed':
          speed = stat['base_stat'];
          break;

        default:
          break;
      }
    });

    const types = pokemonRes.data.types.map(type => type.type.name);

    const themeColor = `${TYPE_COLORS[types[types.length - 1]]}`;

    const abilities = pokemonRes.data.abilities
      .map(ability => {
        return ability.ability.name.toLowerCase();
      })
      .join(', ');

    this.setState({
      imageUrl,
      pokemonIndex,
      name,
      types,
      stats: {
        hp,
        attack,
        defense,
        speed,
      },
      themeColor,
      abilities
    });
  }

  render() {
    return (
      <div className="card" style={{ background: `url(${pkimg2})` }}>
        <div className="row">
          <div className="col-md-4">
            <div className="card-body">
              <h5 className="card-title">
                {'#' + this.state.pokemonIndex} <br />
              </h5>
              <h1>
                {this.state.name.toUpperCase()}
              </h1>
            </div>
            <div className="card-body">
              {this.state.types.map(type => (
                <span
                  key={type}
                  className="rounded mr-1"
                  style={{
                    backgroundColor: `#${TYPE_COLORS[type]}`,
                    color: 'white',
                    fontSize: '30px',
                  }}
                >{type.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
          <div className="col-md-4">
            <img
              src={this.state.imageUrl}
              className="card-img-top rounded mx-auto"
            />
          </div>
          <div className="col-md-4">
            <br />
            <div className="row align-items-center">
              <h5>
                Vida:&nbsp;
                  </h5>
              <div>
                <h6>{this.state.stats.hp}</h6>
              </div>
            </div>
            <br />
            <div className="row align-items-center">
              <h5>
                Ataque:&nbsp;
                  </h5>
              <div>
                <h6>{this.state.stats.attack}</h6>
              </div>
            </div>
            <br />
            <div className="row align-items-center">
              <h5>
                Defesa:&nbsp;
                  </h5>
              <div>
                <h6>{this.state.stats.defense}</h6>
              </div>
            </div>
            <br />
            <div className="row align-items-center">
              <h5>
                Velocidade:&nbsp;
                  </h5>
              <div>
                <h6>{this.state.stats.speed}</h6>
              </div>
            </div>
            <br />
            <div className="row align-items-center">
              <h5>
                Abilities:&nbsp;
                  </h5>
              <div>
                <h5>{this.state.abilities}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
