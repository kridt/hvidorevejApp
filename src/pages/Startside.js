import { navigate } from '@reach/router';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';

export default function Startside() {
    const { user, setUser } = useContext(UserContext)
    const [medarbejdere, setMedarbejdere] = useState({})


    useEffect(() => {

        axios.get("/medarbejdere.json")
        .then(response => response.data)
        .then((response) => setMedarbejdere(response))


    }, [setMedarbejdere])
    
    /* console.log(medarbejdere); */
    

   function login() {
        const userLogIn = document.getElementById('id').value;

        const user = medarbejdere?.filter(userid => userid.id === parseInt(userLogIn)).map(currentUser => console.log(currentUser)) 


        
        setUser(user);
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
