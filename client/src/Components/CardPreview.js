import React from "react";

class CardPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
    }
    render() {
        return <div className="card text-center">
            <div className="card-header">
                <div>Export Image</div>
                <br/>
                <div className="d-flex justify-content-center">

                    <div className="spinner-grow text-primary" hidden={!this.state.loading} role="status"></div>
                    <button type="button" onClick={this.state.generate} hidden={this.state.loading}
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

                    <img src={this.state.mask} hidden={this.state.hideMask}
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
                        onClick={this.state.handleDownload}>Download
                </button>
            </div>
        </div>
    }
}
export default CardPreview;