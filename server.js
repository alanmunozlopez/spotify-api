'use strict'

const http = require('http')
const express = require('express')
const chalk = require('chalk')


const port = process.env.PORT || 3300
const app = express()
const server = http.createServer(app)

server.listen(port, () => {
  console.log(`${chalk.blue('[Spotify-API]')} server listening on port: ${port}`)
})