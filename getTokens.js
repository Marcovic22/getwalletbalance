const {
  Connection,
  PublicKey,
  clusterApiUtl,
  LAMPORTS_PER_SOL,
  clusterApiUrl
} = require("@solana/web3.js")

const tokenProgram = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";

const getTokens = async () => {
  try {
      const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed")
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(new PublicKey("4NJkLDaXxoM4emaLiUD9V4Kctth2PnC2dJXER2jf9deA"),
      {
        programId: new PublicKey(tokenProgram)
      })
      const nonZeroAccounts = tokenAccounts?.value?.filter(
        (obj) => obj.account.data.parsed.info.tokenAmount.uiAmount > 0
      );
      let mapAccountData = nonZeroAccounts.map((obj) => obj.account.data.parsed.info)
      console.log(mapAccountData)

      for(let account of nonZeroAccounts){ // get FIDA token amount for personal wallet from URL: https://cdn.jsdelivr.net/gh/solana-labs/token-list@main/src/tokens/solana.tokenlist.json
        if(account.account.data.parsed.info.mint == "EchesyfXePKdLtoiZSL8pBe8Myagyy8ZRqsACNCFGnvp"){
          console.log(`FIDA token amount is ${account.account.data.parsed.info.tokenAmount.uiAmount}`)
        }
      }
  } catch (err) {
    console.log(err)
  }
}
getTokens();