import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CoronaStats = (props) => {

    return (
        <Row>
            <Col xs={12}>
                <h4>Corona Stats</h4>
            </Col>
            <Col xs={6} md={3}>
                <Widget
                    widgetClass=""
                    widgetHeader=""
                    widgetTitle="Total Cases"
                    widgetValue="1,2131,121,12"
                />
            </Col>
        </Row>
    )
}

export default CoronaStats;