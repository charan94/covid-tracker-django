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
                <Card.Text>
                    <Row>
                        <Col xs={12} md={6}>
                            <Card.Title>{widgetTitle}</Card.Title>
                        </Col>
                        <Col xs={12} md={6}>
                            <h5>{widgetValue}</h5>
                        </Col>
                    </Row>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Widget;