//
// Move the preICO+ICO1 tokens (30M) to the ICO contract so it can sell them
//
// $ node this.js <TOKSCA> <ICOSCA>

const Mod = require('./ICOLIB');
const web3 = Mod.getWeb3();

const tokcon = Mod.tokcon( process.argv[2] );
const ICOSCA = process.argv[3];

const tokcount = '30000000000000000000000000'; // 30e6 * 1e18 = 3e25

var cb;
web3.eth.getAccounts().then( (res) => {
  cb = res[5];

  console.log( 'Account:', cb, 'transfering ', tokcount, ' tokens to ', ICOSCA,
             ' from token contract: ', process.argv[2] );

  tokcon.methods.transfer( ICOSCA, tokcount ).send( {from: cb, gas: 100000} );
} );

