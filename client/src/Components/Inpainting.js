import React from "react";
import axios from "axios";
import InputFile from "./InputFile";
import CanvasDraw from "react-canvas-draw";
import Slider from '@material-ui/core/Slider';
import {db, storage} from './db'

let fileDownload = require('react-file-download');

let apis = [
    //"https://1c247520.ngrok.io",
    //"http://localhost:5000"
    "https://inpainting-demo-server.herokuapp.com/"

    //
];

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

class Inpainting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 20,
            mask: "",
            photo: "",
            result: "",
            photo_gen: "",
            result_gen: "",
            loading: false,
            width: 300,
            height: 200,
            level: 0,
            circles: []
        };

        this.canvas = React.createRef();
        this.handleChangeWidthPen = this.handleChangeWidthPen.bind(this);
        this.handleChangeMask = this.handleChangeMask.bind(this);
        this.handleDownload = this.handleDownload.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleUndo = this.handleUndo.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.generate = this.generate.bind(this);
        // this.handlePost = this.handlePost.bind(this);
        // this.updateLevel = this.updateLevel.bind(this);
        // this.updateUrlImageLeft = this.updateUrlImageLeft.bind(this);
        // this.updateUrlImageRight = this.updateUrlImageRight.bind(this);
    }


    generate() {
        this.setState({loading: true});
        const photo = this.state.photo, mask = this.state.mask;
        let index = getRandomInt(apis.length);
        axios.post(`${apis[index]}/api/image-inpainting`, {photo, mask})
            .then(
                (result) => {
                    this.setState({
                        result: "data:image/jpeg;base64," + result.data,
                        // result: result.data.output_gen,
                        // photo_gen: result.data.output_circles,
                        // result_gen: result.data.output_circles_gen,
                        // circles: result.data.circles
                    });
                }
            )
            .catch((error) => {

            }).finally(() => {
            this.setState({loading: false});
        })
    }

    handleChangeWidthPen = (event, newValue) => {
        this.setState({
            value: newValue
        })
    };
    handleChangeMask = () => {
        this.setState({
            mask: this.canvas.current.canvas.drawing.toDataURL()
        })
    };

    async handleChangeImage(picture) {

        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });


        if (picture[0]) {
            this.handleClear();
            let image = await toBase64(picture[0]);


            const onLoadImage = image => new Promise((resolve, reject) => {
                let im = new Image;
                im.src = image;
                im.onload = () => resolve({width: im.width, height: im.height});
                im.onerror = error => reject(error);
            });

            let ret = await onLoadImage(image);

            let newWidth = Math.min(window.innerWidth - 50, ret.width);
            newWidth = Math.min(newWidth, 700);
            let newHeight = ret.height * newWidth / ret.width;
            this.setState({height: newHeight, width: newWidth, photo: image, result: ""});
            this.canvas.current.drawImage();
        }
    }


    handleClear() {
        this.canvas.current.clear();
        this.setState({
            mask: this.canvas.current.canvas.drawing.toDataURL()
        })
    }

    handleUndo() {
        this.canvas.current.undo();
        this.setState({
            mask: this.canvas.current.canvas.drawing.toDataURL()
        })
    }


    convertDataURIToBinary(dataURI) {
        let BASE64_MARKER = ';base64,';
        let base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
        let base64 = dataURI.substring(base64Index);
        let raw = window.atob(base64);
        let rawLength = raw.length;
        let array = new Uint8Array(new ArrayBuffer(rawLength));

        for (let i = 0; i < rawLength; i++) {
            array[i] = raw.charCodeAt(i);
        }
        return array;
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

    // async handlePost() {
    //     this.setState({loading: true});
    //     let ref = storage.ref().child('level_game_find_diff/' + this.state.level.toString());
    //     let left = ref.child("left.jpg");
    //     let right = ref.child("right.jpg");
    //
    //     let photo = this.state.photo;
    //     let result = this.state.result;
    //
    //     await left.putString(photo, 'data_url').then(function (snapshot) {
    //
    //     });
    //
    //     await right.putString(result, 'data_url').then(function (snapshot) {
    //
    //     });
    //
    //
    //     let url_image_left = await left.getDownloadURL().then(function (result) {
    //         return result;
    //     });
    //     let url_image_right = await right.getDownloadURL().then(function (result) {
    //         return result;
    //     });
    //
    //     let random = Math.floor(Math.random() * 2) === 0;
    //     if(random){
    //         let  temp = url_image_left;
    //         url_image_left = url_image_right;
    //         url_image_right = temp;
    //     }
    //     db.collection("level_game_find_diff").doc(this.state.level.toString()).set({
    //         url_image_left: url_image_left,
    //         url_image_right: url_image_right,
    //         circles: this.state.circles
    //     })
    //         .then(function () {
    //             console.log("Document successfully written!");
    //         })
    //         .catch(function (error) {
    //             console.error("Error writing document: ", error);
    //         }).finally(()=>{
    //         this.setState({loading: false});
    //     });
    // }

    // updateLevel(evt) {
    //     this.setState({
    //         level: evt.target.value
    //     });
    // }
    //
    // updateUrlImageLeft(evt) {
    //     this.setState({
    //         url_image_left: evt.target.value
    //     });
    // }
    //
    // updateUrlImageRight(evt) {
    //     this.setState({
    //         url_image_right: evt.target.value
    //     });
    // }

    render() {
        return (
            <div className="container justify-content-around">
                <div>
                    <div className="d-flex flex-wrap justify-content-center align-content-around">

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


                        <div className="card"
                             style={{marginBottom: 20, marginLeft: 20, marginRight: 20, minWidth: this.state.width}}>
                            <div className="card-header">
                                <ul className="nav mb-3" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" data-toggle="pill"
                                           role="tab" aria-selected="true">Draw mask</a>
                                    </li>

                                    <Slider
                                        aria-labelledby="continuous-slider"
                                        value={this.state.value}
                                        onChange={this.handleChangeWidthPen}
                                        min={0}
                                        max={50}
                                        valueLabelDisplay="auto"
                                    />
                                </ul>
                                <div className="d-flex justify-content-between flex-wrap">

                                    <button type="button" onClick={this.handleUndo}
                                            className="btn btn-outline-secondary">Undo
                                    </button>
                                    <button type="button" onClick={this.handleClear}
                                            className="btn btn-outline-secondary">Clear
                                    </button>
                                </div>
                            </div>
                            <div style={{
                                "backgroundImage": "url(" + this.state.photo + ")",
                                "backgroundPosition": "center",
                                "backgroundSize": "cover"
                            }}>
                                <CanvasDraw
                                    lazyRadius={0}
                                    brushRadius={this.state.value}
                                    brushColor="#ffffff"
                                    onChange={this.handleChangeMask}
                                    canvasWidth={this.state.width}
                                    canvasHeight={this.state.height}
                                    immediateLoading={true}
                                    ref={this.canvas}
                                />
                            </div>
                        </div>
                    </div>
                    <br/>

                </div>
                <br/>
                {/*<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>*/}
                {/*<ins className="adsbygoogle"*/}
                {/*     style={{"display": "block"}}*/}
                {/*     data-ad-client="ca-pub-2104622374328156"*/}
                {/*     data-ad-slot="6301733323"*/}
                {/*     data-ad-format="auto"*/}
                {/*     data-full-width-responsive="true"></ins>*/}
                {/*<script>*/}
                {/*    (adsbygoogle = window.adsbygoogle || []).push({});*/}
                {/*</script>*/}

                {/*<CardPreview*/}
                {/*    loading={this.state.loading}*/}
                {/*    photo={this.state.photo}*/}
                {/*    mask={this.state.mask}*/}
                {/*    hideMask={true}*/}
                {/*    result={this.state.result}*/}
                {/*    handleDownload={this.handleDownload}*/}
                {/*    generate={this.generate}*/}
                {/*/>*/}

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
                            <img src={ this.state.photo} hidden={this.state.photo == ""}
                                 className="rounded float-left img-thumbnail img-fluid"
                                 style={{
                                     width: 500,
                                     height: "auto",
                                 }}/>

                            {/*<img src={this.state.mask} hidden={this.state.mask == ""}*/}
                            {/*     className="rounded float-left img-thumbnail img-fluid"*/}
                            {/*     style={{*/}
                            {/*         width: 400,*/}
                            {/*         height: "auto",*/}
                            {/*         backgroundColor: "black",*/}
                            {/*     }}/>*/}

                            <img src={this.state.result} hidden={this.state.result == ""}
                                 className="rounded float-right img-thumbnail img-fluid"
                                 style={{
                                     width: 500,
                                     height: "auto",
                                 }}/>
                            {/*<img src={this.state.photo_gen} hidden={this.state.photo_gen == ""}*/}
                            {/*     className="rounded float-right img-thumbnail img-fluid"*/}
                            {/*     style={{*/}
                            {/*         width: 500,*/}
                            {/*         height: "auto",*/}
                            {/*     }}/>*/}
                            {/*<img src={this.state.result_gen} hidden={this.state.result_gen == ""}*/}
                            {/*     className="rounded float-right img-thumbnail img-fluid"*/}
                            {/*     style={{*/}
                            {/*         width: 500,*/}
                            {/*         height: "auto",*/}
                            {/*     }}/>*/}
                        </div>
                    </div>
                    <div className="card-footer text-muted">
                        <button type="button" className="btn btn-outline-primary"

                                onClick={this.handleDownload}>Download
                        </button>

                        {/*<div className="spinner-grow text-primary" hidden={!this.state.loading} role="status"></div>*/}
                        {/*<button type="button" onClick={this.handlePost} hidden={this.state.loading}*/}
                        {/*        className="btn btn-outline-primary">*/}
                        {/*    Post*/}
                        {/*</button>*/}

                        {/*<input type="text" className="form-control" value={this.state.level}*/}
                        {/*       onChange={this.updateLevel}/>*/}

                    </div>


                </div>

                {/*<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>*/}
                {/*<ins className="adsbygoogle"*/}
                {/*     style={{"display": "block", "textAlign": "center"}}*/}
                {/*     data-ad-layout="in-article"*/}
                {/*     data-ad-format="fluid"*/}
                {/*     data-ad-client="ca-pub-2104622374328156"*/}
                {/*     data-ad-slot="5232194231"></ins>*/}
                {/*<script>*/}
                {/*    (adsbygoogle = window.adsbygoogle || []).push({});*/}
                {/*</script>*/}

            </div>
        );
    }
}

export default Inpainting;