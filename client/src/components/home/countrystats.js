import React, { useEffect, useRef } from 'react';
import '../../assets/scss/CountryStats.scss';
import * as d3 from 'd3';

const CountryStats = (props) => {

    const countryStatsSvg = useRef(null);

    const { countryList } = props;

    const margin = { top: 10, right: 10, bottom: 20, left: 40 };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    useEffect(() => {
        if (countryList && countryStatsSvg.current) {

            const svg = d3.select(countryStatsSvg.current);
            const g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            const x0 = d3.scaleBand()
                .rangeRound([0, width])
                .paddingInner(0.1);

            const x1 = d3.scaleBand()
                .padding(0.05);

            const y = d3.scaleLinear()
                .rangeRound([height, 0]);

            const z = d3.scaleOrdinal()
                .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"]);

            const keys = ['Total Cases', 'Total Deaths', 'New Deaths', 'Total Recovered', 'Active Cases'];
            const data = countryList.map((d) => {
                d['Total Cases'] = parseFloat(d['cases'].replace(/\,/g, '')) || 0;
                d['Total Deaths'] = parseFloat(d['deaths'].replace(/\,/g, '')) || 0;
                d['New Deaths'] = parseFloat(d['todayDeaths'].replace(/\,/g, '')) || 0;
                d['Total Recovered'] = parseFloat(d['recovered'].replace(/\,/g, '')) || 0;
                d['Active Cases'] = parseFloat(d['active'].replace(/\,/g, '')) || 0;
                return d;
            })

            x0.domain(data.map(function (d) { return d.country; }));
            x1.domain(keys).rangeRound([0, x0.bandwidth()]);
            y.domain([0, d3.max(data, function (d) { return d3.max(keys, function (key) { return d[key]; }); })]).nice();

            g.append("g")
                .selectAll("g")
                .data(data)
                .enter().append("g")
                .attr("transform", function (d) { return "translate(" + x0(d.country) + ",0)"; })
                .selectAll("rect")
                .data(function (d) { return keys.map(function (key) { return { key: key, value: d[key] }; }); })
                .enter().append("rect")
                .attr("x", function (d) { console.log('x ', d); return x1(d.key); })
                .attr("y", function (d) { console.log('y ', d); return y(d.value); })
                .attr("width", x1.bandwidth())
                .attr("height", function (d) { return height - y(d.value); })
                .attr("fill", function (d) { return z(d.key); });

            g.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x0));

            g.append("g")
                .attr("class", "axis")
                .call(d3.axisLeft(y).ticks(null, "s"))
                .append("text")
                .attr("x", 2)
                .attr("y", y(y.ticks().pop()) + 0.5)
                .attr("dy", "0.32em")
                .attr("fill", "#000")
                .attr("font-weight", "bold")
                .attr("text-anchor", "start")
                .text("Population");

            const legend = g.append("g")
                .attr("font-family", "sans-serif")
                .attr("font-size", 10)
                .attr("text-anchor", "end")
                .selectAll("g")
                .data(keys.slice().reverse())
                .enter().append("g")
                .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });

            legend.append("rect")
                .attr("x", width - 19)
                .attr("width", 19)
                .attr("height", 19)
                .attr("fill", z);

            legend.append("text")
                .attr("x", width - 24)
                .attr("y", 9.5)
                .attr("dy", "0.32em")
                .text(function (d) { return d; });
        }

    }, [countryStatsSvg.current, countryList]);

    return (
        <div className="position-relative">
            <svg width="960" height="500" ref={countryStatsSvg}></svg>
        </div>
    );
};

export default CountryStats;