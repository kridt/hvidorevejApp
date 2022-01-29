import { navigate } from '@reach/router';

import React, { useContext, useState } from 'react';

import { UserContext } from '../UserContext';

export default function VotingSite() {
    const { user, setUser } = useContext(UserContext)
    const [wellcome, setWellcome] = useState("Hej!")





    if(user === null) {
        navigate("/")
        // eslint-disable-next-line
        location.reload();
    }
    
    
    console.log(user);
  return (
      <>

      <h1>{wellcome} {user.name}</h1>
      
      </>
  )
}
