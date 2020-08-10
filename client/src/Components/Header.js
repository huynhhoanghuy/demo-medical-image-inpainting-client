import React from 'react';
import '../App.css'

class Header extends React.Component {
    render() {
        return (
            <div className="container-fluid header">
                <div className="row">
                    {/*<div className="col-sm-1 col-md-1 col-lg-1 col-xl-1">*/}

                    {/*</div>*/}
                    <div className="col-sm-3 col-md-3 col-lg-3 col-xl-3 col-5" style={{ margin: "auto 0 auto 0"}}>
                        <a>
                            <img src="/logo192.png" className="image" alt={""}/>
                        </a>
                        AI Image
                    </div>

                    <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6 col-6">
                        <nav className="navbar navbar-expand navbar-light">

                            {/*<div className="collapse navbar-collapse">*/}
                            {/*    <ul className="navbar-nav mr-auto">*/}

                            {/*        <li className="nav-item dropdown">*/}
                            {/*            <a className="nav-link dropdown-toggle"*/}
                            {/*               role="button" data-toggle="dropdown">*/}
                            {/*                Image*/}
                            {/*            </a>*/}
                            {/*            <div className="dropdown-menu" style={{background: "rgba(0, 0, 0, .10)"}}>*/}
                            {/*                <a className="dropdown-item">Image Inpainting</a>*/}
                            {/*                <a className="dropdown-item">Style Image</a>*/}
                            {/*            </div>*/}
                            {/*        </li>*/}

                            {/*       /!* <li className="nav-item dropdown">*/}
                            {/*            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown"*/}
                            {/*               role="button" data-toggle="dropdown" aria-haspopup="true"*/}
                            {/*               aria-expanded="false">*/}
                            {/*                Video*/}
                            {/*            </a>*/}
                            {/*            <div className="dropdown-menu" aria-labelledby="navbarDropdown">*/}
                            {/*                <a className="dropdown-item" href="#">Video Inpainting</a>*/}
                            {/*                <a className="dropdown-item" href="#">Another action</a>*/}
                            {/*                <div className="dropdown-divider"></div>*/}
                            {/*                <a className="dropdown-item" href="#">Something else here</a>*/}
                            {/*            </div>*/}
                            {/*        </li>*!/*/}

                            {/*    </ul>*/}
                            {/*</div>*/}
                        </nav>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;