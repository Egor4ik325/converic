import React, { Component, Fragment } from 'react';
import { API_URL, MEDIA_URL } from '../constants';

// Image convertions multi-stage interface
export default class Converter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // Conversion process stage (select -> convert -> download)
            stage: 'select',
            // Seleted image (as a File object)
            image: null,
            // Url of the converted image
            resultImageUrl: null
        }

        this.handleFormatInputChange = this.handleFormatInputChange.bind(this);
    }

    handleImageInputChange = e => {
        // Save File object (Blob) from FileList
        const image = e.target.files[0];

        // Save selected file in the state
        this.setState({
            image: image
        });
    }

    handleFormatInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // Render selected source image
    renderSourceImage = () => {
        if (this.state.image) {
            // Convert binary image data into blob url for <img>
            return (
                <img src={URL.createObjectURL(this.state.image)} width="200" onLoad={URL.revokeObjectURL(this.src)} />
            );
        } else {
            return <p class="text-danger">Image is not selected</p>;
        }
    }

    // Render result converted image
    renderResultImage = () => {
        if (this.state.resultImageUrl) {
            return (
                <img src={this.state.resultImageUrl} width="200" />
            );
        } else {
            return <p class="text-danger">Image is not converted</p>;
        }
    }

    // Declare methods using arrow function (access this)
    handleSubmit = (submitEvent) => {
        // Prevent default submit logic on submit event!
        submitEvent.preventDefault();

        // Create <form> key:value data (auto multipart/form-data header)
        const formData = new FormData();
        // Append input:file
        formData.append('image', this.state.image);

        fetch(API_URL + 'convert/', {
            method: 'POST',
            // Request body = form data
            body: formData
        })
            .then(res => {
                if (res.ok) {
                    console.log("Success");
                }
                return res.json();
            })
            .then(data => {
                console.log(data.storage_name);

                const convertedImageUrl = MEDIA_URL + data.storage_name;

                // Save storage name in state
                this.setState({
                    ...this.state,
                    resultImageUrl: convertedImageUrl
                });

                // Clear form fields
                const form = submitEvent.target;
                form.reset();
            })
            .catch(err => {
                console.log("Error");
            })
    }

    render() {
        return (
            <div className="bg-light py-3 border-bottom">
                <div className="container">
                    <div id="source-img">
                        Source image:
                        {this.renderSourceImage()}
                    </div>

                    <div id="result-img">
                        Result image:
                        {this.renderResultImage()}
                    </div>







                    <form onSubmit={this.handleSubmit}>
                        <div className="mb-2">
                            <label htmlFor="file" className="form-label">Select image to convert: </label>
                            <input type="file" className="form-control" name="image" id="file" onChange={this.handleImageInputChange}></input>
                        </div>
                        <div className="mb-2">
                            <label className="form-label" htmlFor="source-format">Select source image format: </label>
                            <select id="source-format" className="form-select" name="source-format" onChange={this.handleFormatInputChange}>
                                <option></option>
                                <option>JPEG</option>
                                <option>PNG</option>
                            </select>
                        </div>
                        <div className="mb-2">
                            <label className="form-label" htmlFor="target-format">Select target image format: </label>
                            <select id="target-format" className="form-select" name="target-format" onChange={this.handleFormatInputChange}>
                                <option></option>
                                <option>JPEG</option>
                                <option>PNG</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Convert</button>
                    </form >
                </div>
            </div>
        );
    }
}