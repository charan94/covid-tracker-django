import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Widget = (props) => {
    const { widgetClass, widgetHeader, widgetTitle, widgetValue } = props;
    return (
        <Card className={`${widgetClass ? widgetClass : ''}`}>
            <Card.Header>{widgetHeader}</Card.Header>
            <Card.Body>
                <Row>
                    <Col xs={12} md={6}>
                        <h6>{widgetTitle}</h6>
                    </Col>
                    <Col xs={12} md={6}>
                        <h6>{widgetValue}</h6>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default Widget;