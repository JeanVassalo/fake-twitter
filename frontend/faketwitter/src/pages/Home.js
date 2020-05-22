import React, {useEffect, useState} from 'react';
import Axios from 'axios'

export default function Home() {
    const [tweets,setTweets]=useState([])
    useEffect(()=>{
        Axios.get('/tweets')
        .then(res=>{
            setTweets(res.data)
        })
        .catch(err=>console.error(err));
        
    },[])

    return (
        <div>
            <h1>Hi</h1>
            {tweets.map(tweet=>(
                <p key={Math.random()*10000}>{tweet.body}</p>
            ))}
        </div>
    )
}