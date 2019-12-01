const router = require('express').Router();

const {filterWeatherDataByTime, 
     retrieveCitiesWithWeatherAvailable,
     retrieveCitiesArray, retrieveCityById} = require('../helpers');

/**
 * @swagger
 * path:
 *  /cities/:
 *    get:
 *      summary: Retorna todas as cidades SEM previsão do tempo
 *      tags: ["Cities"]
 *      responses:
 *        "200":
 *          description: Um array de cidades
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 */
router.get('/cities', (req, res) => {
    return res.json(retrieveCitiesArray())
})


/**
 * @swagger
 * path:
 *  /cities/weather:
 *    get:
 *      summary: Retorna todas as cidades disponíveis COM previsão do tempo
 *      tags: ["Cities"]
 *      responses:
 *        "200":
 *          description: Um array de cidades
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 */
router.get('/cities/weather', (req, res) => {
    return res.json(retrieveCitiesWithWeatherAvailable())
})


/**
 * @swagger
 * path:
 *  /cities/{id}:
 *    get:
 *      summary: Retorna uma cidade
 *      tags: ["Cities"]
 *      parameters:
 *       - name: id
 *         description: ID de uma cidade
 *         in: path
 *         required: true
 *         type: string
 *       - name: dateStart
 *         description: data de início do filtro - YYYY-MM-DD
 *         in: query
 *         required: false
 *         type: string
 *       - name: dateEnd
 *         description: data de fim do filtro - YYYY-MM-DD
 *         in: query
 *         required: false
 *         type: string
 *      responses:
 *        "200":
 *          description: Um array de cidades
 *          content:
 *            application/json:
 *              schema:
 *                  type: object
 *        "400":
 *          description: Cidade não encontrada 'notfound'
 *          content:
 *            application/json:
 *              schema:
 *                  type: object
 */      
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