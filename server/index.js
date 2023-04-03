const { ethers } = require("ethers");
const io = require('socket.io')(5000, {
    cors:{
        origin:["http://localhost:3000"]
    }    
})    

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


var provider, signer, contract;

async function createConnection(){
    provider = new ethers.providers.JsonRpcProvider("http://localhost:8545"); //hardhat rpc url
    signer = provider.getSigner();
    contract = new ethers.Contract("", abi, signer);
}    



io.on('connection', socket =>{
    console.log(`Socket ${socket.id} connected`);
    createConnection();
    
    socket.on('disconnect', ()=>{
        console.log(`Socket ${socket.id} disconnected blah`);
    })    

    socket.on('result', async(obj)=>{
        console.log(obj.account, obj.score);
        await contract.LeaderBoard(obj.account, obj.score);
    })    
})    

