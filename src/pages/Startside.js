import { navigate } from '@reach/router';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';

export default function Startside() {
    const { setUser } = useContext(UserContext)
    const [medarbejdere, setMedarbejdere] = useState({})
    const [votedlist, setVotedlist] = useState([])



    useEffect(() => {

        axios.get("/medarbejdere.json")
        .then(response => response.data)
        .then((response) => setMedarbejdere(response))

        setUser(null)

    }, [setMedarbejdere])
    
    useEffect(() => {

        axios.get("https://foetex-hvidorevej-votes.herokuapp.com/api/v1/votes")
        .then(response => response.data)
        .then((response) => {
            const votedList = response.map(e => e.voter)


            setVotedlist(votedList)

        } )
         
    }, [setVotedlist])

      


    function login() {
        const inputValue =document.getElementById("id");
        if(inputValue.value.length !== 6 ) {
            alert("Du skal skrive dit lønnummer")
            return;
        } 
       

       const userLogIn = document.getElementById('id').value;

     
        medarbejdere?.filter(userid => userid.id === parseInt(userLogIn)).map(currentUser => setUser(currentUser)) 
        
        
        navigate("/votingsite")
   }
 
  return(
  <>

        <div id="logo">
            <img src="/img/fotex-logo.svg" alt="idk" />
            <div id="logoWhite"></div>
        </div>

        <div>
            <h1>Skriv dit lønnummer</h1>
            <br /> 
            <input type="number" id="id" name="id" />
            <br /> 
            <br /> 
            <br /> 
            <button onClick={() => login()}>Log ind</button>
        </div>


  </>

  ) 

}
