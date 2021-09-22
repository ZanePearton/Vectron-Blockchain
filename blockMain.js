
// import cyrpto-js 

const SHA256 = require ('crypto-js/sha256');

//-------------CREATE BLOCKCHAIN / BLOCK CLASSES ----------------------------------

//class Block

class Transaction{
    constructor(sourceAddress, destinationAddress, amount){
        this.sourceAddress = sourceAddress;
        this.destinationAddress = destinationAddress;
        this.amount = amount; 
    }
}


class Block{
    
    // properties of block
    // index = where block is on chain 
    // time = time 
    // transactions = information in block (With currency? amount / sender reciever)
    // previous hash = maintain the integrity of current block 
    constructor( timestamp, transactions, previousHash = '' ){
        //define
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
       
        // new property for hash set to empty
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    // calculate the hashfunction of this block = thus identify the block on the blpockchain
    calculateHash(){
        //collect input cast to sting
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0,difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
           this.hash = this.calculateHash();
        }
        console.log("Block mined:" + this.hash);
    }
    // block class end
}

// class Blockchain
class Blockchain{
    constructor(){
        //array of block
        this.chain = [this.createGenBlock()];
        this.difficulty =2; 
        this.pendingTransaction = [];
        this.miningReward = 100;
    }

    //Method : creatGenBlock = first block on blockchain = gensis block
    createGenBlock(){
        // block number/date/random transactions/ pervious hash 
        return new Block("06/01/2021", "Generation 0 Block", "00000")
    }

    //Method:get most current block 
    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    minePendingTransaction(miningRewardAddress){

        let block = new Block(Date.now(), this.pendingTransaction);
        block.mineBlock(this.difficulty);

        console.log('block mined successfully.')

        this.chain.push(block);

        this.pendingTransaction[
            new Transaction(null,miningRewardAddress, this.miningReward)
        ];
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
    

    // check Integrity of the hash
    
    validateChainIntegrity(){
        // incrementally loop over the full block chain start a 1 as 0 is genisis block
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i -1];

            //hashcheck
            // check if hash of current block is still valid if not= chain is invalid 
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            //check if the block point to correct previous block
            if (currentBlock.previousHash !== previousBlock.hash){
                return false;
            }

            // if no false then return true
            return true;
        }
    }
}

//-------------TEST PRINT BLOCK CHIAN WITH NEW BLOCKS ----------------------------------
// create coin -- add to blockchain
let byteCoin = new Blockchain();

byteCoin.createTransaction(new Transaction ('address1', 'address2', 100));
byteCoin.createTransaction(new Transaction ('address2', 'address1', 10));

console.log('\n starting miner....')
byteCoin.minePendingTransaction('z-wallet')
console.log('\n balance of z-wallet', byteCoin.getBalanceofAddress('z-wallet'));

console.log('\n starting miner..again..')
byteCoin.minePendingTransaction('z-wallet')
console.log('\n balance of z-wallet', byteCoin.getBalanceofAddress('z-wallet'));