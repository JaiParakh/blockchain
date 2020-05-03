var express = require('express')
const uuid = require('uuid').v1;
const bodyparser = require('body-parser');
const blockchain = require('./Blockchain');

const bitcoin = new blockchain();

const nodeAddress = uuid().split('-').join('');

var app = express() 
app.use(bodyparser.json())

app.get('/blockchain', function(req,res){
    res.send(bitcoin);
});
 
app.post('/transaction', function(req,res){
    console.log(req.body);
    const blockindex = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recepeint);
    res.json({note : `Transaction will be added in block ${blockindex}.`});

});

app.get('/mine', function(req,res){
    const lastBlock = bitcoin.getLastBlock();
    const previousBlockHash= lastBlock['hash'];
    
    const currentBlockData = {
        transactions : bitcoin.pendingTransactions,
        index: lastBlock['index'] + 1
    };
    
    const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
    const blockHash = bitcoin.hashBlock(previousBlockHash,currentBlockData,nonce);
    
    bitcoin.createNewTransaction(12.5,"00",nodeAddress);
    
    const newBlock = bitcoin.createNewBlock(nonce,previousBlockHash,blockHash);
    
    res.json({
        note: "new block mined successfullly",
        block: newBlock
    });

});

app.listen(8080 , function(){
    console.log('listening on port 8080...');
});
