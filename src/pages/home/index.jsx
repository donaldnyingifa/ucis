import React, { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Row, Col } from "react-bootstrap";
import PartnerAgency from "../../components/partner-agency";
import Slider1 from "../../images/slider/nin1.jpeg";
import Slider2 from "../../images/slider/nin2.png";
import Slider3 from "../../images/slider/nin3.png";
import Header from "../../components/header";
import Footer from "../../components/footer";
import "./home.scss";

function Home() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className='home'>
            <Header />
            <Carousel>
                <Carousel.Item>
                    <img className='d-block w-100' src={Slider1} alt='First slide' />
                </Carousel.Item>
                <Carousel.Item>
                    <img className='d-block w-100' src={Slider2} alt='Second slide' />
                </Carousel.Item>
                <Carousel.Item>
                    <img className='d-block w-100' src={Slider3} alt='Third slide' />
                </Carousel.Item>
            </Carousel>
            <Row className="about">
                <Col>
                <div className="mandate">
                <h4>The Mandate</h4>
                    <p>
                        Welcome to the official Web site of the National Identity Management
                        Commission [NIMC]. Established by the NIMC Act No. 23 of 2007, the NIMC has
                        the mandate to establish, own, operate, maintain and manage the National
                        Identity Database in Nigeria, register persons covered by the Act, assign a
                        Unique National Identification Number (NIN) and issue General Multi-Purpose
                        Cards (GMPC) to those.
                    </p>
                </div>
                    
                </Col>

                <Col>
                    <iframe
                        width='560'
                        height='315'
                        src='https://www.youtube.com/embed/XObCtsdMhGc'
                        title='YouTube video player'
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                        allowFullScreen
                    />
                </Col>
            </Row>

            <PartnerAgency />

            <Footer />
        </div>
    );
}

export default Home;
