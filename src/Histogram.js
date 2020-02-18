import React, {useEffect} from 'react';
import * as d3 from "d3";
// import {graph_nbd} from './nbd'


const Histogram = (props) => {
    useEffect(()=>{
        draw(props);
    }, [props.actual ? props.actual.length : 0])
    return <div className="histogram"/>
}

const draw = (props) => {
    // if (!props.actual) return;
    let actual = props.actual;
    let expected = props.expected;
    let bins = []
    for (var i = 1; i < actual.length; i++) {
        // let bin_actual = [actual[i] ? actual[i] : 0];
        let bin_actual = {};
        bin_actual.val = actual[i] ? actual[i] : 0;
        bin_actual.x0 = i;
        bin_actual.x1 = i+1;
        bin_actual.type = 'actual'
        
        let bin_expected = {};
        bin_expected.val = expected[i] ? expected[i] : 0;
        bin_expected.x0 = i;
        bin_expected.x1 = i+1;
        bin_expected.type = 'expected'

        bins.push(bin_actual)
        bins.push(bin_expected)
    }

    // let data = props.data;
    // let data = props.data;
    let r = props.r;
    let alpha = props.alpha;
    let t = props.t;
    let word_count = props.word_count;

    
    d3.select('.histogram > *').remove(); // remove previous hist

    // let x_range = 20;
    // let num_bins = actual.length;

    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select(".histogram")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // X axis: scale and draw:
    var x = d3.scaleLinear()
        .domain([1, 20])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
        .range([0, width]);
        
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Y axis: scale and draw:
    var y = d3.scaleLinear()
        .range([height, 0]);
    y.domain([0, d3.max(bins, function(d) { return d.val; })]);   // d3.hist has to be called before the Y axis obviously
    svg.append("g")
        .call(d3.axisLeft(y));

    // append the bar rectangles to the svg element
    svg.selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
            .attr("x", 1)
            .attr("transform", function(d) { 
                if (d.type == 'actual') {
                    return "translate(" + x(d.x0) + "," + y(d.val) + ")"; 
                } else {
                    return "translate(" + (x(d.x0) + (x(d.x1) - x(d.x0) - 1)*0.5) + "," + y(d.val) +  ")";
                }
            })
            .attr("width", function(d) { return (x(d.x1) - x(d.x0) - 1) * 0.5 ; })
            .attr("height", function(d) { return height - y(d.val); })
            .style("fill", function(d) {
                if (d.type == 'actual') {
                    return "#69b3a2";
                } else {
                    return "#404080";
                }
            } )

    // Handmade legend
    svg.append("circle").attr("cx",200).attr("cy",130).attr("r", 6).style("fill", "#69b3a2")
    svg.append("circle").attr("cx",200).attr("cy",160).attr("r", 6).style("fill", "#404080")
    svg.append("text").attr("x", 220).attr("y", 130).text("Actual").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 220).attr("y", 160).text("Expected").style("font-size", "15px").attr("alignment-baseline","middle")

            // //Legend
            // legend = svg.append("g")
            //     .attr("class","legend")
            //     .attr("transform","translate(50,30)")
            //     .style("font-size","12px")
            //     .call(d3.legend)
    // var legend = svg.selectAll(".legend")
    //     .data(bins[0].values.map(function(d) { return d.type; }).reverse())
    //     .enter().append("g")
    //     .attr("class", "legend")
    //     .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; })
    //     .style("opacity","0");

    // legend.append("rect")
    //     .attr("x", width - 18)
    //     .attr("width", 18)
    //     .attr("height", 18)
    //     .style("fill", function(d) { return '#000000'; });
    //     // .style("fill", function(d) { return color(d); });

    // legend.append("text")
    //     .attr("x", width - 24)
    //     .attr("y", 9)
    //     .attr("dy", ".35em")
    //     .style("text-anchor", "end")
    //     .text(function(d) {return d; });
    // graph the function
    // var continuous = graph_nbd(r, alpha, t, word_count);

    // svg.append("svg:path")
    //     .attr("d", function(d) { return d3.line() (
    //     x.ticks(100).map(function(xi) {
    //         return [ x(xi+0.5), y(continuous(xi)) ]
    //     }))})
    //     .style("stroke", "red")    // set the line colour
    //     .style("fill", "none");    // set the fill colour 
}

  export default Histogram;