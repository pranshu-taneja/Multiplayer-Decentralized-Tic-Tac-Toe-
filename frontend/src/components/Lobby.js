import React, { useEffect, useState } from 'react'
import {useNavigate } from "react-router-dom";
const { ethers } = require("ethers");


function Lobby(props) {
  
  const [ReadyToPlay, setReadyToPlay] = useState(10)
  const { Provider, Signer, Contract } = props;
  const navigate = useNavigate();

  useEffect(() => {
    async function ReadyForPlaying(){  
      const Signer_Cont = await Contract.connect(Signer);
      let val = await Signer_Cont.PlayersReq(); 
      val = Number(val.toString())
      setReadyToPlay(val)
    }

    ReadyForPlaying();
    const intervalId = setInterval(ReadyForPlaying, 5000);

    return () => clearInterval(intervalId);
  }, [Contract, Signer])


  useEffect(() => {
    if(ReadyToPlay == 0){
      navigate('/Gameplay')
    }
  }, [ReadyToPlay])
  

  return (
    <div>
        <h1>Lobby Page</h1>

        <p>Player Required: {ReadyToPlay}</p>
    </div>
  )
}

export default Lobby