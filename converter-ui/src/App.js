import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ConvertHero from "./components/ConvertHero"
import ErrorHero from "./components/Error";
import ImageConverter from "./components/Converter";
import Features from "./components/Features";
import Footer from "./components/Footer";
import History from "./components/History";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { AUTH_URL } from "./constants";

class App extends Component {
    constructor(props) {
        super(props);

        const history = localStorage.getItem('history');
        this.state = {
            // Current SPA page (home, convert, compress, history, profile) + error page
            page: 'home',
            conversionCount: history === null ? 0 : JSON.parse(history).length,
            isAuth: false, // wheather current user is auth
            csrfToken: null, // X-CSRFToken got from get_csrf/
        }
    }

    componentDidMount() {
        // Find out wheather user have any session (authenticated)
        this.getSession();
    }

    // Set current user session to the state
    getSession = () => {
        fetch(AUTH_URL + 'get_session/', {
            credentials: 'include' // always send cookies with request
        })
            .then(res => res.json())
            .then(data => {
                console.log("Get session: ", data);

                if (data.is_authenticated) {
                    this.setState({ isAuth: true });
                } else {
                    this.setState({ isAuth: false });
                }

                // Request CSRF token for future auth
                this.getCSRF();
            })
            .catch(err => console.error(err));
    }

    getCSRF = async () => {
        const res = await fetch(AUTH_URL + 'get_csrf/', {
            credentials: 'include'
        })
            .catch(error => { console.error(error); });
        const csrfToken = res.headers.get('X-CSRFToken');
        console.log("Get token for CSRD protection: ", csrfToken);

        this.setState({ csrfToken: csrfToken });
    }

    switchPage = page => {
        this.setState({
            page: page
        });
    }

    onConvert = () => {
        this.setState({
            conversionCount: this.state.conversionCount + 1
        });
    }

    render() {
        if (this.state.page === 'home') {
            return (
                <Fragment>
                    <Header onClick={this.switchPage} isAuth={this.state.isAuth} token={this.state.csrfToken} conversionCount={this.state.conversionCount} />
                    <Hero />
                    <ConvertHero />
                    <Features />
                    <Footer />
                </Fragment>
            );
        }

        if (this.state.page === 'convert') {
            return (
                <Fragment>
                    <Header onClick={this.switchPage} isAuth={this.state.isAuth} token={this.state.csrfToken} conversionCount={this.state.conversionCount} />
                    <ImageConverter onConvert={this.onConvert} />
                    <Footer />
                </Fragment>
            );
        }

        if (this.state.page === 'history') {
            return (
                <Fragment>
                    <Header onClick={this.switchPage} isAuth={this.state.isAuth} token={this.state.csrfToken} conversionCount={this.state.conversionCount} />
                    <History />
                    <Footer />
                </Fragment>
            )
        }

        if (this.state.page === 'signup' || this.state.page === 'login') {
            return (
                <Fragment>
                    <Header onClick={this.switchPage} isAuth={this.state.isAuth} token={this.state.csrfToken} conversionCount={this.state.conversionCount} />
                    {
                        this.state.page === 'signup' ?
                            <SignUp token={this.state.csrfToken} switchPage={this.switchPage} />
                            :
                            <Login token={this.state.csrfToken} switchPage={this.switchPage} />
                    }
                    <Footer />
                </Fragment>
            );
        }

        if (this.state.page === 'error') {
            return (
                <Fragment>
                    <Header onClick={this.switchPage} isAuth={this.state.isAuth} token={this.state.csrfToken} conversionCount={this.state.conversionCount} />
                    <ErrorHero />
                    <Footer />
                </Fragment>
            );
        }

        return <div>No page selected!</div>;
    }
}

export default App;