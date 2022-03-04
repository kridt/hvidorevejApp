import { navigate } from '@reach/router';
import axios from 'axios';

import React, { useContext, useEffect, useState } from 'react';
import AlreadyVotedView from '../components/AlreadyVotedView';
import NotVotedYet from '../components/NotVotedYet';

import { UserContext } from '../UserContext';

export default function VotingSite() {
    const { user } = useContext(UserContext)
    const [medarbejdere, setMedarbejdere] = useState([])
    const [alreadyVoted, setAlreadyVoted] = useState(false);

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


    
    useEffect(()=> {
        
        axios.get('/medarbejdere.json')
        .then(response => setMedarbejdere(response.data))
    }, [])
    
    
    
    
    
    useEffect(() => {

        axios.get("https://foetex-hvidorevej-votes.herokuapp.com/api/v1/votes")
        .then(response => response.data)
        .then((data) => {
            console.log(data);

            const voteList = data.map(users => users.voter)
            console.log(user.id);

            

            if (user.id === voteList) {
                console.log("user not voted yet");
            } else{
                console.log("User has voted");
            }

            console.log(voteList);

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
