function printData(data){
    console.log(data)
}

function longLatProjection(long, lat){
    var width = 1000;
    var height = 500;

    var projection = d3.geoEquirectangular()
        .scale(height / Math.PI)
        .translate([width / 2, height / 2]);
    return projection([long, lat])
}

function drawWorld(projection, countries){
    var geoGenerator = d3.geoPath()
        .projection(projection);

    var svg = d3.select('svg').select('g.map')

    var paths = svg
        .selectAll('path')
        .data(countries.features)
        .enter()
        .append('path')
        .attr('country', function(d, i) {
            return countries.features[i].properties.name_long;})
        .attr('d', geoGenerator);
}

function showPlates(){
    let svg = d3.select("svg")
    
    svg.selectAll("circle").remove()
    svg.select("g.map").remove()
    svg.append("g")
        .attr("class", "map")
    d3.json("plates.json", buildMap)
    plates = true
}

function showMap(){
    let svg = d3.select("svg")
    
    svg.selectAll("circle").remove()
    svg.select("g.map").remove()
    svg.append("g")
    .attr("class", "map")
    d3.json("map.json", buildMap)
    plates = false
}

function buildMap(error, countries) {
    var width = 1000;
    var height = 500;

    var projection = d3.geoEquirectangular()
        .fitExtent([[0,0], [width, height]], countries);
    
    
    drawWorld(projection, countries);

}
