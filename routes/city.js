const router = require('express').Router();

const {retrieveCityById} = require('../helpers');

router.get('/cities', (req, res) => {
    return res.json(retrieveCitiesArray())
})

router.get('/cities/weather', (req, res) => {
})

router.get('/cities/:id/weather', (req, res) => {

})



module.exports = router;