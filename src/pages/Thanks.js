import { navigate } from '@reach/router';
import React from 'react';

export default function Thanks() {
  
    setTimeout(() =>{
        navigate("/")
    }, 1500)
  
    return(
        <h1>Tak for din stemme</h1>
  )
}
