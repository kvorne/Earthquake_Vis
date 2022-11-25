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

    var svg = d3.select('svg')

    var paths = svg
        .selectAll('path')
        .data(countries.features)
        .enter()
        .append('path')
        .attr('country', function(d, i) {
            return countries.features[i].properties.name_long;})
        .attr('d', geoGenerator);
}