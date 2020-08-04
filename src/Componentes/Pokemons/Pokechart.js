import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Axios from 'axios';
import pkimg from '../Layout/pkimg.png';
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

const Card = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  -moz-user-select: none;
  -website-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -o-user-select: none;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export default class Pokechart extends Component {
  state = {
    name: '',
    pokemonIndex: '',
    imageUrl: '',
    types: [],
  };

  async componentDidMount() {
    const { url } = this.props;
    const pokemonIndex = url.split('/')[url.split('/').length - 2];

    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

    const pokemonRes = await Axios.get(pokemonUrl);
    const types = pokemonRes.data.types.map(type => type.type.name);
    const themeColor = `${TYPE_COLORS[types[types.length - 1]]}`;

    const name = pokemonRes.data.name;
    const imageUrl = pokemonRes.data.sprites.front_default;

    this.setState({
      imageUrl,
      pokemonIndex,
      name,
      types,
      themeColor,
    });
  }

  render() {
    return (
      <div className="col-md-12 mb-4">
        <StyledLink to={`pokemon/${this.state.pokemonIndex}`}>
          <Card className="card" style={{ background: `url(${pkimg})` }}>
            <div className="row">
              <div className="col-md-6">
                <div className="card-body">
                  <h5 className="card-title">
                    {'#' + this.state.pokemonIndex} <br />
                  </h5>
                  <h1>
                    <b>
                    {this.state.name.toUpperCase()}
                    </b>
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
              <div className="col-md-6">
                <div className=" col-md-6 ">
                  <div className=" align-text-bottom ">
                    <img
                      src={this.state.imageUrl}
                      className="card-img-top rounded mx-auto mt-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </StyledLink>
      </div>
    );
  }
}

