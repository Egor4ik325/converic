import React, { Component } from 'react';
import { AUTH_URL } from '../constants';

export default class Login extends Component {
    state = {
        email: null,
        password: null,
    }

    // Login into the account
    login = async () => {
        const response = await fetch(AUTH_URL + 'login/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": this.props.token,
            },
            credentials: 'include',
            body: JSON.stringify(this.state),
        })

        if (!response.ok) {
            throw Error(response.statusText);
        }

        this.props.switchPage('home');
    }

    handleInputChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    handleFormSubmit = e => {
        e.preventDefault();
        this.login();
    }

    render() {
        return (
            <div className="py-3 border-top">
                <div className="container">
                    <h1>Login into the account</h1>
                    <form onSubmit={this.handleFormSubmit}>
                        <input
                            className="d-block" type="email" name="email" placeholder="Email" required={true}
                            onChange={this.handleInputChange}
                        ></input>
                        <input
                            className="d-block" type="password" name="password" placeholder="Your password" required={true}
                            onChange={this.handleInputChange}
                        ></input>
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        );
    }
}