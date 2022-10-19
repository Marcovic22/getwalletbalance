const {
  Connection,
  PublicKey,
  Account,
  connectionApiUrl,
  Transaction,
  Keypair,
  LAMPORTS_PER_SOL,
  clusterApiUrl
} = require("@solana/web3.js")


/* Code generates public key GsprB91bSMxhN5WePSPCyMLyv7pwPNNdiGKs3fDQT1En */
const devKeys = new Keypair();
const pubKey = new PublicKey(devKeys._keypair.publicKey).toString();
const privKey = devKeys._keypair.secretKey;

/* Function that connects in to Solana blockchain and gets the balance  
of the wallet specified */

const getWalletBalance = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed")
    const myWallet = await Keypair.fromSecretKey(privKey)
    const walletBalance = await connection.getBalance(new PublicKey(myWallet.publicKey))
    console.log(`Wallet address is ${myWallet.publicKey.toString()} and balance is ${walletBalance}`)
  } catch (err) {
    console.log(err)
  }
}

const getWalletBalanceReal = async () => {
  try {
    const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed")
    const walletBalance = await connection.getBalance(new PublicKey('4NJkLDaXxoM4emaLiUD9V4Kctth2PnC2dJXER2jf9deA'))
    console.log(`Wallet address is ??? and balance is ${walletBalance.toString()}`)
  } catch (err) {
    console.log(err)
  }
}

getWalletBalanceReal();


const requestAirdrop = async () => {
  try {
    // console.log("airdropping")
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed")
    const walletKeyPair = await Keypair.fromSecretKey(privKey)
    const fromAirDropSignature = await connection.requestAirdrop(new PublicKey(walletKeyPair.publicKey), 5 * LAMPORTS_PER_SOL);
    // console.log(fromAirDropSignature);
    await connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: fromAirDropSignature,
    });
  } catch (err) {
    console.log(err)
  }
}

const main = async() => {
  await getWalletBalance();
  await requestAirdrop();
  await getWalletBalance();
}

//main();
