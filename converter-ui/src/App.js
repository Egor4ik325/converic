import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ImageConverter from "./components/Converter";
import Features from "./components/Features";
import Footer from "./components/Footer";

class App extends Component {
    render() {
        return (
            <Fragment>
                <Header />
                <Hero />
                <ImageConverter />
                <Features />
                <Footer />
            </Fragment>
        );
    }
}

export default App;