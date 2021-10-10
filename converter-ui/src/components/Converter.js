import React, { Component } from 'react';
import { API_URL, MEDIA_URL } from '../constants';
import { getSupportedFormats } from '../api/Convert';

// Image convertions multi-stage interface
export default class Convert extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // Conversion process progress/stage (select -> convert -> download)
            progress: 'select',
            // Seleted image (as a File object)
            image: null,
            // Supported image conversion formats
            supportedFormats: null,
            targetFormat: null,
            // Url of the converted image
            resultImageUrl: null
        }

        this.handleFormatInputChange = this.handleFormatInputChange.bind(this);
    }

    async componentDidMount() {
        const supportedFormats = await getSupportedFormats()
        this.setState({
            supportedFormats: supportedFormats
        });
    }

    handleImageInputChange = e => {
        // Save File object (Blob) from FileList
        const image = e.target.files[0];

        // 1. Save selected file in the state
        // 2. Go to the next step
        this.setState({
            image: image,
            progress: 'convert'
        });
    }

    handleFormatInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // Render result converted image
    renderResultImage = () => {
        if (this.state.resultImageUrl) {
            return (
                <img src={this.state.resultImageUrl} alt="Converter result" width="200" />
            );
        } else {
            return <p class="text-danger">Image is not converted</p>;
        }
    }

    handleTargetFormatInput = e => {
        const targetFormat = e.target.value;

        this.setState({
            targetFormat: targetFormat
        });
    }

    // Declare methods using arrow function (access this)
    handleConvert = () => {
        // Create <form> key:value data (auto multipart/form-data header)
        const formData = new FormData();
        // Append input:file
        formData.append('image', this.state.image);
        formData.append('target_format', this.state.targetFormat);

        fetch(API_URL + 'convert/', {
            method: 'POST',
            // Request body = form data
            body: formData
        })
            .then(res => {
                if (res.ok) {
                    console.log("Success");
                } else {
                    throw new Error();
                }
                return res.json();
            })
            .then(data => {
                console.log(data.storage_name);

                // Save storage name in state
                const convertedImageUrl = MEDIA_URL + data.storage_name;

                // Add conversion to the history (local storage)
                // History = array of objects containing: resultUrl, date and size of the conversion
                if (localStorage.getItem('history') === null) {
                    localStorage.setItem('history', JSON.stringify([]));
                }
                let history = JSON.parse(localStorage.getItem('history'));
                const conversion = {
                    resultImageUrl: convertedImageUrl,
                    from: this.getSourceImageFormat(),
                    to: this.state.targetFormat,
                    date: new Date().toJSON(),
                    size: this.state.image.size,
                }
                history.push(conversion);
                localStorage.setItem('history', JSON.stringify(history));

                // Imcrement counter
                this.props.onConvert();

                this.setState({
                    ...this.state,
                    resultImageUrl: convertedImageUrl,
                    progress: 'download',
                });
            })
            .catch(err => {
                console.log("Error");
            })
    }

    renderSelect = () => {
        return (
            <div className="m-5 p-5 bg-light border rounded-3 text-center">
                <h2 className="mb-5">1. Select image file to conver</h2>

                <form className="d-none">
                    <input id="image-input" type="file" onChange={this.handleImageInputChange}></input>
                </form>

                <button className="btn btn-primary btn-lg" onClick={() => document.querySelector('#image-input').click()}>
                    Select
                </button>

                <div>Progress nodes (1, 2, 3): TODO</div>
            </div>
        );
    }

    // Render selected source image
    renderSourceImage = () => {
        if (this.state.image) {
            // Convert binary image data into blob url for <img>
            return (
                <img src={URL.createObjectURL(this.state.image)} alt="Source" width="200" onLoad={URL.revokeObjectURL(this.src)} />
            );
        } else {
            return <p class="text-danger">Image is not selected</p>;
        }
    }

    getSourceImageFormat = () => {
        const mimeType = this.state.image.type;
        const format = mimeType.match('image/(.*)')[1];
        return format;
    }

    capitalizeFormat(format) {
        if (format === 'webp') {
            return 'WebP';
        }

        return format.toUpperCase();
    }

    getTargetFormatsOptions = () => {
        const sourceFormat = this.getSourceImageFormat().toLowerCase();
        return this.state.supportedFormats[sourceFormat].map(format => <option value={format}>{this.capitalizeFormat(format)}</option>);
    }

    renderConvert = () => {
        return (
            <div className="m-5 p-5 bg-light border rounded-3 text-center">
                <h2 className="mb-5">2. Choose image conversion format</h2>
                {this.renderSourceImage()}
                <small>Name: {this.state.image.name}, type/format: {this.state.image.type}, size: {this.state.image.size}</small>

                {/* <form>
                    <input type="select"></input>
                </form> */}
                <div className="d-flex">
                    <form>
                        From:
                        <select disabled={true} name="source-format">
                            <option>{this.capitalizeFormat(this.getSourceImageFormat())}</option>
                        </select>
                        To:
                        <select name="target-format" onClick={this.handleTargetFormatInput}>
                            {
                                this.state.supportedFormats ? this.getTargetFormatsOptions()
                                    : (
                                        <option>Loading...</option>
                                    )
                            }
                        </select>
                    </form>
                </div>

                <div>Each format description: TODO</div>

                <button type="button" className="btn btn-primary btn-lg" onClick={this.handleConvert}>
                    Convert
                </button>
            </div>
        );
    }

    handleResultDownload = () => {

    }

    renderDownload() {
        return (
            <div className="m-5 p-5 bg-light border rounded-3 text-center">
                <h2 className="mb-5">3. Download converted image</h2>
                <div>Result image:</div>
                <div>{this.renderResultImage()}</div>
                {/* Open form */}
                <form method="GET" action={this.state.resultImageUrl}>
                    <button
                        type="submit"
                        className="btn btn-primary btn-lg"
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                    >
                        Download
                    </button>
                </form>
            </div>
        );
    }

    render() {
        if (this.state.progress === 'select') {
            return this.renderSelect();
        }

        if (this.state.progress === 'convert') {
            return this.renderConvert();
        }

        if (this.state.progress === 'download') {
            return this.renderDownload();
        }

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
                </div>
            </div>
        );
    }
}