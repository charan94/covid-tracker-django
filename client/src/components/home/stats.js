import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Loader from '../shared/loader';
import Widget from '../shared/widget';

const CoronaStats = (props) => {
    const { loading, generalStats } = props;

    const getGeneralStats = () => {
        if (loading) {
            return <Loader loading={loading} />
        }
        return (
            <Row>
                <Col xs={6} md={3}>
                    <Widget
                        widgetClass=""
                        widgetHeader=""
                        widgetTitle="Total Cases"
                        widgetValue={generalStats?.total_cases || 0}
                    />
                </Col>
                <Col xs={6} md={3}>
                    <Widget
                        widgetClass=""
                        widgetHeader=""
                        widgetTitle="Recovered"
                        widgetValue={generalStats?.recovery_cases || 0}
                    />
                </Col>
                <Col xs={6} md={3}>
                    <Widget
                        widgetClass=""
                        widgetHeader=""
                        widgetTitle="Deaths"
                        widgetValue={generalStats?.death_cases || 0}
                    />
                </Col>
            </Row>
        );
    }

    return (
        <div className="my-4">
            <Row>
                <Col xs={12}>
                    <h4>Corona Stats</h4>
                </Col>
            </Row>
            {getGeneralStats()}
        </div>
    )
}

export default CoronaStats;