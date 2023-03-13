import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Tournament.css";
const { ethers } = require("ethers");

function Tournament(props) {
  const navigate = useNavigate();

  const [isPlayer, setisPlayer] = useState(false);

  //------------------- PROVIDER SIGNER CONTRACT PROPS -------------------
  //Remeber  Provider will give the issue of same address by msg.sender in solidity metamask uk 
  const { Provider, Signer, Contract } = props; //destructring props (i.e the properties inside it are extracted directly)
  //printing to ensure that correct values received
  console.log(Provider, Signer, Contract);

  //------------------- PROVIDER SIGNER CONTRACT PROPS -------------------

  async function enterLobby() {
    let flag = false;
    try {
      const Signer_cont = await Contract.connect(Signer);
      console.log(Signer_cont);

      const options = {
        gasLimit: 1000000,
        value: ethers.utils.parseEther("4"),
      };
      await Signer_cont.AddUser(options);
    } catch (err) {
      console.log(err);
    }
  }

  function exitLobby() {
    setisPlayer(false);
  }

  useEffect(() => {         
    async function isPlayer() {
    const Signer_cont = await Contract.connect(Signer);
      if (await Signer_cont.userExists()) {
        setisPlayer(true);
      }
    }
    isPlayer();
  }, [isPlayer]);

  //------------------- DUmmmy functions -------------------
  async function LobbyPage() {
    navigate("/lobby");
  }

  return (
    <div>
      <h1>Tournament</h1>
      <hr />

      <h2>Upcoming Tournaments</h2>

      <div className="Tournaments">
        <div className="Tournament">
          <p>Tournament-I</p>
          {isPlayer ? (
            <button onClick={LobbyPage}>Lobby</button>
          ) : (
            <button onClick={enterLobby}>Register</button>
          )}
          <button onClick={exitLobby}>Exit</button>
        </div>
      </div>
    </div>
  );
}

export default Tournament;
