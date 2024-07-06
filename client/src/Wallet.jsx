import server from "./server";
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { hexToBytes, toHex, utf8ToBytes } from "ethereum-cryptography/utils.js";
function Wallet({
  address,
  setAddress,
  balance,
  setBalance,
  privateKey,
  setAPrivateKey,
}) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setAPrivateKey(privateKey);
    const address = toHex(secp256k1.getPublicKey(privateKey));
    setAddress(address);

    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input
          placeholder="Type in private key"
          value={privateKey}
          onChange={onChange}
        ></input>
      </label>
      <div>Address {address}</div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
