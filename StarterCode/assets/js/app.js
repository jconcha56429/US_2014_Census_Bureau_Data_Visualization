
var svg_width = 1200;
var svg_height = 600;

var margin = {
    top:80,
    bottom:80,
    left:80,
    right:80
}

var height = svg_height - margin.bottom - margin.top;
var width = svg_width - margin.left - margin.right;

var chosen_x = "income"
var chosen_y = "healthcare"

function build_x_scale(census_data,chosen_x){
    var x_scale = d3.scaleLinear()
        .range([0,width])
        .domain([d3.min(census_data,d => d[chosen_x]*0.9),d3.max(census_data,d => d[chosen_x])*1.1])
    return x_scale
}

function build_y_scale(census_data,chosen_y){
    var y_scale = d3.scaleLinear()
        .range([height,0])
        .domain([d3.min(census_data,d => d[chosen_y]*.7),d3.max(census_data,d => d[chosen_y])*1.2])
    return y_scale
}

var x_labels = ["income","obesity","age"]
var y_labels = ["healthcare","poverty","smokes"]

d3.csv("../StarterCode/assets/data/data.csv").then(function(census_data,err){
    if (err) throw err;
    census_data.forEach(function(data){
        data.income = +data.income;
        data.healthcare = +data.healthcare
    })
    

    var svg = d3.select("#scatter_plot")
        .append("svg")
        .attr("height", svg_height)
        .attr("width", svg_width);

    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .attr("id","test");

    var xScale = build_x_scale(census_data,chosen_x)
    var xAxis = d3.axisBottom(xScale)

    chartGroup.append("g")
        .attr("transform",`translate(0,${height})`)
        .call(xAxis)
        .attr("id","x_axis")

    var yScale = build_y_scale(census_data,chosen_y)
    var yAxis = d3.axisLeft(yScale)
    chartGroup.append("g")
        .call(yAxis)

    x_labels.forEach(function(label,i){
        chartGroup.append("text")
        .attr("x",width/2.2)
        .attr("y",height + margin.top - i*15)
        .attr("id", "x_label")
        .text(`${label} (%)`)
        .attr("value",`${label}`)
    })

    y_labels.forEach(function(label,i){
        chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 40 - margin.left - 15*i)
            .attr("x", 10 - (height / 2))
            .attr("dy", "1em")
            .classed("axis-text", true)
            .text(`${label} (%)`)
            .attr("value",`${label}`)
            .attr("id","test_bunny")
    })
    var circle_group = chartGroup.selectAll("circle")
        .data(census_data)
        .enter()
        .append("g")
        .attr("id","states")
        .append("circle")
        .attr("cx", d => xScale(d[chosen_x]))
        .attr("cy",d => yScale(d[chosen_y]))
        .attr("r","20")
        .attr("fill","steelblue")
        .attr("opacity",".5")
        .attr("stroke","steelblue")
        .attr("id","states")
 
    d3.selectAll("#states")
        .append("text")
        .attr("x",d => xScale(d.income))
        .attr("y",d => yScale(d.healthcare))
        .text(d => d.abbr)
        .style("fill","white")
        .attr("dx", function(d){return -10})
        .attr("dy", function(d){return 5})



// rough draft creating text labels
    // var labels = chartGroup.append("text")
    //     .attr("x", width/2.2)
    //     .attr("y", height + margin.top)
    //     .attr("value", "obesity") // value to grab for event listener// is this d.num_albums? ## 
    //     .attr("id","obesity")
    //     .text("Obesity");
// rough draft making text clickable 
    // d3.select("#obesity")
    //     .on("click",function(){
    //         var value = d3.select(this).attr("value")
    //         chosen_x = value
    //         var test_bunny1 = build_x_scale(census_data,chosen_x)
    //         var test_bunny2 = d3.axisBottom(test_bunny1)
    //         d3.select("#x_axis").transition().call(test_bunny2)
    //     })




    // var x_scale = d3.scaleLinear()
        // .range([0,width])
        // .domain([d3.min(census_data,d => d[chosen_x]*0.9),d3.max(census_data,d => d[chosen_x])*1.1])
    // var y_scale = d3.scaleLinear()
        // .range([height,0])
        // .domain([d3.min(census_data,d => d[chosen_y]*.7),d3.max(census_data,d => d[chosen_y])*1.2])

    // var bottom_axis = d3.axisBottom(x_scale)
    

    // var x_axis = chartGroup.append("g")
    //     .attr("transform",`translate(0,${height})`)
    //     .call(bottom_axis);
    
    // var left_axis = d3.axisLeft(y_scale)


    // chartGroup.append("g")
    //     .call(left_axis);
    
    // var circle_group = chartGroup.selectAll("circle")
    //     .data(census_data)
    //     .enter()
    //     .append("g")
    //     .attr("id","states")
    //     .append("circle")
    //     .attr("cx", d => x_scale(d.income))
    //     .attr("cy",d => y_scale(d.healthcare))
    //     .attr("r","20")
    //     .attr("fill","steelblue")
    //     .attr("opacity",".5")
    //     .attr("stroke","steelblue")


    // var labels = d3.selectAll("#states")
        // .append("text")
        // .attr("x",d => x_scale(d.income))
        // .attr("y",d => y_scale(d.healthcare))
        // .text(d => d.abbr)
        // .style("fill","white")
        // .attr("dx", function(d){return -10})
        // .attr("dy", function(d){return 5})

    // chartGroup.append("text")
    //     .attr("transform", "rotate(-90)")
    //     .attr("y", 0 - margin.left)
    //     .attr("x", 0 - (height / 2))
    //     .attr("dy", "1em")
    //     .classed("axis-text", true)
    //     .text("Healthcare")
    //     .attr("value","healthcare");
    // chartGroup.append("text")
        // .attr("transform", "rotate(-90)")
        // .attr("y", 15 - margin.left)
        // .attr("x", 0 - (height / 2))
        // .attr("dy", "1em")
        // .classed("axis-text", true)
        // .text("Poverty(%)")
        // .attr("value","poverty")
        // .attr("id","test_bunny")

    // d3.select("#test_bunny")
    //     .on("click", function(){
    //         var value = d3.select(this).attr("value")
    //         chosen_x = value
    //         console.log(chosen_x)
    //     })
    });
    
