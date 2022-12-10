function overTime(svg, date, earthquakes, projection){
    var circles = svg.selectAll("circle");
    circles.remove();
    drawFrame(svg, date, earthquakes, projection);
}

function drawFrame(svg, date, earthquakes, projection){
    circles.remove();
    var earliest = new Date(date);
    var currDate = new Date(date);
    var latest = new Date(date);
    earliest.setDate(currDate.getDate() - 30);

    const startDate = (element) => new Date(element.Date).toDateString() === earliest.toDateString();
    start_index = earthquakes.findIndex(startDate, earliest);

    let i = start_index;

    while(new Date(earthquakes[i].Date) <= currDate){
        curr = earthquakes[i];
        let coordinates = projection([curr.Longitude, curr.Latitude]);
        //console.log(((latest - new Date(curr.Date))/86400000))
        let cir = drawCir(
            coordinates[0], 
            coordinates[1], 
            "maroon", 
            getOpacity(((latest - new Date(curr.Date))/86400000)),
            getRadius(curr.Magnitude, 1),
            true, 
            svg
        );
        cir
            .attr("date", new Date(curr.Date));
        i++;
    }
}

function fullYear(svg, year, earthquakes, projection){
    var circles = svg.selectAll("circle");
    circles.remove();
    const startYear = (element) => getYear(element.Date) == year;
    start_index = earthquakes.findIndex(startYear, year);

    let i = start_index;
    while(getYear(earthquakes[i].Date) == year){
        curr = earthquakes[i];;
        let coordinates = projection([curr.Longitude, curr.Latitude]);

        drawCir(
            coordinates[0], 
            coordinates[1], 
            getColor(daysOutOf366(curr.Date)), 
            "20%",
            getRadius(curr.Magnitude, 1),
            false, 
            svg
        );

        i++;
    }

}

function allTime(svg, year, earthquakes, projection){
    var circles = svg.selectAll("circle");
    circles.remove();
    const startYear = (element) => getYear(element.Date) == year;
    start_index = earthquakes.findIndex(startYear, year);

    for (let i = 0; i < earthquakes.length; i++){
        curr = earthquakes[i];
        let coordinates = projection([curr.Longitude, curr.Latitude]);

        drawCir(
            coordinates[0], 
            coordinates[1], 
            getColor(daysOutOf366(curr.Date)), 
            "20%",
            getRadius(curr.Magnitude, 1),
            false, 
            svg
        );

        i++;
    }
}