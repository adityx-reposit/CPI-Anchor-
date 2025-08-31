CPI SOL Transfer Program (Anchor)

This project demonstrates how to perform SOL transfers using CPI (Cross-Program Invocation) in Solana with the Anchor framework
.

Instead of directly transferring SOL from one account to another, this program leverages the System Program’s transfer instruction through CPI.

📌 Overview

Program Name: cpi_contract

Program ID: 4TXzVhJMDHKza59bGC9EMRkm35dbyczj21Pnm8U6dgQ1

Purpose:
Allows transferring SOL from a sender to a recipient via the System Program using a CPI call.

⚙️ How It Works

A user invokes the sol_transfer instruction.

The program builds a CPI context with:

Sender (signer of the transaction)

Recipient (system account)

System Program (built-in Solana program for SOL transfers)

The program then calls system_program::transfer to move the specified amount of SOL.

📂 Code Breakdown
Program Instruction
pub fn sol_transfer(ctx: Context<SolTransfer>, amount: u64) -> Result<()> {
    let from_pubkey = ctx.accounts.sender.to_account_info();
    let to_pubkey = ctx.accounts.recipient.to_account_info();
    let program_id = ctx.accounts.system_program.to_account_info();

    let cpi_context = CpiContext::new(
        program_id,
        Transfer {
            from: from_pubkey,
            to: to_pubkey,
        },
    );

    transfer(cpi_context, amount)?;
    Ok(())
}


Builds a CPI context (CpiContext) for the System Program.

Calls transfer to move the specified amount of lamports.

Accounts Context
#[derive(Accounts)]
pub struct SolTransfer<'info> {
    #[account(mut)]
    sender: Signer<'info>,             // The payer (funds come from here)
    #[account(mut)]
    recipient: SystemAccount<'info>,   // The receiver of the SOL
    system_program: Program<'info, System>, // System Program
}


Sender: Must sign and have enough SOL.

Recipient: Must be a valid system account.

System Program: Built-in program that processes SOL transfers.

▶️ Running the Program
1. Build & Deploy
anchor build
anchor deploy

2. Example Test (TypeScript / JavaScript)
const tx = await program.methods
  .solTransfer(new anchor.BN(1_000_000)) // 0.001 SOL
  .accounts({
    sender: provider.wallet.publicKey,
    recipient: recipient.publicKey,
    systemProgram: anchor.web3.SystemProgram.programId,
  })
  .rpc();

console.log("Transaction Signature:", tx);

✅ Use Cases

Learning CPI in Anchor.

Demonstrating SOL transfers via a program.

Can be extended to more advanced programs like escrow, payment splitting, etc.
