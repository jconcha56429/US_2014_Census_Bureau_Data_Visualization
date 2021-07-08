
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
    
    // var states = census_data.map(function(d){
    //     return d.state
    // })
    // var income = census_data.map(function(d){
    //     return d.income
    // })
    // var healthcare = census_data.map(function(d){
    //     return +d.healthcare
    // })
    // var state = census_data.map(function(d){
    //     return d.state
    // })


    census_data.forEach(function(data){
        data.income = +data.income;
        data.healthcare = +data.healthcare
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

    var chosen_x = "income"
    var chosen_y = "healthcare"

    var x_scale = d3.scaleLinear()
        .range([0,width])
        .domain([d3.min(census_data,d => d[chosen_x]*0.8),d3.max(census_data,d => d[chosen_x])*1.2])
    var y_scale = d3.scaleLinear()
        .range([height,0])
        .domain([d3.min(census_data,d => d[chosen_y]*.7),d3.max(census_data,d => d[chosen_y])*1.2])

    // var y_scale = d3.scaleLinear()
    //     .range([height,0])
    //     .domain([d3.min(census_data[chosen_y]),d3.max(census_data[chosen_y])])
 
    // var yLinearScale = d3.scaleLinear()
  //   .domain([0, d3.max(hairData, d => d.num_hits)])
  //   .range([height, 0]);

    var bottom_axis = d3.axisBottom(x_scale)
    // var left_axis = d3.axixLeft(y_scale)
    

    // var xscale = d3.scaleLinear()
    //     .range([0,width])
    //     .domain([d3.min(income)*0.8,d3.max(income)*1.2])  
    chartGroup.append("g")
        .attr("transform",`translate(0,${height})`)
        .call(bottom_axis);

    // var yscale = d3.scaleLinear()
    //     .range([height,0])
    //     .domain([0,d3.max(healthcare)+2]);
    
    // var bottom_axis = d3.axisBottom(xscale)
    
    var left_axis = d3.axisLeft(y_scale)

    // chartGroup.append("g")
    //     .attr("transform",`translate(0,${height})`)
    //     .call(bottom_axis);
    chartGroup.append("g")
        .call(left_axis);
    
    var circle_group = chartGroup.selectAll("circle")
        .data(census_data)
        .enter()
        .append("g")
        .attr("id","states")
        .append("circle")
        .attr("cx", d => x_scale(d.income))
        .attr("cy",d => y_scale(d.healthcare))
        .attr("r","20")
        .attr("fill","steelblue")
        .attr("opacity",".5")
        .attr("stroke","steelblue")

    // var circle_group = chartGroup.selectAll("circle")
    //     .data(census_data)
    //     .enter()
    //     .append("g")
    //     .attr("id","states")
    //     .append("circle")
    //     .attr("cx", d => xscale(d.income))
    //     .attr("cy",d => yscale(d.healthcare))
    //     .attr("r","20")
    //     .attr("fill","steelblue")
    //     .attr("opacity",".5")
    //     .attr("stroke","steelblue")
    var test = d3.selectAll("#states")
        .append("text")
        .attr("x",d => x_scale(d.income))
        .attr("y",d => y_scale(d.healthcare))
        .text(d => d.abbr)
        .style("fill","white")
        .attr("dx", function(d){return -10})
        .attr("dy", function(d){return 5})
    });
    
