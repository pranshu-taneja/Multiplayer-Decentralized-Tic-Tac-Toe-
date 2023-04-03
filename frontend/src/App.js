import "./App.css";
import Homepage from "./components/Homepage";
import About from "./components/About";
import Tournament from "./components/Tournament";
import Lobby from "./components/Lobby";
import Gameplay from './components/Gameplay';
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

const { ethers } = require("ethers");

let abi = [
	{
		"inputs": [],
		"name": "AddUser",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "FundWinner",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "usr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "scr",
				"type": "uint256"
			}
		],
		"name": "LeaderBoard",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "PlayersReq",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "userExists",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

function App() {
  //------------------- Connect the metamask and setup its variables (Provider, Signer, Contract) -------------------
  const [Provider, setProvider] = useState();
  const [Signer, setSigner] = useState();
  const [Contract, setContract] = useState();

  const connect_metamask = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    setProvider(provider);

    const signer = provider.getSigner();
    setSigner(signer);

    const contract = new ethers.Contract(
      "",
      abi,
      provider
    );
    setContract(contract);
  };

  useEffect(() => {
    connect_metamask();
  }, []);
  //------------------- Connect the metamask and setup its variables (Provider, Signer, Contract) -------------------

  return (
    <div>
      {/* //------------------- Handling the Routing of React Frontend ------------------- */}
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/About">About</Link>
            </li>
            <li>
              <Link to="/Tournament">Tournament</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" exact element={<Homepage />} />
          <Route path="/about" exact element={<About />} />
          <Route
            path="/tournament"
            exact
            element={
              <Tournament Provider={Provider} Signer={Signer} Contract={Contract} />
            }
          />
          <Route
            path="/Lobby"
            exact
            element={
              <Lobby Provider={Provider} Signer={Signer} Contract={Contract} />
            }
          />
          <Route path="/Gameplay" exact element={<Gameplay />}></Route>
        </Routes>
      </BrowserRouter>

      {/* //------------------- Handling the Routing of React Frontend ------------------- */}
    </div>
  );
}

export default App;
