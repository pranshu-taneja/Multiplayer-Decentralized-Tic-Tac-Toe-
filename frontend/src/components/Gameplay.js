import React from 'react'
import io from 'socket.io-client'
import { useEffect, useState } from 'react'

const socket = io('http://localhost:5000');

function Gameplay() {
  
  useEffect(() => {
    socket.on('connect', () => {
      console.log(`Connected to socket at ${socket.id}`);
    })
    
    socket.on('disconnect', () => {
      console.log(`Disconnected from socket ${socket.id}`);
    })
  }, [])
  

  async function emit(){
    //get the address of metamask
    const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
    console.log(account[0], document.getElementById('score').value);
    socket.emit('result', {account:account[0], score:document.getElementById('score').value});
  }


  return (
    <div>
      <h1>Gameplay</h1>
        <input id='score'></input>
        <button onClick={emit}>EMIT</button>
    </div>
  )
}

export default Gameplay