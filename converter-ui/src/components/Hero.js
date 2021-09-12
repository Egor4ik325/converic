import React, { Component, Fragment } from 'react';
import logo from "./logo.png";

class Hero extends Component {
    render() {
        return (
            <div className="border-bottom text-center py-5">
                <img src={logo} width="72" />
                <h1 className="my-2 display-5 fw-bold">
                    Converic
                </h1>
                <p className="lead">
                    <span className="fst-italic">Lighting</span> ⚡️ fast image conversion service.
                </p>
            </div>
        );
    }
}

export default Hero;
