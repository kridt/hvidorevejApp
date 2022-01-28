import { navigate } from '@reach/router';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useEffect } from 'react/cjs/react.production.min';
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

      <h1>logged in as {user.name}</h1>
      
      </>
  )
}
