import { navigate } from '@reach/router';
import axios from 'axios';

import React, { useContext, useEffect, useState } from 'react';
import AlreadyVotedView from '../components/AlreadyVotedView';
import NotVotedYet from '../components/NotVotedYet';

import { UserContext } from '../UserContext';

export default function VotingSite() {
    const { user } = useContext(UserContext)
    const [medarbejdere, setMedarbejdere] = useState([])
    const [voterble, setVoterble] = useState([]);
    const [alreadyVoted, setAlreadyVoted] = useState(false);
    const [alfa, setAlfa] = useState(false)

    if(user === null) {
        navigate("/")
        // eslint-disable-next-line
        location.reload();
    }
useEffect(() => {

    if(user.id === 286828){
        setAlfa(true)
    } else {
        setAlfa(false)
    }
}, [user])


    const fullName = user?.name;
    const splitName = fullName.split(',')
    const firstPartOfName = splitName[1];
    const firstName = firstPartOfName.split(" ")[1]

    
    useEffect(()=> {
        
        axios.get('/medarbejdere.json')
        .then(response => setMedarbejdere(response.data))
    }, [])
    
    useEffect(()=> {
        
        setVoterble(medarbejdere.filter((e)=> e.leader === false))
        
    }, [medarbejdere, setMedarbejdere]); 
    
    /* console.log(medarbejder); */
    
    
    
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
     

    
    /* function deleteVote(voteId) {
        voteId.preventDefault()

        console.log(voteId.target.voteId.value);

        axios.delete(`https://foetex-hvidorevej-votes.herokuapp.com/api/v1/votes/${voteId.target.voteId.value}`)

    } */

    
    function vote(e) {
        e.preventDefault()
        const vote = e.target.vote.value;
        const message = e.target.message.value;
        const voter = JSON.stringify(user.id);
        
        
        const voteData = {}
        voteData.vote = vote;
        voteData.voter = voter;
        voteData.message = message;

        console.log(voteData);

        axios.post("https://foetex-hvidorevej-votes.herokuapp.com/api/v1/votes", voteData, null)

        


         /* axios.post("https://foetex-hvidorevej-votes.herokuapp.com/api/v1/votes", voteData, null) */
 
          /* fetch("https://foetex-hvidorevej-votes.herokuapp.com/api/v1/votes", {
             method: "POST",
             body: voteData
         }).then(response => console.log(response)) */

        navigate("/thanks") 
    }
    
    /* console.log(user); */

    function deleteEverything(e){
        e.preventDefault();

        axios.get("https://foetex-hvidorevej-votes.herokuapp.com/api/v1/votes")
        .then(response => response.data)
        .then(data => {
            data?.map((votes) =>{
                
                axios.delete(`https://foetex-hvidorevej-votes.herokuapp.com/api/v1/votes/${votes._id}`)

                return null;

            })
        })
    }

    return (
        <>

        {alreadyVoted ? ( <AlreadyVotedView /> ) : ( <NotVotedYet /> )}
      </>
  )
}
