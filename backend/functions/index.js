const functions = require('firebase-functions');
const express=require('express')

const app=express()

const {getTweets}=require('./handlers/users')

app.get('/tweets', getTweets)
exports.api=functions.region("us-east1").https.onRequest(app)

