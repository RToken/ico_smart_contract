// ===========================================================================
// functions used by other scripts
// ===========================================================================

const fs = require('fs');
const Web3_ = require('web3');
const web3_ =
  new Web3_(new Web3_.providers.HttpProvider("http://localhost:8545"));

exports.getWeb3 = function() { return web3_; }

// ICO =======================================================================

const ICODIR='../build/'

exports.getABI = function() {
  var contents = fs.readFileSync(ICODIR + 'RTKICO_sol_RTKICO.abi').toString();
  return JSON.parse(contents);
}

exports.getBinary = function() {
  var binary = fs.readFileSync(ICODIR + 'RTKICO_sol_RTKICO.bin').toString();
  if (!binary.startsWith('0x')) binary = '0x' + binary;
  return binary;
}

exports.icocon = function(sca) {
  return new web3_.eth.Contract( exports.getABI(), sca );
}

// TREASURY ==================================================================

const TRSDIR='../../../treasury/build/'

exports.treasuryABI = function() {
  var contents =
    fs.readFileSync(TRSDIR + 'Treasury_sol_Treasury.abi').toString();
  return JSON.parse(contents);
}

exports.treasuryBinary = function() {
  var binary =
    fs.readFileSync(TRSDIR+'Treasury_sol_Treasury.bin').toString();
  if (!binary.startsWith('0x')) binary = '0x' + binary;
  return binary;
}

exports.trscon = function(sca) {
  return new web3_.eth.Contract( exports.treasuryABI(), sca );
}

// TOKEN =====================================================================

const TOKDIR='../../../erc223/build/'

exports.tokenABI = function() {
  var contents =
    fs.readFileSync(TOKDIR+'ERC223Token_sol_ERC223Token.abi').toString();
  return JSON.parse(contents);
}

exports.tokenBinary = function() {
  var binary =
    fs.readFileSync(TOKDIR+'ERC223Token_sol_ERC223Token.bin').toString();
  if (!binary.startsWith('0x')) binary = '0x' + binary;
  return binary;
}

exports.tokcon = function(sca) {
  return new web3_.eth.Contract( exports.tokenABI(), sca );
}

