import React, { Component } from 'react';
import { AUTH_URL } from '../constants';

export const logout = async token => {
    try {
        const response = await fetch(AUTH_URL + 'logout/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": token,
            },
        });

        const body = await response.json();
        return body;
    } catch (err) {
        console.error(err);
    }
}

export default class SignUp extends Component {
    state = {
        username: null,
        email: null,
        password: null,
    }

    // Register new account 
    register = async () => {
        const response = await fetch(AUTH_URL + 'register/', {
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
        this.register();
    }

    render() {
        return (
            <div className="py-3 border-top">
                <div className="container">
                    <form onSubmit={this.handleFormSubmit}>
                        <input
                            className="d-block" type="email" name="email" placeholder="Email" required={true}
                            onChange={this.handleInputChange}
                        ></input>
                        <input
                            className="d-block" type="password" name="password" placeholder="Your password" required={true}
                            onChange={this.handleInputChange}
                        ></input>
                        <input
                            className="d-block" type="text" name="username" placeholder="Username"
                            onChange={this.handleInputChange}
                        ></input>
                        <button type="submit">Sign-up</button>
                    </form>
                </div>
            </div>
        );
    }
}