const sha256 = require('sha256');

class Blockchain{
    constructor(){
        this.chain = [];
        this.pendingTransactions = [];
        this.createNewBlock(100,'0','0');    
    }

    createNewBlock(nonce, previousBlockHash, Hash){
        const newBlock = {
          index: this.chain.length + 1,
          timestamp: Date.now(),
          transactions: this.pendingTransactions,
          nonce : nonce,
          hash: Hash,
          previousBlockHash: previousBlockHash  
        };
        this.pendingTransactions = [];
        //this line wll puch the new block to chain
        this.chain.push(newBlock);
        
        return newBlock;
    }

    getLastBlock(){
        return this.chain[this.chain.length - 1];
    }

    createNewTransaction(amount, sender, recepeint){
        const newTransaction = {
        amount: amount,
        sender: sender,
        recepeint: recepeint
        };
        //this line will add the transaction to the newtransactions array
        this.pendingTransactions.push(newTransaction);
        //this line will return the block number in which this new transaction will get recorded
        return this.getLastBlock()['index']+1;
    }

    hashBlock(previousBlockHash, currentBlockData, nonce){
        const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
        const hash = sha256(dataAsString);
        return hash;
    }

    proofOfWork(previousBlockHash, currentBlockData){
        let nonce =0;
        let hash = this.hashBlock(previousBlockHash,currentBlockData,nonce);
        console.log(hash);
        while(hash.substring(0,4) !== '0000'){
            nonce++;
            hash= this.hashBlock(previousBlockHash,currentBlockData, nonce);
            //console.log(hash);
        }
        return nonce;
    }
}

module.exports = Blockchain;

/*
function Blockchain(){
    this.chain = [];
    this.pendingTransactions = [];
    this.createNewBlock(100,'0','0');
}

Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, Hash){
    const newBlock = {
      index: this.chain.length + 1,
      timestamp: Date.now(),
      transactions: this.pendingTransactions,
      nonce : nonce,
      hash: Hash,
      previousBlockHash: previousBlockHash  
    };
    this.pendingTransactions = [];
    //this line wll puch the new block to chain
    this.chain.push(newBlock);
    
    return newBlock;
}

Blockchain.prototype.getLastBlock = function(){
    return this.chain[this.chain.length - 1];
}

Blockchain.prototype.createNewTransaction = function(amount, sender, recepeint){
    const newTransaction = {
    amount: amount,
    sender: sender,
    recepeint: recepeint
    };
    //this line will add the transaction to the newtransactions array
    this.pendingTransactions.push(newTransaction);
    //this line will return the block number in which this new transaction will get recorded
    return this.getLastBlock()['index']+1;
}

Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce){
    const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    const hash = sha256(dataAsString);
    return hash;
}
    
Blockchain.prototype.proofOfWork = function(previousBlockHash, currentBlockData){
    let nonce =0;
    let hash = this.hashBlock(previousBlockHash,currentBlockData,nonce);
    console.log(hash);
    while(hash.substring(0,4) !== '0000'){
        nonce++;
        hash= this.hashBlock(previousBlockHash,currentBlockData, nonce);
        //console.log(hash);
    }
    return nonce;
}


*/  