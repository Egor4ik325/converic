import React, { Component } from 'react';

export default class History extends Component {
    renderConversions() {
        if (localStorage.getItem('history') === null) {
            return <p>Nothign in the history(</p>;
        }

        const history = JSON.parse(localStorage.getItem('history'));

        const conversions = history.map(conversion => (
            <div>
                <img src={conversion.resultImageUrl} width="100" alt="Result" />
                on {new Date(conversion.date).toString()},
                size: {conversion.size}
                <a href={conversion.resultImageUrl}>Download</a>
                from {conversion.from} to {conversion.to}
            </div>
        ));

        return conversions;
    }

    render() {
        return (
            <div className="py-3 border-top">
                <div className="container">
                    <h1>History of the all recent image conversions:</h1>
                    {this.renderConversions()}
                </div>
            </div>
        );
    }
}
