const express = require('express');
const citiesRoutes = require('./routes/city');

const app = express();

app.use(citiesRoutes)

app.listen(3000, () => {
    console.log('Rodando na porta :3000')
})