import React, { Component } from "react";
import logo from './logo.png';

import { AUTH_URL } from "../constants";
import { logout } from "./SignUp";

// Navigation header (navbar)
// Display brand, logo, navigation and profile
class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            session: null
        }
    }

    handleClick = e => {
        // Prevent navigation to the #
        e.preventDefault();

        // Switch app page
        this.props.onClick(e.target.dataset.page);
    }

    getSession = () => {
        fetch(AUTH_URL + 'get_session/', {
            credentials: 'include' // always send cookies with request
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ session: data });
            })
            .catch(err => console.error(err));
    }


    componentDidMount() {
        this.getSession();
    }

    render() {
        return (
            <header className="py-3 border-bottom">
                <div className="container d-md-flex flex-wrap justify-content-left">
                    <a className="d-flex justify-content-center align-items-center text-decoration-none mb-3 mb-md-1 me-md-4" href="#home" data-page="home" onClick={this.handleClick}>
                        <img className="me-2" src={logo} alt="Logo" width="32" height="32" data-page="home" onClick={this.handleClick} />
                        <span className="text-dark fs-4 fw-bold" data-page="home" onClick={this.handleClick}>Converic</span>
                    </a>
                    <ul className="nav mb-2 mb-md-0 me-md-auto d-flex justify-content-center">
                        <li className="nav-item">
                            <a class="nav-link link-secondary" href="#convert" data-page="convert" onClick={this.handleClick}>Convert</a>
                        </li>
                        <li className="nav-item">
                            <a class="nav-link link-secondary" href="#compress">Compress</a>
                        </li>
                        <li className="nav-item">
                            <a class="nav-link link-secondary" href="#history" data-page="history" onClick={this.handleClick}>History <span className="badge rounded-pill bg-primary">{this.props.conversionCount}</span></a>
                        </li>
                    </ul>
                    {
                        !this.props.isAuth ?
                            <div className="text-center">
                                <button
                                    className="btn btn-outline-success me-2" type="button"
                                    data-page="login"
                                    onClick={this.handleClick}
                                >
                                    Login
                                </button>
                                <button className="btn btn-info text-white" type="button" data-page="signup" onClick={this.handleClick}>Sign-up</button>
                            </div>
                            :
                            <div>
                                <button
                                    className="btn btn-outline-secondary me-2"
                                    onClick={() => logout(this.props.token)}
                                >Logout</button>
                                <span>
                                    {
                                        this.state.session ?
                                            <b>{this.state.session.email}</b>
                                            :
                                            <span>Noname</span>
                                    }
                                </span>
                            </div>
                    }
                </div>
            </header>
        );
    }
}
/*
<header className="p-4 border-bottom">
    <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a href="#" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
                <img src={logo} alt="Logo" className="image-tumbnail" width="40" />
            </a>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                <li><a href="#" className="nav-link px-2 link-secondary">Converter</a></li>
                <li><a href="#" className="nav-link px-2 link-dark">Recent</a></li>
                <li><a href="#" className="nav-link px-2 link-dark">Compressor</a></li>
                <li><a href="#" className="nav-link px-2 link-dark">Formats</a></li>
            </ul>

            <div className="dropdown text-end">
                <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="" alt="mdo" className="rounded-circle" width="32" height="32" />
                </a>
                <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                    <li><a className="dropdown-item" href="#">New project...</a></li>
                    <li><a className="dropdown-item" href="#">Settings</a></li>
                    <li><a className="dropdown-item" href="#">Profile</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#">Sign out</a></li>
                </ul>
            </div>
        </div>
    </div>
</header>
*/

export default Header;