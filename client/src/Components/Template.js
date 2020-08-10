import Header from "../Components/Header";
import Right from "../Components/Right";
import Footer from "../Components/Footer";
import React from "react";
import Left from "../Components/Left";
import Inpainting from "./Inpainting";
import Style_Transfer from "./Style_Transfer";


class Template extends React.Component {

    render() {
        return (
            <div>
                <div id="header">
                    <Header/>
                </div>
                <div id="body" className="container-fluid">
                    <div className="row">
                        {/*<div id="left" className="col-sm-12 col-md-12 col-lg-3 col-xl-2 col-12">*/}
                        {/*    <Left/>*/}
                        {/*</div>*/}
                        {/*<div id="center" className="col-sm-12 col-md-12 col-lg-9 col-xl-7 col-12">*/}
                        {/*    <Inpainting/>*/}
                        {/*    /!*<Style_Transfer/>*!/*/}
                        {/*</div>*/}
                        {/*<div id="right" className="col-sm-12 col-md-12 col-lg-12 col-xl-3 col-12">*/}
                        {/*    <Right/>*/}
                        {/*</div>*/}

                        <div id="center" className="col-12">
                            <Inpainting/>
                            {/*<Style_Transfer/>*/}
                        </div>
                    </div>
                </div>
                <div id="footer">
                    <Footer/>
                </div>
            </div>
        );
    }
}

export default Template;