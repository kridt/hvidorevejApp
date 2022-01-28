import { navigate } from '@reach/router';

import React, { useContext, useState } from 'react';

import { UserContext } from '../UserContext';

export default function VotingSite() {
    const { user } = useContext(UserContext)
    
    console.log(user);

    if(user === null) {
        navigate("/")
        alert("Der skete en fejl, log venligst ind igen")
    }
  return (
      <>

      <h1>logged in as {user}</h1>
      
      </>
  )
}
