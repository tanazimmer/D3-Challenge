// Step 1: Set up our chart
//= ================================
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Load data from data.csv
d3.csv("data.csv").then(function(smokerData) {

    // Format data
    smokerData.forEach(function(data) {
    data.smokes = +data.smokes;
    data.age = +data.age;
  });

  
  // Create Scales
    var xScale = d3.scaleLinear()
    .domain(d3.extent(smokerData, d => d.smokes))
    .range([0, width]);

  var yScale = d3.scaleLinear()
    .domain([0, d3.max(smokerData, d => d.age)])
    .range([height, 0]);

  // //create Axes

    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);

    
  // Append the axes to the chartGroup 
  // Add bottomAxis
  chartGroup.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(bottomAxis);


  // append circles to data points
    var circlesGroup = chartGroup.selectAll("circle")
        .data(smokerData)
        .enter()
        .append("circle")
        .classed("stateCircle", true)
        .attr("cx", d => xScale(d.smokes))
        .attr("cy", d => yScale(d.age))
        .attr("r", 12)
        .attr("opacity", ".5");
  




}).catch(function(error) {
  console.log(error);
});