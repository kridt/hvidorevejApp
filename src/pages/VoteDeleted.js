import { navigate } from '@reach/router'
import React from 'react'

export default function VoteDeleted() {
  
    setTimeout(() =>{

        navigate("/")

    }, 1500)
  
    return <h1>Din stemme er hermed slettet</h1>
}
