// Chart params
var svgWidth = 960;
var svgHeight = 500;

var margin ={
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
var file = "https://raw.githubusercontent.com/avangemert/d3/master/assets/data/data.csv"
d3.csv(file).then(successHandle, errorHandle);

function errorHandle(error){
    throw err;
}

function successHandle(healthData){

    // Print the healthData
    console.log(healthData);

    // Parse Data/Cast as floats
    healthData.forEach(function(data){
        data.poverty = parseFloat(data.poverty);
        data.obesity = parseFloat(data.obesity);
    });

    // Create scale functions
    var xLinearScale = d3.scaleLinear()
        .domain([8, d3.max(healthData, d => d.poverty)])
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(healthData, d => d.obesity)])
        .range([height, 0]);

    // Create axis functions
    var bottomAxis = d3. axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append Axes to the chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .call(leftAxis);

    // Create Circles
    var circlesGroup = chartGroup.selectAll("circle")
    .data(healthData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.obesity))
    .attr("r", "15")
    .attr("opacity", ".5")
    .classed("stateCircle", true);

    //Add the SVG Text Element to the svgContainer
    var text = chartGroup.selectAll("text")
    .data(healthData)
    .enter()
    .append("text");

    //Add SVG Text Element Attributes
    var textLabels = text
    .attr("x", d => xLinearScale(d.poverty))
    .attr("y", d => yLinearScale(d.obesity))
    //.text(d => d.id)
    .classed("stateText", true)

    textLabels.text(function(d,i) { return d.id; });

    // Create axes labels
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 2))
        .attr("class", "aText")
        .text("Obesity (%)");

        




    
}