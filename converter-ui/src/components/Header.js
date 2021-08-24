import React, { Component } from "react";
import logo from '../logo.svg';

class Header extends Component {
    render() {
        return (
            <header className="p-3 border-bottom">
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
        );
    }
}

export default Header;