function printData(data){
    console.log(data)
}

function printMap(mapData){
    pass
}

function getColor(mapDate, quakeDate){
    
}

function drawWorld(error, countries) {
    var width = 1000;
    var height = 500;

    var projection = d3.geoEquirectangular()
        .fitExtent([[0,0], [width, height]], countries);
    
    var geoGenerator = d3.geoPath()
        .projection(projection);

    var paths = d3.select('svg')
        .selectAll('path')
        .data(countries.features)
        .enter()
        .append('path')
        .attr('d', geoGenerator);
}