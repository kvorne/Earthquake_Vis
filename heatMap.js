function printPaths(){
    countryCounts = {"Nepal":12,"China":201,"Russian Federation":126,"Tajikistan":22,"India":34,"Chile":260,"Mexico":137,"Argentina":124,"Taiwan":58,"Greece":31,"Indonesia":334,"United States":152,"Iran":85,"Solomon Islands":98,"Colombia":36,"Papua New Guinea":446,"Vanuatu":31,"Bolivia":75,"Ecuador":39,"Myanmar":51,"Japan":185,"Brazil":17,"Panama":21,"Peru":177,"Pakistan":51,"Democratic Republic of the Congo":10,"Costa Rica":35,"Guatemala":60,"Turkey":49,"Mongolia":6,"Iraq":4,"France":1,"Bhutan":2,"Nicaragua":47,"Philippines":174,"Afghanistan":66,"Dominican Republic":9,"New Zealand":24,"Australia":9,"Zambia":2,"Iceland":5,"Kyrgyzstan":28,"Honduras":13,"Ethiopia":9,"Egypt":4,"Albania":3,"Bosnia and Herzegovina":6,"Croatia":3,"Venezuela":11,"South Africa":4,"Canada":18,"Uzbekistan":8,"El Salvador":28,"Kazakhstan":61,"Djibouti":5,"Gabon":1,"Madagascar":3,"Tanzania":11,"Norway":1,"Cuba":2,"Italy":21,"Austria":6,"Central African Republic":1,"Spain":2,"Romania":6,"Bulgaria":2,"Montenegro":3,"Dem. Rep. Korea":2,"Azerbaijan":4,"Serbia":3,"Belize":1,"Switzerland":1,"Thailand":2,"Vietnam":2,"Lao PDR":3,"Guinea":1,"Turkmenistan":5,"Georgia":4,"Paraguay":1,"Mozambique":4,"Malawi":5,"Kenya":2,"South Sudan":4,"North Macedonia":1,"Jamaica":1,"Greenland":1,"Algeria":1,"Israel":1,"Cyprus":2,"Syria":1,"Northern Cyprus":1,"Kosovo":1,"Bangladesh":2,"Eritrea":1,"Uganda":3,"Timor-Leste":2,"Haiti":2,"Yemen":1,"Malaysia":1};
    var svg = d3.select("svg");
    //var circles = svg.selectAll("circle")._groups[0];
    // console.log(circles);
    // var bodyRect = document.body.getBoundingClientRect()
    // var dsvg = document.getElementById('svg')
    // var svgRect = dsvg.getBoundingClientRect()
    // var offsetTop   = svgRect.top - bodyRect.top;
    // var offsetLeft = svgRect.left - bodyRect.left;
    // console.log(offsetTop, offsetLeft);
    // for(let i = 0; i < circles.length; i++){
    //     var intersecting = document.elementsFromPoint(parseFloat(circles[i].cx.baseVal.value +50 + offsetLeft), parseFloat(circles[i].cy.baseVal.value +20 + offsetTop));
    //     for(let j = 0; j < intersecting.length; j++){
    //         if(typeof intersecting[j] !== 'undefined'){
    //             if(intersecting[j].tagName == 'path'){
    //                 var country = intersecting[j].getAttribute('country')
    //                 console.log(country);
    //                 if (countryCounts[country] !== undefined){
    //                     countryCounts[country] += 1;
    //                 } else {
    //                     countryCounts[country] = 1;
    //                 }
    //             }
    //         }
    //     }
    // }
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
        console.log(num)
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