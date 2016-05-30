/**
 * Created by Lula on 5/29/2016.
 */
var weather = require("./weather.js");
var cityData = process.argv.slice(2);
var cityName = cityData.join(" ");
weather.getForecast(cityName);