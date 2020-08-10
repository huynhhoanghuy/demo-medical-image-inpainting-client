import React from "react";
import InputFile from "./InputFile";
class CardInputFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
    }
    render() {
        return <div className="card"
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
                        <InputFile onChange={this.state.handleChangeImage}/>
                    </div>
                </div>
            </div>
        </div>
    }
}
export default CardInputFile;