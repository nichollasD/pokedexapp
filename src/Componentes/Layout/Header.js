import React, { Component } from 'react';
import styled from 'styled-components';

export default class Header extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-md fixed-top" style={{ backgroundColor: `black` }}>
                    <a className="navbar-brand col-sm-3 col-md-2 mr-0 align-items-center" style={{ color: `white` }}>
                        POKEDEX
                    </a>
                </nav>
            </div>
        )
    }
}
