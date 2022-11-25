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

function drawCir(x,y,color, opacity, radius, isStroke, svg){
    //this will append a circle in the right spot
    var cir = svg.append("circle")
       .attr('r', radius)
       .attr('cx', x) 
       .attr('cy', y) 
       .attr('fill', color)
       .attr('opacity', opacity)
       .attr('stroke', "black");

    if (isStroke) {
        cir.attr('stroke-width', ".5px");
    } else {
        cir.attr('stroke-width', "0px");
    }

    return cir;
}