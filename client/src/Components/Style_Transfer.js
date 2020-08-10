import React from "react";
import axios from "axios";
import InputFile from "./InputFile";
let fileDownload = require('react-file-download');
class Style_Transfer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 300,
            photo: "",
            mask: "",
            result: "",
            loading:false
        };
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.handleChangeMask = this.handleChangeMask.bind(this);
        this.handleDownload = this.handleDownload.bind(this);
    }


    generate() {

    }

    toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    async handleChangeImage(picture) {
        if (picture[0]) {
            let photo = await this.toBase64(picture[0]);
            this.setState({photo, result: ""});
        }
    }

    async handleChangeMask(picture) {
        if (picture[0]) {
            let mask = await this.toBase64(picture[0]);
            this.setState({mask, result: ""});
        }
    }

    handleDownload() {
        let data = this.state.result;
        if (data) {
            data = this.convertDataURIToBinary(data)
            fileDownload(data, 'output.png');
        } else {
            alert("Not found image")
        }
    }
    render() {
        return (
            <div className="container justify-content-around">
                <div>
                    <div className="d-flex flex-wrap justify-content-around align-content-around">


                        <div className="card"
                             style={{marginBottom: 20, marginLeft: 20, marginRight: 20, minWidth: this.state.width}}>
                            <div className="card-header">
                                <ul className="nav mb-3" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" data-toggle="pill"
                                           role="tab" aria-selected="true">Upload photo</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="card-body">
                                <div className="tab-content d-flex justify-content-center">
                                    <div className="tab-pane fade show active" role="tabpanel"
                                         style={{maxWidth: 500}}>
                                        <InputFile onChange={this.handleChangeImage}/>
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div className="card" style={{marginBottom: 20, marginLeft: 20, marginRight: 20, minWidth: this.state.width}} >
                            <div className="card-header">
                                <ul className="nav nav-pills mb-3" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" data-toggle="pill" href="#styles-popular"
                                           role="tab" aria-selected="true">Popular styles</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="pill" href="#styles-upload"
                                           role="tab" aria-selected="false">My style</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="card-body">
                                <div className="tab-content">
                                    <div className="tab-pane fade show active" id="styles-popular" role="tabpanel"
                                         style={{minWidth: 300}}>
                                        <div className="d-flex flex-wrap overflow-auto"
                                             style={{maxWidth: 400, maxHeight: 300}}>
                                            <img src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"
                                                 className="style-popular rounded float-left img-thumbnail img-fluid"
                                                 alt="..."
                                                 style={{width: 120, height: 120}}/>

                                            <img src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"
                                                 className="style-popular rounded float-left img-thumbnail img-fluid"
                                                 alt="..."
                                                 style={{width: 120, height: 120}}/>
                                            <img src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"
                                                 className="style-popular rounded float-left img-thumbnail img-fluid"
                                                 alt="..."
                                                 style={{width: 120, height: 120}}/>
                                            <img src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"
                                                 className="style-popular rounded float-left img-thumbnail img-fluid"
                                                 alt="..."
                                                 style={{width: 120, height: 120}}/>
                                            <img src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"
                                                 className="style-popular rounded float-left img-thumbnail img-fluid"
                                                 alt="..."
                                                 style={{width: 120, height: 120}}/>
                                            <img src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"
                                                 className="style-popular rounded float-left img-thumbnail img-fluid"
                                                 alt="..."
                                                 style={{width: 120, height: 120}}/>

                                            <img src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"
                                                 className="style-popular rounded float-left img-thumbnail img-fluid"
                                                 alt="..."
                                                 style={{width: 120, height: 120}}/>
                                            <img src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"
                                                 className="style-popular rounded float-left img-thumbnail img-fluid"
                                                 alt="..."
                                                 style={{width: 120, height: 120}}/>
                                            <img src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"
                                                 className="style-popular rounded float-left img-thumbnail img-fluid"
                                                 alt="..."
                                                 style={{width: 120, height: 120}}/>
                                            <img src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"
                                                 className="style-popular rounded float-left img-thumbnail img-fluid"
                                                 alt="..."
                                                 style={{width: 120, height: 120}}/>
                                            <img src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"
                                                 className="style-popular rounded float-left img-thumbnail img-fluid"
                                                 alt="..."
                                                 style={{width: 120, height: 120}}/>

                                            <img src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"
                                                 className="style-popular rounded float-left img-thumbnail img-fluid"
                                                 alt="..."
                                                 style={{width: 120, height: 120}}/>
                                            <img src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"
                                                 className="style-popular rounded float-left img-thumbnail img-fluid"
                                                 alt="..."
                                                 style={{width: 120, height: 120}}/>
                                            <img src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"
                                                 className="style-popular rounded float-left img-thumbnail img-fluid"
                                                 alt="..."
                                                 style={{width: 120, height: 120}}/>
                                            <img src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"
                                                 className="style-popular rounded float-left img-thumbnail img-fluid"
                                                 alt="..."
                                                 style={{width: 120, height: 120}}/>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="styles-upload" role="tabpanel">
                                        <InputFile onChange={this.handleChangeMask}/>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

                <br/>

                <div className="card text-center">
                    <div className="card-header">
                        <div>Export Image</div>
                        <br/>
                        <div className="d-flex justify-content-center">

                            <div className="spinner-grow text-primary" hidden={!this.state.loading} role="status"></div>
                            <button type="button" onClick={this.generate} hidden={this.state.loading}
                                    className="btn btn-outline-primary">
                                Generate
                            </button>
                            <br/>
                        </div>

                    </div>
                    <div className="card-body">
                        <div className="d-flex flex-wrap justify-content-around ">
                            <img src={this.state.photo} hidden={this.state.photo == ""}
                                 className="rounded float-left img-thumbnail img-fluid"
                                 style={{
                                     width: 400,
                                     height: "auto",
                                 }}/>
                            <img src={this.state.mask} hidden={this.state.mask == ""}
                                 className="rounded float-right img-thumbnail img-fluid"
                                 style={{
                                     width: 400,
                                     height: "auto",
                                 }}/>

                            <img src={this.state.result} hidden={this.state.result == ""}
                                 className="rounded float-right img-thumbnail img-fluid"
                                 style={{
                                     width: 400,
                                     height: "auto",
                                 }}/>
                        </div>
                    </div>
                    <div className="card-footer text-muted">
                        <button type="button" className="btn btn-outline-primary"
                                onClick={this.handleDownload}>Download
                        </button>
                    </div>
                </div>
            </div>

        );
        // }
    }
}

export default Style_Transfer;