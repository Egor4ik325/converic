import React, { Component, Fragment } from "react";
import Header from "./components/Header"
import ImageConverter from "./components/Converter"

class App extends Component {
    render() {
        return (
            <Fragment>
                <Header />
                <ImageConverter />
            </Fragment>
        );
    }
}

export default App;