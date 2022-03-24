import { navigate } from '@reach/router';
import axios from 'axios';
import dateFormat from "dateformat";
import React, { useContext, useEffect, useState } from 'react';
import AlreadyVotedView from '../components/AlreadyVotedView';
import NotVotedYet from '../components/NotVotedYet';

import { UserContext } from '../UserContext';

export default function VotingSite() {
    const { user } = useContext(UserContext)
    const [alreadyVoted, setAlreadyVoted] = useState(false);


    const time = new Date();
    if(user === null) {
        navigate("/")
        // eslint-disable-next-line
        location.reload();
    } else{        
        document.body.style.zoom = "50%";
        window.scrollTo(60, 0);
    }

    
        document.body.style.zoom = "50%";
        window.scrollTo(60, 0);

    
    
    useEffect(() => {
        const postThingy = `${JSON.stringify(user)} at ${dateFormat(time, "dddd, d mmmm, h:MM:ss TT")} on a ${navigator.userAgent}`

        const logData = {}
        logData.visit = postThingy

        console.log(logData);
        
        axios.post(`https://foetex-hvidorevej-votes.herokuapp.com/api/v1/visits`, logData)
        .then(response => console.log(response))

    })
     
    
    useEffect(() => {

        axios.get("https://foetex-hvidorevej-votes.herokuapp.com/api/v1/votes")
        .then(response => response.data)
        .then((data) => {

            const voteList = data.map(users => users.voter)
            var test = []
              
            voteList.forEach(user => {
                test.push(parseInt(user))
            })
            

            test.forEach(vote => {
                if (vote === user.id) {
                    console.log("bad");
                    setAlreadyVoted(true)
                    return;
                } 
            }) 
 
            /*i f(test === user.id) {  
                console.log("Good");
            } else{
                console.log("Bad");
            } */

           /*  if (user.id === parseInt(voteList)) {
                console.log("User has voted");
                setAlreadyVoted(true)
            } else{
                console.log("user not voted yet");
                setAlreadyVoted(false)
            } */
 

            /* const votedList = data.map(e => e.voter === user.id) 
            
            console.log(votedList);
            console.log(user.id);
            
            if (user.id = votedList) {
                setAlreadyVoted(true);
            } else {
                setAlreadyVoted(false); 
            }  
            
            */
 

        } )
         
    }, [setAlreadyVoted, user])
    

    return (
        <>

        {alreadyVoted ? ( <AlreadyVotedView /> ) : ( <NotVotedYet /> )}
      </>
  )
}
