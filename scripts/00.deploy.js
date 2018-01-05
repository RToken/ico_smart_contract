var Abi = require('ethereumjs-abi');
var Mod = require('./ICOLIB');
const web3 = Mod.getWeb3();
const abi = Mod.getABI();
const binary = Mod.getBinary();
const contract = new web3.eth.Contract(abi);

// testrpc
const STUBTOK='0xfD762fa044FDE610CE951Ef8f38d562D215f4b9d'
const STUBTRS='0x0'

// rinkeby
const RINKTOK='0x5171E06007169f7Cf092afdD68D166f814b44A18'
const RINKTRS='0xD451E4D414E16BA80D3BAAA3F261533Cd55bF1b2'
const RINKICO='0x79eE56a0E99657D1018Aa2258740b0378Ca1ef38'

// mainnet
const MAINTOK='0x74EA2438157d8Bb836cAD8419be38f7Bba799D30'
const MAINTRS='0x9241b4C67b6CdF9B99F5f50dE21283D0441efF75'
const MAINICO='0x9F99793F908C58a99f44025c45dd72f2f92FC469'

const DEC26='1514160000'
const JAN7='1515283200'
const DUR='3888000' // 45 days in seconds (45 * 24 * 60 * 60)
const TOKPERETH='1333333333333333' // 1 TOK/USD / 750 ETH/USD
                                   // = 1333333333333333 TOK/ETH

var START=JAN7
var TOKCON=MAINTOK
var TRSCON=MAINTRS

var cb;
web3.eth.getAccounts().then( (res) => {
  cb = res[5];

  contract.deploy( {data: binary,
                    arguments: [TOKCON,
                                TRSCON,
                                START,
                                DUR,
                                TOKPERETH
                               ]} )
          .send( {from: cb, gas: 1000000}, (err,res) =>
          {
            if (err) console.log(err);
            if (res) console.log(res);
          } )
          .then( (receipt) => {
            console.log( 'SCA: ', receipt.options.address );
          } );
} );


var ptypes = [ "address", "address", "uint256", "uint256", "uint256" ];
var pvals = [ TOKCON,
              TRSCON,
              START,
              DUR,
              TOKPERETH ];

var argsenc = Abi.rawEncode( ptypes, pvals );

console.log( "args:\n", argsenc.toString('hex') );

