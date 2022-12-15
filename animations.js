var framelength = 300;
var pauseA = false;
var currDate = 0;

function pauseAnimation(){
    d3.select("#pause").style("display", "none");
    d3.select("#resume").style("display", "");
    pauseA = true;
}

function resA(){
    pauseA = false;
}

function resetAnimation(){
    currDate = 0;
    pauseA = false;
}



function getYears(earthquakes){
    years = new Set()
    for(let i = 0; i < earthquakes.length; i++){
        let year = new Date(earthquakes[i].Date)
        year = year.getFullYear()
        if(!years.has(year)){
            years.add(year)
        }
    }
    return years;
}

function buildDropdown(error, earthquakes){
    let years = getYears(earthquakes) 
    let select = d3.selectAll("select")
        
        
    years = Array.from(years)
    select
        .selectAll("options")
        .data(years)
        .enter()
        .append("option")
        .attr("value", function(d, i) { return d; })
        .text(function(d,i) {return d;});

    // select1 = d3.select("select.second")
    // console.log(select1)
    // select1
    //     .selectAll("options")
    //     .data(years)
    //     .enter()
    //     .append("option")
    //     .attr("value", function(d, i) { return d; })
    //     .text(function(d,i) {return d;})
}

async function overTime(svg, date, earthquakes, projection){
    const delay = async (ms = framelength) => new Promise(resolve => setTimeout(resolve, ms))
    var tran = d3.transition()
		.duration(framelength);

    let day = new Date(date)
    day.setDate(day.getDate() + currDate)
    let numdays = 365
    if (day.getFullYear() % 4 == 0){
        numdays++;
    }
    for(; currDate < numdays; currDate++){
		await delay();
        currday = day.toDateString().slice(4)
        document.getElementById('date').innerText = currday
        drawFrame(svg, day, earthquakes, projection);
        day.setDate(day.getDate() + 1)
        if(pauseA){
            return
        }
    }

	await delay();
    svg.selectAll("circle")
        .transition(tran)
        .attr("r", 0)

    await delay();
    svg.selectAll("circle").remove()
}

function drawFrame(svg, date, earthquakes, projection){
    //circles.remove();
    var earliest = new Date(date.toDateString())
    var currDate = new Date(date.toDateString())
    var latest = new Date(date.toDateString())
    //earliest.setDate(currDate.getDate() - 30);

    const startDate = (element) => new Date(element.Date).toDateString() === earliest.toDateString();
    start_index = earthquakes.findIndex(startDate, earliest);

    var tran = d3.transition()
        .duration(framelength);

    let circles = svg.selectAll("circle")
        .each(function(d, i) {
            let c = d3.select(this)
            let op = c.attr("opacity")
            op = String(Number(op.slice(0,-1)) - 3) + "%"
            c.transition(tran).attr("opacity", op)
            if(op <= 0){
                c.remove()
            }
        })

    let i = start_index;

    if(i >= 0){
        let edate = new Date(earthquakes[i].Date)
        while(edate.toDateString() == currDate.toDateString()){
            curr = earthquakes[i];
          
            let coordinates = projection([curr.Longitude, curr.Latitude]);
            //console.log(((latest - new Date(curr.Date))/86400000))
            let cir = drawCir(
                coordinates[0], 
                coordinates[1], 
                "rgb(118, 0, 8)", 
                getOpacity(((latest - new Date(curr.Date))/86400000)),
                getRadius(curr.Magnitude, 1),
                true, 
                svg,
                curr.Date,
                curr.Magnitude
            );
            cir
                .attr("date", new Date(curr.Date));
            i++;
            edate = new Date(earthquakes[i].Date);
        }
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
            svg,
            curr.Date,
            curr.Magnitude
        );

        i++;
    }
}

function updateMap(){
    d3.csv("earthquakes.csv", drawYear);

    function drawYear(error, earthquakes) {
        var circles = svg.selectAll("circle");
        circles.remove();
        d3.json("map.json", buildMap);


        function buildMap(error, countries) {
            var width = 1000;
            var height = 500;
            var projection = d3.geoEquirectangular()
                .fitExtent([[0,0], [width, height]], countries);
            
            var svg = d3.select('svg')

            drawWorld(projection, countries);
            
            fullYear(svg, 1998, earthquakes, projection);
        }
        
    }
}