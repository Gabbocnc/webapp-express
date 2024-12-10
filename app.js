const express = require('express')
const app = express()
const myRoutes = require('./routes/films.js')


app.use(express.json())
app.use('/', myRoutes)

app.listen(3005, () => {
    console.log('Server started on port 3005');
})