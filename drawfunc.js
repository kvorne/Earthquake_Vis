function makeToolTip(){
    var svg = d3.select("svg")
    var tooltip = svg.append("g")
        .attr("class", "tooltip")
        .style("display", "none");

      tooltip.append("rect")
        .attr("width", 90)
        .attr("height", 35)
        .attr("fill", "white")
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
        console.log("here")
        //let sel = document.getElementById('select')
        //overTime(svg, `01/01/${sel.options[select.selectedIndex].value}`, earthquakes, projection)
        var year = document.getElementById('select').options[select.selectedIndex].value;
        fullYear(svg, year, earthquakes, projection, getColor);
        //allTime(svg, 1998, earthquakes, projection);
        //printData(earthquakes);
    }
    
    
}

function primColor(){
    return 'blue';
}

function secColor(){
    return 'red';
}

function drawCompare(error, earthquakes) {
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
        //let sel = document.getElementById('select')
        //overTime(svg, `01/01/${sel.options[select.selectedIndex].value}`, earthquakes, projection)
        var year = document.getElementById('select').options[select.selectedIndex].value;
        fullYear(svg, year, earthquakes, projection, primColor);

        var ind1 = document.getElementById('secondselect').options.selectedIndex
        var year1 = document.getElementById('secondselect').options[ind1].value//.options[select.selectedIndex].value;
        console.log(year1)
        fullYear(svg, year1, earthquakes, projection, secColor);
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

function makeAnimationLegend(){
    legend = d3.select("svg .legend");
    var label = legend.append("text")
        .text("Current Day")
        .attr('x', 1040)
        .attr('y', 20);

    var colors = [ 'rgb(118, 0, 8)', 'white' ];
    var grad = legend.append('defs')
        .append('linearGradient')
        .attr('id', 'grad')
        .attr('x1', '0%')
        .attr('x2', '0%')
        .attr('y1', '0%')
        .attr('y2', '100%');

    grad.selectAll('stop')
        .data(colors)
        .enter()
        .append('stop')
        .style('stop-color', function(d){ return d; })
        .attr('offset', function(d,i){
            return 100 * (i / (colors.length - 1)) + '%';
        });

    legend.append('rect')
        .attr('x', 1040)
        .attr('y', 30)
        .attr('width', 30)
        .attr('height', 300)
        .style('fill', 'url(#grad)');

    var label2 = legend.append("text")
        .attr('x', 1040)
        .attr('y', 350)
        .text("30 Days ago");
}

function makeYearLegend(){
    legend = d3.select("svg .legend");
    var label = legend.append("text")
        .text("January")
        .attr('x', 1040)
        .attr('y', 20);

    var data = Array.from(Array(100).keys());

    // Define a color scale
    var colorScale = d3.scaleSequential()
        .domain([0, 99])  // input value range
        .interpolator(d3.interpolateInferno);

    var xScale = d3.scaleLinear()
        .domain([0,99])
        .range([0, 300]);

    var u = d3.select("svg .legend")
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("y", (d) => Math.floor(xScale(d)+30))
        .attr("x", 0)
        .style("opacity", "20%")
        .attr("width", 40)
        .attr("height", (d) => {
            if (d == 99) {
                return 6;
            }
            return Math.floor(xScale(d+1)) - Math.floor(xScale(d));
         })
        .attr("fill", (d) => colorScale(d));
    
    u.attr("x", 1040);

    var label2 = legend.append("text")
        .attr('x', 1040)
        .attr('y', 350)
        .text("December");
}

function makeCompareLegened(){
    legend = d3.select("svg .legend");

    var year = document.getElementById('select').options[select.selectedIndex].value;

    var ind1 = document.getElementById('secondselect').options.selectedIndex
    var year1 = document.getElementById('secondselect').options[ind1].value


    var label = legend.append("text")
        .attr('x', 1040)
        .attr('y', 20)
        .text(year);

    var square = legend.append('rect')
        .attr('x', 1080)
        .attr('y', 10)
        .attr('width', 10)
        .attr('height', 10)
        .attr('fill', 'blue');

    var label1 = legend.append("text")
        .attr('x', 1040)
        .attr('y', 40)
        .text(year1);

    var square1 = legend.append('rect')
        .attr('x', 1080)
        .attr('y', 30)
        .attr('width', 10)
        .attr('height', 10)
        .attr('fill', 'red');
}

function fullYear(svg, year, earthquakes, projection, scaleColor){
    if(scaleColor() != 'red'){
        var circles = svg.selectAll("circle");
        circles.remove();
    }
    //console.log(year);
    const startYear = (element) => getYear(element.Date) == year;
    start_index = earthquakes.findIndex(startYear, year);
    //console.log(getYear(earthquakes[0].Date));

    let i = start_index;
    while(getYear(earthquakes[i].Date) == year){
        curr = earthquakes[i];;
        let coordinates = projection([curr.Longitude, curr.Latitude]);

        drawCir(
            coordinates[0], 
            coordinates[1], 
            scaleColor(daysOutOf366(curr.Date)), 
            "20%",
            getRadius(curr.Magnitude, 1),
            false, 
            svg,
            curr.Date,
            curr.Magnitude
        );

        i++;
    }

}