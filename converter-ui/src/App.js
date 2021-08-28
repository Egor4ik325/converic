import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ConvertHero from "./components/ConvertHero"
import ErrorHero from "./components/Error";
import ImageConverter from "./components/Converter";
import Features from "./components/Features";
import Footer from "./components/Footer";

class App extends Component {
    state = {
        // Current SPA page (home, convert, compress, history, profile) + error page
        page: 'home'
    }

    switchPage = page => {
        this.setState({
            page: page
        });
    }

    render() {
        if (this.state.page === 'home') {
            return (
                <Fragment>
                    <Header onClick={this.switchPage} />
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
                    <Header onClick={this.switchPage} />
                    <ImageConverter />
                    <Footer />
                </Fragment>
            );
        }

        if (this.state.page === 'error') {
            return (
                <Fragment>
                    <Header onClick={this.switchPage} />
                    <ErrorHero />
                    <Footer />
                </Fragment>
            );
        }

        return <div>No page selected!</div>;
    }
}

export default App;