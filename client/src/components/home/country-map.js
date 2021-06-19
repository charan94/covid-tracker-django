import React, { useEffect, useRef, useState } from 'react';
import '../../assets/scss/country.scss'
import * as d3 from 'd3';
import { feature } from 'topojson';
import Loader from '../shared/loader';

const CountryMap = (props) => {

    const { countryData, loading } = props;
    const countrySvg = useRef(null);
    const [countries, setCountries] = useState(null);
    useEffect(() => {
        if (countries === null) {
            d3.json('https://gist.githubusercontent.com/GordyD/49654901b07cb764c34f/raw/27eff6687f677c984a11f25977adaa4b9332a2a9/countries-and-states.json').then(data => {
                setCountries(feature(data, data.objects.countries));
            })
        }
    }, [countries, setCountries])

    useEffect(() => {
        if (countries && countrySvg.current && countryData) {
            const svg = d3.select(countrySvg.current);
            const projection = d3.geoNaturalEarth1();
            const pathGenerator = d3.geoPath().projection(projection);

            svg.append('path').attr('class', 'sphere').attr('d', pathGenerator({ type: 'Sphere' }));

            const tooltip = d3.select(".country-tooltip");

            svg.selectAll('path').data(countries.features)
                .enter().append('path')
                .attr('class', 'country')
                .attr('d', pathGenerator)
                .attr("fill", "white")
                .attr('id', function (event, d) {
                    return event?.properties?.name.replace(/ /g, '_')
                })
                .on('mouseover', function (event, d) {
                    d3.select(this).attr("class", "country-filled");
                    return tooltip.classed("d-none", false).html(``);
                })
                .on("mousemove", function (event, d) {
                    tooltip.classed("d-none", false)
                        .style("top", (event.pageY - 350) + "px")
                        .style("left", (event.pageX + 10) + "px")
                        .html(`<div class="d-block">
                        <div class="row">
                        <div class="col-12">
                            <h6>Country Name: <b>${d?.properties?.name}</b></h6>
                        </div>
                        </div>
                        <div class="row">
                        <div class="col-12">
                            <h6>Total Cases: <b>${countryData ? countryData.find(data => data.country === d?.properties?.name)?.total_cases || 0 : 0}</b></h6>
                        </div>
                        </div>
                        <div class="row">
                        <div class="col-12">
                            <h6>New Cases: <b>${countryData ? countryData.find(data => data.country === d?.properties?.name)?.new_cases || 0 : 0}</b></h6>
                        </div>
                        </div>
                        <div class="row">
                        <div class="col-12">
                            <h6>Total Deaths: <b>${countryData ? countryData.find(data => data.country === d?.properties?.name)?.total_deaths || 0 : 0}</b></h6>
                        </div>
                        </div>
                        <div class="row">
                        <div class="col-12">
                            <h6>Total Recovered: <b>${countryData ? countryData.find(data => data.country === d?.properties?.name)?.total_recovered || 0 : 0}</b></h6>
                        </div>
                        </div>
                        <div class="row">
                        <div class="col-12">
                            <h6>Active Cases: <b>${countryData ? countryData.find(data => data.country === d?.properties?.name)?.active_cases || 0 : 0}</b></h6>
                        </div>
                        </div>
                        </div>`);
                })
                .on('mouseout', (event, d) => {
                    d3.select('.country-filled').attr("class", "country");
                    tooltip.classed("d-none", true);
                })
        }
    }, [countries, countrySvg.current, countryData])

    const getMap = () => {
        if (loading) {
            return (<Loader loading={loading} />);
        }
        return (
            <div className="position-relative world-map">
                <svg width="960" height="500" ref={countrySvg}></svg>
                <div className="country-tooltip"></div>
            </div>
        )
    }

    return (
        getMap()
    );
}

export default CountryMap;