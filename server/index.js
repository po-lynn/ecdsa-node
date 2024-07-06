const express = require("express");
const app = express();
const { secp256k1 } = require("ethereum-cryptography/secp256k1.js");
const { keccak256 } = require("ethereum-cryptography/keccak.js");
const { utf8ToBytes } = require("ethereum-cryptography/utils.js");

const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

/* 
Private key 16c5e8d3379a291b7d5f4bcd030b2bc45662e266b33db519a09d96914bfa6f36
Public key 027a47e0af23d4734032158be1495fa6e77069de19dcd17fefe30cecd0826ee538


Private key 0026561d6651063171f68ec96762ca5cc631b6e2ecf538c4a02dd0dbdc6e66bc
Public key 0328dc23708ef02e7e874d2231a51e3448c2de311a41cccdc28f2925fc9a021a1e


Private key 0e7280e13fc2f31afdf79e65babf8cfb8787e64864e02523d70663c31b0c2b36
Public key 03fc403f28b70aa4a961ea2c23dc64212c00e2c1cbe8eefebf266bfc22561b5f66
*/
const balances = {
  "027a47e0af23d4734032158be1495fa6e77069de19dcd17fefe30cecd0826ee538": 100,
  "0328dc23708ef02e7e874d2231a51e3448c2de311a41cccdc28f2925fc9a021a1e": 50,
  "03fc403f28b70aa4a961ea2c23dc64212c00e2c1cbe8eefebf266bfc22561b5f66": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { signature, messageHash, sender, recipient, amount } = req.body;

  // convert stringified bigints back to bigints
  const sig = {
    ...signature,
    r: BigInt(signature.r),
    s: BigInt(signature.s),
  };
  const hashMessage = (message) => keccak256(Uint8Array.from(message));
  const isSigned = secp256k1.verify(sig, hashMessage(messageHash), sender);
  if (isSigned) {
    setInitialBalance(sender);
    setInitialBalance(recipient);

    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
