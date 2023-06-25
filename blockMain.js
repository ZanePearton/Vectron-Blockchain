const SHA256 = require('crypto-js/sha256');

class Transaction{
    constructor(sourceAddress, destinationAddress, amount){
        this.sourceAddress = sourceAddress;
        this.destinationAddress = destinationAddress;
        this.amount = amount; 
    }
}

class Block{
    constructor(timestamp, transactions, previousHash = ''){
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined:" + this.hash);
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenBlock()];
        this.difficulty = 2; 
        this.pendingTransaction = [];
        this.miningReward = 100;
    }

    createGenBlock(){
        return new Block("06/01/2021", "Generation 0 Block", "00000")
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    minePendingTransaction(miningRewardAddress){
        let block = new Block(Date.now(), this.pendingTransaction);
        block.mineBlock(this.difficulty);
        console.log('block mined successfully.')
        this.chain.push(block);
        this.pendingTransaction = [new Transaction(null, miningRewardAddress, this.miningReward)];
    }

    createTransaction(transaction){
        this.pendingTransaction.push(transaction);
    }

    getBalanceofAddress(address){
        let balance = 0; 
        for (const block of this.chain){
            for (const trans of block.transactions){
                if(trans.sourceAddress === address){
                    balance -= trans.amount;
                }
                if(trans.destinationAddress === address){
                    balance += trans.amount;
                }
            }
        }
        return balance;
    }
    

    validateChainIntegrity(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i -1];
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

let byteCoin = new Blockchain();

byteCoin.createTransaction(new Transaction ('address1', 'address2', 100));
byteCoin.createTransaction(new Transaction ('address2', 'address1', 10));

console.log('\n starting miner....')
byteCoin.minePendingTransaction('z-wallet')
console.log('\n balance of z-wallet', byteCoin.getBalanceofAddress('z-wallet'));

console.log('\n starting miner..again..')
byteCoin.minePendingTransaction('z-wallet')
console.log('\n balance of z-wallet', byteCoin.getBalanceofAddress('z-wallet'));
