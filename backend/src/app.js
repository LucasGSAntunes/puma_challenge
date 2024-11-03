const express = require('express')
const router = require('./routes/router')
const cors = require('cors')
const conn = require('./db/conn')
const app = express()
const db = conn()

app.set('db', db)
app.use(cors())
app.use(express.json())
app.use(router)

module.exports = app