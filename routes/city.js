const router = require('express').Router();


const {retrieveCitiesWithWeatherAvailable, retrieveCitiesArray, retrieveCityById} = require('../helpers');

router.get('/cities', (req, res) => {
    return res.json(retrieveCitiesArray())
})

router.get('/cities/weather', (req, res) => {
    return res.json(retrieveCitiesWithWeatherAvailable())
})

router.get('/cities/:id/weather', (req, res) => {
    const cityId = req.params.id;
    return res.json(retrieveCityById(cityId))
})



module.exports = router;