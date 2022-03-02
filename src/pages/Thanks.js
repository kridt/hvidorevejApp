import { navigate } from '@reach/router';
import React, { useEffect } from 'react';

export default function Thanks() {
  
    useEffect(() => {

        document.body.style.zoom = "50%";
            window.scrollTo(60, 0);
    })


    setTimeout(() =>{
        document.location.reload() 
    }, 1500)
  
    return(
        <h1>Tak for din stemme</h1>
  )
}
