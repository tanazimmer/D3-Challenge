# D3 Homework - Data Journalism and D3
## Javascript, D3, HTML, CSS

![Newsroom](https://media.giphy.com/media/v2xIous7mnEYg/giphy.gif)

* The data set included with the assignment is based on 2014 ACS 1-year estimates from the [US Census Bureau](https://data.census.gov/cedsci/). The current data set includes data on rates of income, obesity, poverty, etc. by state. MOE stands for "margin of error."

* You need to create a scatter plot between two of the data variables such as `Healthcare vs. Poverty` or `Smokers vs. Age`.

* Using the D3 techniques we taught you in class, create a scatter plot that represents each state with circle elements. You'll code this graphic in the `app.js` file of your homework directory—make sure you pull in the data from `data.csv` by using the `d3.csv` function. Your scatter plot should ultimately appear like the image at the top of this section.
```
// Load data from data.csv
d3.csv("data.csv").then(function(smokerData) {

    // Format data
    smokerData.forEach(function(data) {
    data.smokes = +data.smokes;
    data.age = +data.age;
  });

```

* Include state abbreviations in the circles.
```
    //append text to circles
    var textGroup = chartGroup.selectAll(".stateText")
    .data(smokerData)
    .enter()
    .append("text")
    .classed("stateText", true)
    .attr("x", d => xScale(d.smokes))
    .attr("y", d => yScale(d.age))
    .attr("dy", 3)
    .attr("font-size", "10px")
    .text(function(d) {return d.abbr});
```
* Create and situate your axes and labels to the left and bottom of the chart.
```
// //create Axes

    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);


    //append x axis
    var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    //append y axis
    var yAxis = chartGroup.append("g")
        .classed("y-axis", true)
        .call(leftAxis);
```
```
  // text label for the y axis
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 20)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      //.style("text-anchor", "middle")
      .text("Age");      

  // text label for the x axis
  svg.append("text")             
  .attr("transform","translate(" + (width/2) + " ," + (height + margin.top + 40) + ")")
  .style("text-anchor", "middle")
  .text("Smokes (%)");
```

* Note: You'll need to use `python -m http.server` to run the visualization. This will host the page at `localhost:8000` in your web browser.
