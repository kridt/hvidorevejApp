import { navigate } from '@reach/router';
import axios from 'axios';

import React, { useContext, useEffect, useState } from 'react';

import { UserContext } from '../UserContext';

export default function VotingSite() {
    const { user, setUser } = useContext(UserContext)
    const [wellcome, setWellcome] = useState("Hej!")
    const [medarbejdere, setMedarbejdere] = useState([])
    const [voterble, setVoterble] = useState([]);

    if(user === null) {
        navigate("/")
        // eslint-disable-next-line
        location.reload();
    }

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

    }, []);
    
/* console.log(medarbejder); */


    


    console.log(voterble);
 
 
    
    
    /* console.log(user); */
  return (
      <>

      <h1>{wellcome} {firstName}</h1>

      <form className="voteForm" >
		<input list="vote-datalist" id="vote" name="vote" placeholder="Søg efter medarbejder" />
        <br />
        <br />

		<datalist id="vote-datalist">
            {voterble?.map((coworkers)=>{
                const fullName = coworkers?.name;
                const splitName = fullName.split(',')
                const firstPartOfName = splitName[1];
                const lastName = splitName[0];
                const firstName = firstPartOfName.split(" ")[1];

                return(
                    <option key={coworkers.id} value={firstPartOfName + " " + lastName}>{ " " }</option>
                )

            })} 
			<option id="options" value=""></option> 
		</datalist>
        <br />
		<label htmlFor="message">Hvorfor skal han/hun vinde månedens medarbejder</label>
        <br />
        <br />
        <textarea name="message" id="message" cols="30" rows="10"></textarea>

		<br />
		<br />


		<input type="submit" value="Stem!" />
	</form>
      
      </>
  )
}
