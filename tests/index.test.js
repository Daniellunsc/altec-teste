const test = require('tape');
const {retrieveCitiesArray} = require('../helpers')

test('Retorna array de cidades', (t) => {
    const retrievedArray = retrieveCitiesArray();
    t.assert(Array.isArray(retrievedArray), "Retornou um array.");
    t.assert(retrievedArray.length > 0, "Retornou um array valido de cidades.");
    t.end();
})