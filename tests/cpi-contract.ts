import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { CpiContract } from "../target/types/cpi_contract";
import { assert } from "chai";

describe("cpi-contract", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  const provider=anchor.getProvider();
   const recipent=anchor.web3.Keypair.generate();
  const program = anchor.workspace.cpiContract as Program<CpiContract>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.solTransfer(new anchor.BN(10)).accounts({
      sender:provider.wallet.publicKey,
      recipient:recipent.publicKey,
      
    }).rpc()

    console.log("Your transaction signature", tx);
    const account = await provider.connection.getAccountInfo(recipent.publicKey);
    assert.equal(account.lamports,10)
 
  });
});
