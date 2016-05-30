/**
 * Created by Lula on 5/29/2016.
 */
var http = require("http");


//print forecast message
function printMessage(data){
    var temp = data.main.temp.toFixed();
    var message = `Current temperature in ${data.name} is ${temp} °C`;
    console.log(message);
}

//print error messages
function printError(error){
    var errorToShow  = "";
    if(error && error.message) {
        errorToShow = error.message;
    }
    else{
        errorToShow = "There was an error getting forecast";
    }
    console.error(errorToShow);
}
function cityNameValidation(cityName){
    var isValid = false;
    if(cityName.length>2 && cityName.search(/^[a-zA-Z\s-]+$/)!=-1){
        var isValidName = true;
    }
    return isValidName;
}

function getForecast(cityName) {
    if(cityNameValidation(cityName)) {
        var request = http.get('http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid=26ee56b5260f0a269b46ab57c95d77d2', function (response) {
            var body = "";
            response.on('data', function (chunk) {
                body += chunk;
            });
            response.on('end', function () {
                if (response.statusCode === 200) {
                    try {
                        var data = JSON.parse(body);
                        printMessage(data);
                    }
                    catch (error) {
                        //parse error
                        printError(error);
                    }
                }
                else {
                    //status code error
                    printError({
                        message: "There was an error getting forecast for " + cityName + "."
                        + "Status code is " + response.statusCode + " : " + http.STATUS_CODES[response.statusCode]
                    });
                }
            })
        });
        //connection error
        request.on("error", printError);
    }
    else{
        printError({
            message: "Wrong city name format. Example of right command and city format: node app.js London"
        });
    }

}

module.exports.getForecast = getForecast;