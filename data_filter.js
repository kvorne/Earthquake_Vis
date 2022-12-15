function getDay(date){
    return String(date).split("/")[0]
}

function getMonth(date){
    return String(date).split("/")[1]
}

function getYear(date){
    return String(date).split("/")[2]
}

function daysOutOf366(date){
    date = new Date(date);
    return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
}