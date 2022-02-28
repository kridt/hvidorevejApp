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
    }

    useEffect(() => {
        window.scrollTo(0,42)
    })

    
    useEffect(()=> {
        
        axios.get('/medarbejdere.json')
        .then(response => setMedarbejdere(response.data))
    }, [])
    
    console.log(medarbejdere);
    
    
    
    useEffect(() => {

        axios.get("https://foetex-hvidorevej-votes.herokuapp.com/api/v1/votes")
        .then(response => response.data)
        .then((response) => {
            const votedList = response.find(e => e.voter = user.id)

            console.log(votedList);

            if (votedList !== undefined) {
                setAlreadyVoted(true);
            } else {
                setAlreadyVoted(false); 
            }  

 

        } )
         
    }, [setAlreadyVoted, user])
    

    return (
        <>

        {alreadyVoted ? ( <AlreadyVotedView /> ) : ( <NotVotedYet /> )}
      </>
  )
}
