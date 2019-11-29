const test = require('tape');
const {retrieveCitiesArray, retrieveCitiesWithWeather, retrieveCitiesWithWeatherAvailable} = require('../helpers')

test('Retorna array de cidades', (t) => {
    const retrievedArray = retrieveCitiesArray();
    t.assert(Array.isArray(retrievedArray), "Retornou um array.");
    t.assert(retrievedArray.length > 0, "Retornou um array valido de cidades.");
    t.end();
})

test('Retorna array de cidades com a chave weather', (t) => {
    const retrievedArray = retrieveCitiesWithWeather();
    t.assert(Array.isArray(retrievedArray), "Retornou um array válido.")
    t.assert(retrievedArray.filter(item => item.weather === undefined).length === 0, "Todas as cidades possuem a chave weather");
    t.end();
})

test('Retorna somente as cidades que possuem uma previsão de tempo', (t) => {
    const retrievedArray = retrieveCitiesWithWeatherAvailable();
    const totalCities = retrieveCitiesWithWeather();
    const totalCitiesWithWeather = totalCities.filter(city => city.weather.length > 0)
    t.assert(Array.isArray(retrievedArray), "Retornou um array válido.")
    t.assert(retrievedArray.filter(item => item.weather === undefined).length === 0, "Todas as cidades retornadas possuem a chave weather.");
    t.assert(retrievedArray.length === totalCitiesWithWeather.length, "A função retorna somente as cidades com previsão de tempo.");
    t.end();
})