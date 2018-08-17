'use strict'

const debug = require('debug')('spotifyapi:api:routes')
const express = require('express')
const chalk = require('chalk')

const request = require('request')
const btoa = require('btoa')

// Credentials
const client_id = '5de5cc1dea9a49248447e9c1fc8c883e'
const client_secret = 'f96497e6b670460a8b68279f9d9a1375'

var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://project-albums.firebaseio.com"
});


const api = express.Router()

api.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

// test endpoint
api.get('/hello', (req, res) => {
  debug('This is a hello world')
  res.send({ "msg": "all clear"})
})

api.get('/search/:thing', (req, res) => {

  let { thing } = req.params

  // config the auth
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (btoa(client_id + ':' + client_secret))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  }
  
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
  
      // save the token and use
      var token = body.access_token
      var options = {
        url: `https://api.spotify.com/v1/search?q=${thing}&type=album&market=US&limit=20`,
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      }
      request.get(options, function(error, response, body) {
        // print good-msg and send the result
        let ref = admin.database().ref().child('requests');
        ref.push().set({
          query: thing,
          result: body
        });
        console.log(`${chalk.green('all good! 😃 ')}`)
        res.send(body)
      })
    }
  })
}) 

module.exports = api