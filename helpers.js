const cityJsonList = require('./config/city_list.json');
const weatherJsonList = require('./config/weather_list.json');
const moment = require('moment');

const retrieveCitiesArray = () => {
    if(Array.isArray(cityJsonList)) {
        return cityJsonList;
    } else {
        return cityJsonList;
    }
}

module.exports = {
    retrieveCitiesArray,
}