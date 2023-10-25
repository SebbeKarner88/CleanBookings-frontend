import '../styles/Footer.css'
import { FaPhone, FaMobile, FaMapMarker, FaEnvelopeSquare } from 'react-icons/fa'
import styled from 'styled-components'
import PrivacyModal from '../components/modals/PrivacyModal';
import TermsConditionsModal from '../components/modals/TermsConditionsModal';
import {useState} from "react";
import { Link } from 'react-router-dom';

export const Footer = () => {
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);
    const [showTermsConditionsModal, setShowTermsConditionsModal] = useState(false);

    return (
        <>
            <footer>
            <div className="container-fluid">
                <div className="row  row-no-gutters">
                    <div className="col-xs-12 col-sm-6 col-md-3">
                        <ul>
                            <li className="col-heading">Kontakt</li>
                            <li className="text-start"><Phone /> 555-CLEAN-ME-NOW</li>
                            <li className="text-start"><Mobile /> 070-CLEAN-ME-NOW</li>
                            <li className="text-start"><Map /> <a href="https://maps.app.goo.gl/HzU8kv5sVTQKF5cVA">Stockholm HQ</a></li>
                            <li className="text-start"><Envelope /> <a
                                href="mailto:bokning@Cleanbookings.com?subject=Mail Hemsida">booking@cleanbookings.com</a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-xs-12 col-sm-6 col-md-3">
                        <ul id='icons'>
                            <li className="col-heading">Var vi finns</li>
                            <li><a href="https://maps.app.goo.gl/5xnZx6c4h5FFELxp8">Stockholm</a></li>
                            <li><a href="https://maps.app.goo.gl/utfxFDWKkYnBKqZd6">Göteborg</a></li>
                            <li><a href="https://maps.app.goo.gl/8WkGFAZcsBSGxkkC8">Falun</a></li>
                            <li><a href="https://maps.app.goo.gl/X6cDbbsASAosLqrH6">Mesa, AZ</a></li>
                        </ul>
                    </div>

                    <div className="col-xs-12 col-sm-6 col-md-3">
                        <ul>
                            <li className="col-heading">Om oss</li>
                            <li><a href="/AboutUs#our-products">Städafint's rengöringsprodukter</a></li>
                            <li><a href="/tips&inspiration">Tips & inspiration</a></li>
                            <li><a href="/sustainability">Hållbarhet</a></li>
                            <li><a href="/AboutUs">Vår historia</a></li>
                        </ul>
                    </div>

                    <div className="col-xs-12 col-sm-6 col-md-3">
                        <ul>
                            <li className="col-heading">Information</li>
                            <li><a href="/GDPR">GDPR</a></li>
                            <li><a href="/aboutRUT">Om RUT</a></li>
                            <li><a href="/FAQ">FAQ</a></li>
                            <li><a href="/sitemap">Sitemap</a></li>
                        </ul>
                    </div>
                </div>

                <div className="row row-no-gutters" id="bottom-footer">

                    <div className="col-xs-12 col-md-5 text-center">
                        <ul className="vertical-links small">
                            <li>
                                <a href="#" onClick={(e) => {
                                    e.preventDefault();
                                    setShowPrivacyModal(true);
                                }}>
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={(e) => {
                                    e.preventDefault();
                                    setShowTermsConditionsModal(true);
                                }}>
                                    Terms & Conditions
                                </a>
                            </li>
                            {/*<li><a href="terms&conditions">Terms & Conditions</a></li>*/}
                            <li><Link to="/AboutUs#contact-us">Kontakta oss</Link></li>
                        </ul>
                    </div>
                    <div className="col-xs-12 col-md-2 text-center">
                        <p><i className="fa fa-heart-o" aria-hidden="true"></i></p>
                    </div>
                    <div className="col-xs-12 col-md-5 text-center">
                        <ul>
                            <li className="small">© Copyright 2023 Website by CodeCrafters. All Rights reserved.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            </footer>
            <PrivacyModal
                onShow={showPrivacyModal}
                onClose={() => setShowPrivacyModal(false)}
            />
            <TermsConditionsModal
                onShow={showTermsConditionsModal}
                onClose={() => setShowTermsConditionsModal(false)}
            />
        </>
    )
}

const Phone = styled(FaPhone)`
  color: var(--dark-purple);
  margin-right: 10px;
  font-size: 18px;
  width: 2.25rem;
`;

const Mobile = styled(FaMobile)`
  color: var(--dark-purple);
  margin-right: 10px;
  font-size: 18px;
  width: 2.25rem;
`;

const Map = styled(FaMapMarker)`
  color: var(--dark-purple);
  margin-right: 10px;
  font-size: 18px;
  width: 2.25rem;
`;

const Envelope = styled(FaEnvelopeSquare)`
  color: var(--dark-purple);
  margin-right: 10px;
  font-size: 18px;
  width: 2.25rem;
`;