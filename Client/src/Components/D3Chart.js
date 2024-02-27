// src/components/BarChart.js
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const D3Chart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Clear existing svg content
    svg.selectAll('*').remove();

    const width = 200;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    const x = d3
      .scaleBand()
      .domain(data.map(d => d.label))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const xAxis = g =>
      g.attr('transform', `translate(0,${height - margin.bottom})`).call(
        d3.axisBottom(x)
          .tickSizeOuter(0)
      );

    const yAxis = g =>
      g.attr('transform', `translate(${margin.left},0)`).call(
        d3.axisLeft(y)
          .ticks(5)
          .tickSizeOuter(0)
      );

    svg.append('g').call(xAxis);

    svg.append('g').call(yAxis);

    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    //   const colorScale = d3.scaleOrdinal().range(['yellow', 'blue', 'red']);
    svg
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.label))
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
    //   .attr('fill', (_, i) => colorScale(i))
      .attr('height', d => y(0) - y(d.value))
      .attr('fill', (_, i) => d3.interpolateSpectral(i / data.length))
      .on('mouseover', function (event, d) {
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip
          .html(d.label)
          .style('left', `${event.pageX}px`)
          .style('top', `${event.pageY - 28}px`);
      })
      .on('mouseout', function (event, d) {
        tooltip.transition().duration(500).style('opacity', 0);
      });

  }, [data]);

  return (
    <svg ref={svgRef} width="600" height="400">
      {/* SVG content will be rendered here */}
    </svg>
  );
};

const AreaPlotChart = ({ defaultClicks }) => {
    const svgRef = useRef();
    const [data, setData] = useState([]);
  
    useEffect(() => {
      // Generate random data or use default clicks
      const initialData = defaultClicks
        ? Array.from({ length: defaultClicks }, (_, i) => ({ x: i, y: Math.random() * 100 }))
        : [];
  
      setData(initialData);
    }, [defaultClicks]);
  
    useEffect(() => {
      // D3 code to draw the area plot chart
      const margin = { top: 20, right: 800, bottom: 50, left: 20 }; // Decrease left margin
      const width = 600;
      const height = 350;
  
      const svg = d3.select(svgRef.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
  
      const x = d3.scaleLinear()
        .domain([0, data.length - 1])
        .range([0, width]);
  
      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.y)])
        .nice()
        .range([height, 0]);
  
      const area = d3.area()
        .x((d, i) => x(i))
        .y0(y(0))
        .y1(d => y(d.y))
        .curve(d3.curveNatural);
  
      svg.append("path")
        .datum(data)
        .attr("fill", "LightCyan")
        .attr("d", area);
  
      // Axes
      svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));
  
      svg.append("g")
        .call(d3.axisLeft(y));
  
    }, [data]);
  
    return <svg ref={svgRef}></svg>;
  };

export { D3Chart, AreaPlotChart };
