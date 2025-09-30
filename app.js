const express = require('express')
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const bookingRouter = require('./routes/bookingRouter')

require('dotenv').config()

const app = express()
app.use(bodyParser.json())

connectDB()

app.use('/', bookingRouter)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})