import { useEffect } from "react";
import React from 'react';
import { useParams } from 'react-router-dom';


const ActivateAccount = (props) => {

    const { confirmToken } = useParams();

    async function activateAccount(confirmToken) {
        const response = await fetch(`http://localhost:8081/account/register/confirm/${confirmToken}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        console.log(data);
        //TODO: forward to activation confirmed or homepage page
      }

      useEffect(() => {
        activateAccount(confirmToken);
      }, []);  

      return null;
}

export default ActivateAccount;