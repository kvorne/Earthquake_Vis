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
    return (Math.pow(magnitude*scaleFactor, 4.5)/570);
}

function drawCir(x,y,color, opacity, radius, isStroke, svg, date, mag){
    //this will append a circle in the right spot
    var cir = svg.append("circle")
        .attr('cx', x) 
        .attr('cy', y)
        .attr('fill', color)
        .attr('opacity', opacity)
        .attr('stroke', "black")
        .attr("r", 0)
        .on('mouseover', function(d, i) {
            if(!isStroke){
                cir.style("opacity", "100%");
            }
            else {
                cir.style("fill", "blue")
            }
            let tooltip = d3.select("g.tooltip")
            tooltip.style("display", "inline");
            tooltip.select("text.date").text(`${date}`);
            tooltip.select("text.mag").text(`Magnitude ${mag}`);
        })
        .on('mouseout', function() {
            if(!isStroke){
                cir.style("opacity", opacity);
            }
            else {
                cir.style("fill", color)
            } 
            let tooltip = d3.select("g.tooltip")
            tooltip.style("display", "none");
        })
        .on('mousemove', function(d){
            let tooltip = d3.select("g.tooltip")
            var xPos = d3.mouse(this)[0] + 10
            var yPos = d3.mouse(this)[1] + 10
            tooltip.attr('transform', "translate(" + xPos + "," + yPos + ")");
            
        });
       

    if (isStroke) {
        var tran = d3.transition()
            .duration(300);
        cir.attr('stroke-width', ".5px");
        cir.transition(tran).attr('r', radius);
    } else {
        cir.attr('stroke-width', "0px");
        cir.attr('r', radius);
    }

    return cir;
}