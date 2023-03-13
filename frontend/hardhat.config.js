require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
    },
    // ganache: {
    //   url: "HTTP://127.0.0.1:7545", // replace with your ganache URL
    //   chainId: 1337
    // },
  },
  paths: {
    artifacts: "./src/artifacts",
  }
};
