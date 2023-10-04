import './Footer.css'
import { FaPhone, FaMobile, FaMapMarker, FaEnvelopeSquare } from 'react-icons/fa'
import styled from 'styled-components'

export const Footer = () => {

    return (
        <>
            <div className="container-fluid">
                <div className="row  row-no-gutters">
                    <div className="col-xs-12 col-sm-6 col-md-3" >
                        <ul>
                            <li className="col-heading">Subheading</li>
                            <li>
                                <Phone /> <a href="tel:99-999-999-9999">99-999-999-9999</a>
                            </li>
                            <li>
                                <Mobile /> <a href="sms:99-999-999-9999">SMS Message</a>
                            </li>
                            <li>
                                <Map /> <a href="#">Address</a>
                            </li>
                            <li>
                                <Envelope /> <a href="mailto:someone@yoursite.com?subject=Email Subject line">Email Us</a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-xs-12 col-sm-6 col-md-3" >
                        <ul>
                            <li className="col-heading">Subheading</li>
                            <li><a href="#">Link to page</a></li>
                            <li><a href="#">Link to page</a></li>
                            <li><a href="#">Link to page</a></li>
                            <li><a href="#">Link to page</a></li>
                        </ul>
                    </div>

                    <div className="col-xs-12 col-sm-6 col-md-3" >
                        <ul>
                            <li className="col-heading">Subheading</li>
                            <li><a href="#">Link to page</a></li>
                            <li><a href="#">Link to page</a></li>
                            <li><a href="#">Link to page</a></li>
                            <li><a href="#">Link to page</a></li>
                        </ul>
                    </div>

                    <div className="col-xs-12 col-sm-6 col-md-3" >
                        <ul>
                            <li className="col-heading">Subheading</li>
                            <li><a href="#">Link to page</a></li>
                            <li><a href="#">Link to page</a></li>
                            <li><a href="#">Link to page</a></li>
                            <li><a href="#">Link to page</a></li>
                        </ul>
                    </div>
                </div>

                <div className="row row-no-gutters" id="bottom-footer" >

                    <div className="col-xs-12 col-md-5 text-center" >
                        <ul className="vertical-links small">
                            <li><a href="#">Privacy</a></li>
                            <li><a href="#">Terms & Conditions</a></li>
                            <li><a href="#">Site Map</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                    </div>
                    <div className="col-xs-12 col-md-2 text-center" >
                        <p><i className="fa fa-heart-o" aria-hidden="true"></i></p>
                    </div>
                    <div className="col-xs-12 col-md-5 text-center" >
                        <ul>
                            <li className="small">© Copyright 2019 Website by <a href="#">Code Crafters</a>. All Rights reserved.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

const Phone = styled(FaPhone)`
color: #304f50;
margin-right: 10px;
font-size: 18px;
width: 2.25rem;
`;

const Mobile = styled(FaMobile)`
color: #304f50;
margin-right: 10px;
font-size: 18px;
width: 2.25rem;
`;

const Map = styled(FaMapMarker)`
color: #304f50;
margin-right: 10px;
font-size: 18px;
width: 2.25rem;
`;

const Envelope = styled(FaEnvelopeSquare)`
color: #304f50;
margin-right: 10px;
font-size: 18px;
width: 2.25rem;
`;