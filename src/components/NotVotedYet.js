import { navigate } from '@reach/router';
import axios from 'axios';
import { UserContext } from '../UserContext';
import React, { useContext, useEffect, useState } from 'react';


export default function NotVotedYet() {
    const { user } = useContext(UserContext)
    const [medarbejdere, setMedarbejdere] = useState([])
    const [voterble, setVoterble] = useState([]);
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




    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        
        return array;
    }
    shuffle(voterble)
    
    /* console.log(medarbejder); */
    
    
    
    /* useEffect(() => {

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
         
    }, [setAlreadyVoted, user]) */
     

    
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


        axios.post("https://foetex-hvidorevej-votes.herokuapp.com/api/v1/votes", voteData, null)
        


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
  
    function mailMessage(e){
        e.preventDefault();
        navigate("/winner")
    }
  
    return (
        <>
            
        <h1>Hej! { firstName }</h1>

  <form onSubmit={(e)=> vote(e)}>
    <input list="vote-datalist" id="vote" name="vote" placeholder="Søg efter medarbejder" />
   

    <datalist id="vote-datalist">
    
    
        {voterble.map((coworkers)=>{
            const fullName = coworkers?.name;
            const splitName = fullName.split(',')
            const firstPartOfName = splitName[1];
            const lastName = splitName[0];
            
            return(
                <option key={coworkers.id} id={coworkers.id} value={coworkers.afdeling + firstPartOfName + " " + lastName}></option>
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
        <br />
        <br />
        <br />
        {/* <button onClick={(e) => mailMessage(e)}>Send mail med månedens medarbejder</button> */}
    </>
) : ( 
    <h1></h1>
 ) }      

</>
  )
}
