const express = require('express');
const citiesRoutes = require('./routes/city');
const swaggerRoute = require('./routes/swagger');

const app = express();
const port = process.env.PORT || 8080

app.use(swaggerRoute)
app.use(citiesRoutes)
app.listen(port, () => {
    console.log(`Rodando na porta: ${port}`)
})