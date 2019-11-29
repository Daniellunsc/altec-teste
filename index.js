const express = require('express');
const citiesRoutes = require('./routes/city');

const app = express();
const port = process.env.PORT || 8080
app.use(citiesRoutes)

app.listen(port, () => {
    console.log(`Rodando na porta: ${port}`)
})