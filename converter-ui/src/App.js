import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ConvertHero from "./components/ConvertHero"
import ErrorHero from "./components/Error";
import ImageConverter from "./components/Converter";
import Features from "./components/Features";
import Footer from "./components/Footer";
import History from "./components/History";

class App extends Component {
    constructor(props) {
        super(props);

        const history = localStorage.getItem('history');
        this.state = {
            // Current SPA page (home, convert, compress, history, profile) + error page
            page: 'home',
            conversionCount: history === null ? 0 : JSON.parse(history).length
        }
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
                    <Header onClick={this.switchPage} conversionCount={this.state.conversionCount} />
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
                    <Header onClick={this.switchPage} conversionCount={this.state.conversionCount} />
                    <ImageConverter onConvert={this.onConvert} />
                    <Footer />
                </Fragment>
            );
        }

        if (this.state.page === 'history') {
            return (
                <Fragment>
                    <Header onClick={this.switchPage} conversionCount={this.state.conversionCount} />
                    <History />
                    <Footer />
                </Fragment>
            )
        }

        if (this.state.page === 'error') {
            return (
                <Fragment>
                    <Header onClick={this.switchPage} conversionCount={this.state.conversionCount} />
                    <ErrorHero />
                    <Footer />
                </Fragment>
            );
        }

        return <div>No page selected!</div>;
    }
}

export default App;