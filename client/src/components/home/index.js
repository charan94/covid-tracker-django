import React, { useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useDispatch, useSelector } from "react-redux";
import { loadCountryStatsAction, loadGeneralStatsAction } from '../../actions/home.actions';
import { getHomeState } from '../../reducer/home.reducer';
import CountryMap from './country-map';
import GeneralStats from './stats';

const Home = () => {

    const state = useSelector(getHomeState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadGeneralStatsAction());
        dispatch(loadCountryStatsAction());
    }, []);

    return (
        <Container fluid className="my-2">
            <GeneralStats loading={state.generalSectionLoading} generalStats={state.generalStats} />
            <div className="my-2">
                <Row>
                    <Col xs={12}>
                        <h4>World Map</h4>
                    </Col>
                    <Col xs={12} className="text-center">
                        <CountryMap countryData={state.countryListData} loading={state.countryDataLoading} />
                    </Col>
                </Row>
            </div>
        </Container>
    );
}

export default Home;