
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://project-albums.firebaseio.com"
});

var firebase = (thing, body) => {
  // save the result on firebase
  let ref = admin.database().ref().child('requests');
  ref.push().set({
    query: thing,
    result: body
  });
}

module.exports = firebase
