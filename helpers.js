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

const retrieveCitiesWithWeather = () => {
    if(Array.isArray(cityJsonList) && Array.isArray(weatherJsonList)) {
        let cityIncludedWeatherKey = cityJsonList.map(city => {
            const cityWeather = weatherJsonList.find(weather => weather.cityId === city.id)
            return {
                ...city,
                weather: cityWeather ? cityWeather.data : []
            }
        })
        return cityIncludedWeatherKey
    } 
    return []
}

const retrieveCitiesWithWeatherAvailable = () => {
    let citiesWithWeather = retrieveCitiesWithWeather();
    if(Array.isArray(citiesWithWeather)) {
        return citiesWithWeather.filter(city => city.weather.length > 0)
    }
    return []
}


module.exports = {
    retrieveCitiesArray,
    retrieveCitiesWithWeather,
    retrieveCitiesWithWeatherAvailable
}