import React, { Component } from 'react';
import earthImage from "./earth-image.jpg";

export default class ConvertHero extends Component {
    render() {
        return (
            <div className="border-bottom py-3">
                <div className="container col-xxl-8 px-4 py-5">
                    <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                        <div className="col-10 col-sm-8 col-lg-6">
                            <img
                                className="d-block img-fluid rounded mx-lg-auto"
                                src={earthImage} alt="Earth"
                                width="700" height="500"
                                loading="lazy"
                            />
                        </div>
                        <div className="col-lg-6">
                            <h1 className="display-5 fw-bold lh-1 mb-3">Convert anytime anywhere!</h1>
                            <p className="lead">
                                Quickly convert images from extansible list of supported formats.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}