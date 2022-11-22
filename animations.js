function overTime(){

}

function fullYear(svg, year, earthquakes, projection){
    console.log(year);
    const startYear = (element) => getYear(element.Date) == year;
    start_index = earthquakes.findIndex(startYear, year);
    
    console.log(earthquakes[start_index]);
    console.log(daysOutOf366(earthquakes[start_index].Date))

    let i = start_index;
    while(getYear(earthquakes[i].Date) == year){
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
    // while(getYear(earthquakes[i].Date) < year){
    //     console.log(getYear(earthquakes[i].Date));
    //     i++;
    // }
}