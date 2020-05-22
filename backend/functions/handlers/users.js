const {db}=require('../utils/admin')
const firebase=require('firebase')
const firebaseConfig=require("../utils/config")

firebase.initializeApp(firebaseConfig)
const {validateSignup}=require('../utils/validators')
exports.signup=(req,res)=>{
    const newUser={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        confirmPassword:req.body.confirmPassword,
        username:req.body.username
    }
    const {errors, valid}=validateSignup(newUser)

    if (!valid) {
        return res.status(400).json(errors)
    }

    let token,userId
    const noImg='no-img.png'
    db.collection("users").where("username",'==',newUser.username).get()
    .then(data=>{
        let tryUsername={}
        let errorsUsername=false
        data.forEach(doc=>{
            tryUsername=doc.data()
        })
        
        if(Object.keys(tryUsername).length>0){
            errorsUsername=true
        }
        return errorsUsername
    })
    .then(errorsUsername=>{
        if (errorsUsername) {
            return res.status(400).json({message:'O nome já esta em uso'})
        }else{
            db.doc(`/users/${newUser.email})`).get()
            .then(doc=>{
                if(doc.exists){
                    return res.status(400).json({message:'Email já em uso'})
                }else{
                    return firebase.auth().createUserWithEmailAndPassword(newUser.email,newUser.password)
                }
            })
            .then( (data)=>{
                userId=data.user.uid
                return data.user.getIdToken()
            })
            .then(idToken=>{
                token=idToken

                const userCredentials={
                    name:newUser.name,
                    email:newUser.email,
                    username:newUser.username,
                    imageUrl:`https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${noImg}?alt=media`,
                    createdAt:new Date().toISOString()
                }
                return db.doc(`/users/${newUser.email}`).set(userCredentials)
            })
            .then(()=>{
                return res.status(201).json({message:'Usuário criado',token})
            })
            .catch(err=>{
                console.error(err)
            })
        }
    })
}

exports.getTweets=(req,res)=>{
    db.collection("tweets").get()
    .then(data=>{
        let tweets=[]
        data.forEach(doc=>{
            tweets.push(doc.data())
        })
        return res.status(200).json(tweets)
    })
}

