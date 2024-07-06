const {
  createPrivateKeySync,
} = require("ethereum-cryptography/secp256k1-compat");
const { secp256k1 } = require("ethereum-cryptography/secp256k1.js");
const { toHex } = require("ethereum-cryptography/utils");
const privateKey = createPrivateKeySync();
console.log("Private key", toHex(privateKey));

const publicKey = secp256k1.getPublicKey(privateKey);
console.log("Public key", toHex(publicKey));
