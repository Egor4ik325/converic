import React, { Component } from 'react';
import { API_URL } from '../constants';

export default class Converter extends Component {
    // Save form input states
    constructor(props) {
        super(props);

        this.state = {
            image: null
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
            })
            .catch(err => {
                console.log("Error");
            })
    }

    render() {
        return (
            <div className="my-3 mx-5">
                <form onSubmit={this.handleSubmit} encType="multipart/formdata">
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
            </div >
        );
    }
}