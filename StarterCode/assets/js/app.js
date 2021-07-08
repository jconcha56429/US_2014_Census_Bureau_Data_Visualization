d3.csv("../StarterCode/assets/data/data.csv").then(function(census_data,err){
    if (err) throw err;
    var svg_width = 1200;
    var svg_height = 600;

    var margin = {
        top:50,
        bottom:50,
        left:20,
        right:20
    }
    
    var states = census_data.map(function(d){
        return d.state
    })
    var income = census_data.map(function(d){
        return d.income
    })
    var healthcare = census_data.map(function(d){
        return +d.healthcare
    })
    var state = census_data.map(function(d){
        return d.state
    })

    var height = svg_height - margin.bottom - margin.top;
    var width = svg_width - margin.left - margin.right;

    var svg = d3.select("#scatter_plot")
        .append("svg")
        .attr("height", svg_height)
        .attr("width", svg_width);
    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .attr("id","test")

    var xscale = d3.scaleLinear()
        .range([0,width])
        .domain([d3.min(income)*0.8,d3.max(income)*1.2])  
    
    var yscale = d3.scaleLinear()
        .range([height,0])
        .domain([0,d3.max(healthcare)+2]);
    
    var bottom_axis = d3.axisBottom(xscale)
    
    var left_axis = d3.axisLeft(yscale)

    chartGroup.append("g")
        .attr("transform",`translate(0,${height})`)
        .call(bottom_axis);
    chartGroup.append("g")
        .call(left_axis);
        
    var circle_group = chartGroup.selectAll("circle")
        .data(census_data)
        .enter()
        .append("g")
        .attr("id","states")
        .append("circle")
        .attr("cx", d => xscale(d.income))
        .attr("cy",d => yscale(d.healthcare))
        .attr("r","20")
        .attr("fill","black")
        .attr("opacity",".5")
        .attr("stroke","blue")
    var test = d3.selectAll("#states")
        .append("text")
        .attr("x",d => xscale(d.income))
        .attr("y",d => yscale(d.healthcare))
        .text(d => d.abbr)
        .attr("dx", function(d){return -10})
        .attr("dy", function(d){return 5})

    });
    
