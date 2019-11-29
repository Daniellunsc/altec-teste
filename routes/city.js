const router = require('express').Router();

const {filterWeatherDataByTime, 
     retrieveCitiesWithWeatherAvailable,
     retrieveCitiesArray, retrieveCityById} = require('../helpers');

router.get('/cities', (req, res) => {
    return res.json(retrieveCitiesArray())
})

router.get('/cities/weather', (req, res) => {
    return res.json(retrieveCitiesWithWeatherAvailable())
})

router.get('/cities/:id/', (req, res) => {
    const cityId = req.params.id;
    const dateStart = req.query.dateStart;
    const dateEnd = req.query.dateEnd;

    let cityFound = retrieveCityById(cityId);
    
    if(dateStart) {
        let cityFiltered = filterWeatherDataByTime(dateStart, dateEnd, cityFound)
        return res.json(cityFiltered)
    }
    return res.json(cityFound)
})



module.exports = router;