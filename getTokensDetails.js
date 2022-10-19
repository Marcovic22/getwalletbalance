const {
  Connection,
  PublicKey,
  clusterApiUrl,
  LAMPORTS_PER_SOL
} = require('@solana/web3.js')
const request = require('request');

const tokenProgram = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"

const getTokens = async () => {
  try {
    const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(new PublicKey("CsMnDXoan5kKwdh9pJR4RBBfn4Hk4cCmiW6xcu4d1Qyn"), //4NJkLDaXxoM4emaLiUD9V4Kctth2PnC2dJXER2jf9deA
      {
        programId: new PublicKey(tokenProgram)
      })
    const nonZeroAccounts = tokenAccounts?.value?.filter(
      (obj) => obj.account.data.parsed.info.tokenAmount.uiAmount > 0
    );

    const url = "https://cdn.jsdelivr.net/gh/solana-labs/token-list@main/src/tokens/solana.tokenlist.json";

    request.get({
      url: url,
      json: true,
    }, (err, res, data) => {
      if(err) {
        console.log('Error', err);
      } else if (res.statusCode !== 200) {
        console.log('Status:', res.statusCode);
      } else {
        // data is already parsed as json
        for  (address of data.tokens) {
          for (acct of nonZeroAccounts) {
            if (address.address == acct.account.data.parsed.info.mint) {
              console.log(`The token ${address.symbol} exists and has balance ${acct.account.data.parsed.info.tokenAmount.uiAmount}`)
            }
          }
        }
      }
    })
  } catch (err) {
    console.log(err)
  }
}
getTokens();