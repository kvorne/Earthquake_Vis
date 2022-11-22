function getOpacity(mapDate, quakeDate){
    numDaysAgo = mapDate-quakeDate;
    return 100-((numDaysAgo-1)/30*100)
}

function getColor(date){
    var value2color = d3.scaleSequential()
				.domain([0, 366])
				.interpolator(d3.interpolateRainbow);
    return value2color(date)
}

function getRadius(magnitude, scaleFactor){
    return magnitude*scaleFactor;
}

function drawCir(x,y,color, opacity, radius, isStroke, svg){
    //this will append a circle in the right spot
    svg.append("circle")
       .attr('r', radius)
       .attr('cx', x) 
       .attr('cy', y) 
       .attr('fill', color)
       .attr('opacity', opacity)
       .attr('stroke-width', function (isStroke){
            if (isStroke){ 
                return "1px"
            } else {
                return "0px"
            }
        })
       .attr('stroke', "black");
}