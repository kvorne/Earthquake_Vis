function makeToolTip(){
    var svg = d3.select("svg")
    var tooltip = svg.append("g")
        .attr("class", "tooltip")
        .style("display", "none");

      tooltip.append("rect")
        .attr("width", 90)
        .attr("height", 35)
        .attr("fill", "gray")
        .style("opacity", 0.8);
        
    tooltip.append("text")
        .attr("x", 45)
            //em is a unit of measurement,
            //relative to the size of the font
            .attr("dy", "1.2em")
        .style("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("font-weight", "bold")
        .attr("class", "date");
    
        tooltip.append("text")
        .attr("x", 45)
            //em is a unit of measurement,
            //relative to the size of the font
            .attr("dy", "2.4em")
        .style("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("font-weight", "bold")
        .attr("class", "mag");
} 

function drawVis(error, earthquakes) {
    var svg = d3.select('svg')
    
    if(plates){
        d3.json("plates.json", doThing);
    }
    else {
        d3.json("map.json", doThing);
    }
    

    function doThing(error, countries){
        var projection = d3.geoEquirectangular()
        .fitExtent([[0,0], [width, height]], countries);

        let sel = document.getElementById('select')
        //overTime(svg, `01/01/${sel.options[select.selectedIndex].value}`, earthquakes, projection)
        fullYear(svg, 1998, earthquakes, projection);
        //allTime(svg, 1998, earthquakes, projection);
        //printData(earthquakes);
    }
    
    
}

function animateVis(error, earthquakes) {
    var svg = d3.select('svg')
    
    if(plates){
        d3.json("plates.json", doThing);
    }
    else {
        d3.json("map.json", doThing);
    }
    

    function doThing(error, countries){
        var projection = d3.geoEquirectangular()
        .fitExtent([[0,0], [width, height]], countries);

        let sel = document.getElementById('select')
        overTime(svg, `01/01/${sel.options[select.selectedIndex].value}`, earthquakes, projection)
        //fullYear(svg, 1998, earthquakes, projection);
        //allTime(svg, 1998, earthquakes, projection);
        //printData(earthquakes);
    }
    
    
}
