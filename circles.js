function getOpacity(numDaysAgo){
    return String(100-((numDaysAgo-1)/30*90))+"%";
}

function getColor(date){
    var value2color = d3.scaleSequential()
				.domain([0, 366])
				.interpolator(d3.interpolateInferno);
    return value2color(date)
}

function getRadius(magnitude, scaleFactor){
    return (Math.pow(magnitude*scaleFactor, 3)/50);
}

function drawCir(x,y,color, opacity, radius, isStroke, svg, date, mag){
    var tran = d3.transition()
			    .duration(300);
    //this will append a circle in the right spot
    var cir = svg.append("circle")
        .attr('cx', x) 
        .attr('cy', y)
        .attr('fill', color)
        .attr('opacity', opacity)
        .attr('stroke', "black")
        .attr("r", 0)
        .on('mouseover', function(d, i) {
            let tooltip = d3.select("g.tooltip")
            console.log(tooltip)
            tooltip.style("display", "inline");
            //var text = popNums ? String(((d[1] - d[0]) * popData[d.data["year"]]).toFixed(0)) : String(((d[1] - d[0]) * 100).toFixed(2)) + "%"
            tooltip.select("text.date").text(`${date}`);
            tooltip.select("text.mag").text(`Magnitude ${mag}`);
        })
        .on('mouseout', function() {
        //.on('mouseleave', function() {
            let tooltip = d3.select("g.tooltip")
            tooltip.style("display", "none");
        })
        .on('mousemove', function(d){
            let tooltip = d3.select("g.tooltip")
            var xPos = d3.mouse(this)[0] + 10
            var yPos = d3.mouse(this)[1] + 10
            tooltip.attr('transform', "translate(" + xPos + "," + yPos + ")");
            
        });

    cir.transition(tran).attr('r', radius);
       
       

    if (isStroke) {
        cir.attr('stroke-width', ".5px");
    } else {
        cir.attr('stroke-width', "0px");
    }

    return cir;
}