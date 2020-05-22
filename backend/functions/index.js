const functions = require('firebase-functions');
const express=require('express')

const app=express()

const {getTweets,signup}=require('./handlers/users')

app.get('/tweets', getTweets)
app.post('/signup', signup)
exports.api=functions.region("us-east1").https.onRequest(app)

