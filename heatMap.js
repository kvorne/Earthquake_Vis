function printPaths(){
    countryCounts = {};
    var svg = d3.select("svg");
    var circles = svg.selectAll("circle")._groups[0];
    for(let i = 0; i < circles.length; i++){
        var intersecting = document.elementsFromPoint(parseFloat(circles[i].cx.baseVal.value +50), parseFloat(circles[i].cy.baseVal.value +75.02));
        for(let j = 0; j < intersecting.length; j++){
            if(typeof intersecting[j] !== 'undefined'){
                if(intersecting[j].tagName == 'path'){
                    var country = intersecting[j].getAttribute('country')
                    if (countryCounts[country] !== undefined){
                        countryCounts[country] += 1;
                    } else {
                        countryCounts[country] = 1;
                    }
                }
            }
        }
    }
    console.log(countryCounts)
    var countriesList = Object.keys(countryCounts);
    var max = 0;
    for(i = 0; i < countriesList.length; i++){
        if(countryCounts[countriesList[i]] > max){
            max = countryCounts[countriesList[i]];
        }
    }
    var paths = svg.selectAll("path");
    for(let i = 0; i < paths._groups[0].length; i++){
        paths._groups[0][i].style.fill = "rgb(118, 0, 8)";
        var num = countryCounts[paths._groups[0][i].getAttribute('country')]
        if(num == undefined){
            paths._groups[0][i].style.fillOpacity = "0%"
        } else {
            paths._groups[0][i].style.fillOpacity = parseFloat(num/max*100)*.8+20 + "%"
        }
    }
}


function removeHeatmap(){
    var svg = d3.select("svg");
    var paths = svg.selectAll("path");
    for(let i = 0; i < paths._groups[0].length; i++){
        paths._groups[0][i].style.fill = "white";
    }
}