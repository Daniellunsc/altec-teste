const test = require('tape');
const {retrieveCitiesArray, retrieveCitiesWithWeather, retrieveCitiesWithWeatherAvailable, retrieveCityById, filterWeatherDataByTime} = require('../helpers')
const moment = require('moment');

test('Retorna array de cidades', (t) => {
    const retrievedArray = retrieveCitiesArray();
    t.assert(Array.isArray(retrievedArray), "Retornou um array.");
    t.assert(retrievedArray.length > 0, "Retornou um array valido de cidades.");
    t.end();
});

test('Retorna array de cidades com a chave weather', (t) => {
    const retrievedArray = retrieveCitiesWithWeather();
    t.assert(Array.isArray(retrievedArray), "Retornou um array válido.")
    t.assert(retrievedArray.filter(item => item.weather === undefined).length === 0, "Todas as cidades possuem a chave weather");
    t.end();
});

test('Retorna somente as cidades que possuem uma previsão de tempo', (t) => {
    const retrievedArray = retrieveCitiesWithWeatherAvailable();
    const totalCities = retrieveCitiesWithWeather();
    const totalCitiesWithWeather = totalCities.filter(city => city.weather.length > 0)
    t.assert(Array.isArray(retrievedArray), "Retornou um array válido.")
    t.assert(retrievedArray.filter(item => item.weather === undefined).length === 0, "Todas as cidades retornadas possuem a chave weather.");
    t.assert(retrievedArray.length === totalCitiesWithWeather.length, "A função retorna somente as cidades com previsão de tempo.");
    t.end();
});

test('Retorna uma cidade pelo seu ID', (t) => {
    const retrievedCity = retrieveCityById('3531732');
    const unknowCity = retrieveCityById('13123123213123123'); // ID aleatório para garantir que não exista
    t.assert(retrievedCity.id !== undefined, 'Retornou uma cidade corretamente.')
    t.assert(unknowCity.message === "notfound", 'Retornou uma mensagem de notfound corretamente ao não encontrar a cidade.')
    t.end();
});

test('Retorna uma cidade com a previsão do tempo filtrada', (t) => {

    const startDate = '2017-03-15';
    const endDate = '2017-03-17';

    const retrievedCity = retrieveCityById('3992619');
    const weatherFilteredWithoutEnd = filterWeatherDataByTime(startDate, null, retrievedCity);
    const weatherFilteredWithEnd = filterWeatherDataByTime(startDate, endDate, retrievedCity);
    const weatherWithoutFilter = filterWeatherDataByTime(null, null, retrievedCity)
    t.assert(weatherFilteredWithoutEnd.weather.length < retrievedCity.weather.length, 'Retornou uma cidade com sua previsão do tempo filtrada sem endDate.')
    t.assert(weatherFilteredWithEnd.weather.length < retrievedCity.weather.length, 'Retornou uma cidade com sua previsão do tempo filtrada com endDate.')
    t.assert(weatherWithoutFilter.weather.length === retrievedCity.weather.length, 'Retornou a cidade completa sem filtro de datas.')
    t.end();
});


test('Teste range de datas', (t) => {
    const startDate = '2017-03-15';
    const endDate = '2017-03-17';

    const startDateUnix = moment(startDate, "YYYY-MM-DD").unix();
    const endDateUnix = moment(endDate, "YYYY-MM-DD").unix();
    const retrievedCity = retrieveCityById('3992619');
    const weatherFilteredWithoutEnd = filterWeatherDataByTime(startDate, null, retrievedCity);
    const weatherFilteredWithEnd = filterWeatherDataByTime(startDate, endDate, retrievedCity);
    const weatherWithEnd = weatherFilteredWithEnd.weather;
    t.assert(weatherFilteredWithoutEnd.weather[0].dt >= startDateUnix, 'Retornou a lista corretamente de previsões filtradas com datas a partir de startDate sem endDate')
    t.assert((weatherFilteredWithEnd.weather[0].dt >= startDateUnix) && (weatherFilteredWithEnd.weather[weatherWithEnd.length - 1].dt <= endDateUnix), 'Retornou a lista corretamente de previsões filtradas com datas a partir de startDate e terminando em endDate')
    t.end();
});
