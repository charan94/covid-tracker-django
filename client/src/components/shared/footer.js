import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Footer = () => {

    return (
        <footer className="covid-footer bg-white mb-0">
            <Row>
                <Col xs={12} className="text-center pt-3">
                    <h6>Made with React and Django... See project on <a href="https://github.com/charan94/covid-tracker-django" className="text-secondary"><i className="fab fa-github"></i></a></h6>
                </Col>
            </Row>
        </footer>
    )
}

export default Footer;