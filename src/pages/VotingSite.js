import { navigate } from '@reach/router';
import axios from 'axios';

import React, { useContext, useEffect, useState } from 'react';
import AlreadyVotedView from '../components/AlreadyVotedView';

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
            const votedList = response.find(e => e.voter === user.id)

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
        
        
        const voteData = new FormData()
        voteData.vote = vote;
        voteData.voter = voter;
        voteData.message = message;

        console.log(voteData);

         axios.post("https://foetex-hvidorevej-votes.herokuapp.com/api/v1/votes", voteData, null)
 
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

                return;

            })
        })
    }

    return (
        <>

        {alreadyVoted ? ( <AlreadyVotedView /> ) : ( 

<>
            
            <h1>Hej! {firstName}</h1>

      <form onSubmit={(e)=> vote(e)}>
		<input list="vote-datalist" id="vote" name="vote" placeholder="Søg efter medarbejder" />
       

		<datalist id="vote-datalist">
        
        
            {voterble?.map((coworkers)=>{
                const fullName = coworkers?.name;
                const splitName = fullName.split(',')
                const firstPartOfName = splitName[1];
                const lastName = splitName[0];
                
                return(
                    <option key={coworkers.id} id={coworkers.id} value={firstPartOfName + " " + lastName}></option>
                )
                
            })} 
			<option id="options" value=""></option> 
		</datalist>
        <br />
        <br />
		<label htmlFor="message">Hvorfor skal han/hun vinde månedens medarbejder</label>
        <br />
        <br />
        <textarea name="message" id="message" cols="30" rows="10"></textarea>
        <br />
        <br />

		<input type="submit" value="Stem!" />
	</form>
      
      {/* <h1>Delete</h1>
      <form onSubmit={(voteId) => deleteVote(voteId)}>
        <input name="voteId" type="text" id="voteId"/>
        <input type="submit" value="Slet" />
      </form> */}


    {alfa ? (
        <>
            <button onClick={(e) => deleteEverything(e)}>Fjern alle stemmer</button>
        </>
    ) : ( 
        <h1>beta</h1>
     ) }      

</>
)}
      </>
  )
}
