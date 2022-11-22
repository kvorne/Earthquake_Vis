MAG_TO_RADIUS = 1.3;

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

function getRadius(magnitude){
    return magnitude*MAG_TO_RADIUS;
}

function drawCir(x,y,color, opacity, radius, svg){
    //this will append a circle in the right spot
    var cir = svg.append("circle")
       .attr('r', radius)
       .attr('transform', 'translate(' + [x, y] + ')') 
       .attr('fill', color)
       .attr('fill-opacity', opacity);
}