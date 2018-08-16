'use strict'

const debug = require('debug')('spotifyapi:api:routes')
const express = require('express')

const api = express.Router()

api.get('/hello', (req, res) => {
  debug('This is a hello world')
  res.send({ "msg": "all clear"})
})

module.exports = api