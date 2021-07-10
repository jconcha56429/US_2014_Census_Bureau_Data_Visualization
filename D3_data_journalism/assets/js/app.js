
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

d3.csv("data.csv").then(function(census_data,err){
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
    
    var y_axis = chartGroup.append("g")
        .call(yAxis)
        .attr("id","y_axis")

    x_labels.forEach(function(label,i){
        chartGroup.append("text")
        .attr("x",width/2.2)
        .attr("y",height + margin.top - i*15)
        .attr("id", "x_label")
        .text(`${label}`)
        .attr("value",`${label}`)
        .attr("id","x")
    })

    y_labels.forEach(function(label,i){
        chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 40 - margin.left - 16*i)
            .attr("x", 10 - (height / 2))
            .attr("dy", "1em")
            .classed("axis-text", true)
            .text(`${label} (%)`)
            .attr("value",`${label}`)
            .attr("id","y")
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

    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([0, 0])
        .html(function(d) {
        return (`State: ${d["state"]}<br>${chosen_x}: ${d[chosen_x]} <br> ${chosen_y}: ${d[chosen_y]}%`);
        });
    circle_group.call(toolTip)
    circle_group.on("mouseover",function(data){
        toolTip.show(data, this)
    })
    circle_group.on("mouseout", function(data, index) {
        toolTip.hide(data);
      });
    
  
    var state_labels = d3.selectAll("#states")
        .append("text")
        .attr("x",d => xScale(d[chosen_x]))
        .attr("y",d => yScale(d[chosen_y]))
        .text(d => d.abbr)
        .style("fill","white")
        .attr("dx", function(d){return -10})
        .attr("dy", function(d){return 5})

    state_labels.call(toolTip)
    state_labels.on("mouseover",function(data){
        toolTip.show(data, this)
    })
    state_labels.on("mouseout", function(data, index) {
        toolTip.hide(data);
    });

    d3.selectAll("#x").on("click",function(){
        var value = d3.select(this).attr("value")
        chosen_x = value
        
        var new_x_scale = build_x_scale(census_data,chosen_x)
        var new_bottom_axis = d3.axisBottom(new_x_scale)
        d3.select("#x_axis").transition().call(new_bottom_axis)
        
        circle_group.transition()
        .duration(1000)
        .attr("cx", d => new_x_scale(d[chosen_x]))

        state_labels.transition()
        .duration(1000)
        .attr("x",d => new_x_scale(d[chosen_x]))
    })
    d3.selectAll("#y").on("click",function(){
        var value = d3.select(this).attr("value")
        chosen_y = value

        var new_y_scale = build_y_scale(census_data,chosen_y)
        var new_left_axis = d3.axisLeft(new_y_scale)
        d3.select("#y_axis").transition().call(yAxis)

        circle_group.transition()
        .duration(1000)
        .attr("cy",d => yScale(d[chosen_y]))

        state_labels.transition()
        .duration(1000)
        .attr("y",d => yScale(d[chosen_y]))
    })
        
    });
    
