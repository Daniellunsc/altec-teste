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

const retrieveCityById = (cityId) => {
    const citiesWithWeather = retrieveCitiesWithWeather();
    if(Array.isArray(citiesWithWeather)) {
        const cityFound = citiesWithWeather.find(city => String(city.id) === String(cityId))
        return cityFound ? cityFound : {message: 'notfound'}
    } 
    return {message: 'notfound'}
}

const filterWeatherDataByTime = (startDate, endDate, cityObject) => {
    if(startDate && !endDate) {
        let unixStartDate = moment(startDate, "YYYY-MM-DD").unix();
        let weatherArray = cityObject.weather.filter(weather => weather.dt >= unixStartDate)
        return {...cityObject, weather: weatherArray}
    } else if(startDate && endDate) {
        let unixStartDate = moment(startDate, "YYYY-MM-DD").unix();
        let unixEndDate = moment(endDate, "YYYY-MM-DD").unix();
        let weatherArray = cityObject.weather.filter(weather => weather.dt >= unixStartDate && weather.dt <= unixEndDate)
        return {...cityObject, weather: weatherArray}
    } else {
        return cityObject;
    }
}

module.exports = {
    retrieveCitiesArray,
    retrieveCitiesWithWeather,
    retrieveCitiesWithWeatherAvailable,
    retrieveCityById,
    filterWeatherDataByTime
}