import { navigate } from '@reach/router';
import React, { useContext, useEffect } from 'react';
import { UserContext } from '../UserContext';

export default function Thanks() {
  
  const { user, setUser } = useContext(UserContext)
  
  
    useEffect(() => {
        setUser(null)
        document.body.style.zoom = "50%";
            window.scrollTo(60, 0);
    })


    setTimeout(() =>{
        document.location.reload() 
      if(user === null) {
        navigate("/")
        // eslint-disable-next-line
        location.reload();
    }
    }, 1500)
  
    return(
        <h1>Tak for din stemme</h1>
  )
}
