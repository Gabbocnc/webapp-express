const express = require('express')
const cors = require('cors')
const app = express()
const myRoutes = require('./routes/films.js')
const notFoundMiddleware = require('./middlewares/notFound.js')

app.use(cors())
app.use(express.json())
app.use('/', myRoutes)
app.use(notFoundMiddleware)


app.listen(3005, () => {
    console.log('Server started on port 3005');
})