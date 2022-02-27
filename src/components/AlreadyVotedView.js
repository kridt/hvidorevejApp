import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../UserContext'

export default function AlreadyVotedView() {
    const { user, setUser } = useContext(UserContext) 
    const [ votedFor, setVotedFor ] = useState({})
    

    useEffect(()=>{

        axios.get("https://foetex-hvidorevej-votes.herokuapp.com/api/v1/votes")
        .then(response => {



            console.log(response.data);

        })
        
        
    }, [setVotedFor])

  return (
    <>
    <h1>Du har allerede stemt, vil du slette din stemme</h1>
    </>
  )
}
