
var admin = require("firebase-admin");

var serviceAccount = require("../twitter-af76b-firebase-adminsdk-c6q9b-e09e93c538.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://twitter-af76b.firebaseio.com"
});

const db = admin.firestore()

module.exports={admin,db}

