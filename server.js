'use strict'

const http = require('http')
const chalk = require('chalk')
const express = require('express')

const api = require('./api')

const port = process.env.PORT || 3300
const app = express()
const server = http.createServer(app)

//require middleware
app.use('/api', api)

server.listen(port, () => {
  console.log(`${chalk.blue('[Spotify-API]')} server listening on port: ${port}`)
})