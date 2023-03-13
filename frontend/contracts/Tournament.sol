// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.6;


struct DS{
    address[] users;
    mapping(address=>uint8) exist;
    mapping(address=>uint256)scores;
    address winner;
}


contract Tournament{
    DS t1;
    
    function AddUser() payable public{
        require(msg.value >= 4 wei && t1.exist[msg.sender] == 0 && t1.users.length < 2, "Invalid User");
        t1.users.push(msg.sender);
        t1.exist[msg.sender]++;
    }

    function userExists() view public returns(bool){
        return(t1.exist[msg.sender] == 1);
    }

    function FundWinner() public payable{
        uint max = 0;
        for(uint i=0; i< t1.users.length; i++){
            if(max < t1.scores[t1.users[i]]){
                max = t1.scores[t1.users[i]];
                t1.winner = t1.users[i];
            }
        }
        payable(t1.winner).transfer(2 ether);
    }

    function LeaderBoard(address usr, uint scr) public{
        t1.scores[usr] = scr;
    }
    
    function PlayersReq() view public returns(uint256){
        return(2-t1.users.length);
    }
}



