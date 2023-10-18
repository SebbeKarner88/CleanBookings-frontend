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
                            <li className="col-heading">Contact</li>
                            <li><Phone /> <a href="tel:0707000000">555-CLEAN-ME-NOW</a></li>
                            <li><Mobile /> <a href="sms:0707000000">070-CLEAN-ME-NOW</a></li>
                            <li><Map /> <a href="https://maps.app.goo.gl/HzU8kv5sVTQKF5cVA">Stockholm HQ</a></li>
                            <li><Envelope /> <a href="mailto:bokning@Cleanbookings.com?subject=Mail Hemsida">booking@cleanbookings.com</a></li>
                        </ul>
                    </div>

                    <div className="col-xs-12 col-sm-6 col-md-3" >
                        <ul>
                            <li className="col-heading">Locations</li>
                            <li><a href="https://maps.app.goo.gl/5xnZx6c4h5FFELxp8">Stockholm</a></li>
                            <li><a href="https://maps.app.goo.gl/utfxFDWKkYnBKqZd6">Göteborg</a></li>
                            <li><a href="https://maps.app.goo.gl/8WkGFAZcsBSGxkkC8">Falun</a></li>
                            <li><a href="https://maps.app.goo.gl/X6cDbbsASAosLqrH6">Mesa, AZ</a></li>
                        </ul>
                    </div>

                    <div className="col-xs-12 col-sm-6 col-md-3" >
                        <ul>
                            <li className="col-heading">Our Work</li>
                            <li><a href="#">Städafint's cleaning products</a></li>
                            <li><a href="#">Tips & Inspiration</a></li>
                            <li><a href="#">Sustainability</a></li>
                            <li><a href="#">Our Story</a></li>
                        </ul>
                    </div>

                    <div className="col-xs-12 col-sm-6 col-md-3" >
                        <ul>
                            <li className="col-heading">Information</li>
                            <li><a href="#">GDPR</a></li>
                            <li><a href="#">About RUT</a></li>
                            <li><a href="#">FAQ</a></li>
                            <li><a href="#">Sitemap</a></li>
                        </ul>
                    </div>
                </div>

                <div className="row row-no-gutters" id="bottom-footer" >

                    <div className="col-xs-12 col-md-5 text-center" >
                        <ul className="vertical-links small">
                            <li><a href="#">Privacy</a></li>
                            <li><a href="#">Terms & Conditions</a></li>
                            <li><a href="#">Contact Us</a></li>
                            <li><a href="#">Homepage design</a></li>
                        </ul>
                    </div>
                    <div className="col-xs-12 col-md-2 text-center" >
                        <p><i className="fa fa-heart-o" aria-hidden="true"></i></p>
                    </div>
                    <div className="col-xs-12 col-md-5 text-center" >
                        <ul>
                            <li className="small">© Copyright 2023 Website by <a href="#">CodeCrafters</a>. All Rights reserved.</li>
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