import { navigate } from '@reach/router';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../UserContext'

export default function AlreadyVotedView() {
    const { user, setUser } = useContext(UserContext) 
    const [ votedFor, setVotedFor ] = useState({})
    

    useEffect(()=>{

        axios.get("https://foetex-hvidorevej-votes.herokuapp.com/api/v1/votes")
        .then(response => {
            const currentVote = response?.data.find(vote => parseInt(vote.voter) === user.id)

            setVotedFor(currentVote)

        }) 
        
        
    }, [setVotedFor, user])


    function deleteMyVote(vote){
      vote.preventDefault()

      axios.delete(`https://foetex-hvidorevej-votes.herokuapp.com/api/v1/votes/${votedFor._id}`)

      navigate("/voteDeleted")

    } 

    function goBack(){
      setUser(null)
      
    }

  return (
    <>
    <h1>Du har allerede stemt</h1>
    <h2>Din nuværende stemme:</h2>
    <h3>{votedFor?.vote}</h3>
    <h3>{votedFor?.message}</h3>
    <br />
    <br />
    <br />
    <form onSubmit={(vote) => deleteMyVote(vote)}>
      <label>Vil du slette din stemme?</label>
      <br />
      <br />
      <input type="submit" value="Slet"/>
    </form>

    <br />
    <br />
    <br />
    <br />
    <button onClick={() => goBack()}>Tilbage</button>

    </>
  )
}
