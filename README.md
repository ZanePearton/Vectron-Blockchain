# Vectron: A Simple JavaScript Blockchain Implementation

This project is a simple implementation of a Blockchain in JavaScript. It includes all the basic functionalities of a blockchain system, such as creating transactions, mining new blocks, and validating the blockchain.

## Prerequisites

To run this project, you will need to have `Node.js` and `npm` (node package manager) installed on your computer. 

You will also need to install the Crypto-js library for the SHA-256 hash function:
```
npm install crypto-js
```

## How to Run

To run this project, save the following script as `vectron.js` in your project folder, then simply run the following command in your terminal:
```
node vectron.js
```

## Features

- **Transaction:** This class represents a transaction in the blockchain. A transaction contains a source address (sender), a destination address (receiver), and an amount of coin transferred.

- **Block:** This class represents a block in the blockchain. A block contains a timestamp, an array of transactions, a previous hash, a hash, and a nonce.

- **Blockchain:** This class represents a simple blockchain. It contains an array of blocks, difficulty for mining, an array of pending transactions, and a mining reward. It provides methods to create a new block (genesis block), get the latest block, mine pending transactions, create new transactions, get the balance of an address, and validate the integrity of the blockchain.

## Testing

This project includes a small testing script at the end of the `vectron.js` file. This script creates a new Blockchain (vectron), creates and processes some transactions, and then checks the balance of the 'z-wallet' address after the mining process.

##Author

[Zane Pearton](https://www.linkedin.com/in/zane-pearton/)

## License

This project is open-sourced under the [MIT license](http://opensource.org/licenses/MIT).

## Disclaimer

This is a simple blockchain implementation for educational purposes only. It lacks many features and security measures necessary for a real-world blockchain system and should not be used for any production purposes.
