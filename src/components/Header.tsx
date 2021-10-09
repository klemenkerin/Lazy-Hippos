import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Countdown from "react-countdown";
import { Button, CircularProgress, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import * as anchor from "@project-serum/anchor";

import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import { useAnchorWallet } from "@solana/wallet-adapter-react";

import { WalletDialogButton } from "@solana/wallet-adapter-material-ui";

import {
  CandyMachine,
  awaitTransactionSignatureConfirmation,
  getCandyMachineState,
  mintOneToken,
  shortenAddress,
} from "../candy-machine";

const ConnectButton = styled(WalletDialogButton)``;

const CounterText = styled.span``; // add your styles here

const MintContainer = styled.div``; // add your styles here

const MintButton = styled(Button)``; // add your styles here

export interface HomeProps {
  candyMachineId: anchor.web3.PublicKey;
  config: anchor.web3.PublicKey;
  connection: anchor.web3.Connection;
  startDate: number;
  treasury: anchor.web3.PublicKey;
  txTimeout: number;
}

const Header = (props: HomeProps) => {
    const [balance, setBalance] = useState<number>();
    const [isActive, setIsActive] = useState(false); // true when countdown completes
    const [isSoldOut, setIsSoldOut] = useState(false); // true when items remaining is zero
    const [isMinting, setIsMinting] = useState(false); // true when user got to press MINT

    const [remaining, setRemaining] = useState(-1);

    const [alertState, setAlertState] = useState<AlertState>({
        open: false,
        message: "",
        severity: undefined,
    });

    const [startDate, setStartDate] = useState(new Date(props.startDate));

    const wallet = useAnchorWallet();
    const [candyMachine, setCandyMachine] = useState<CandyMachine>();

    const onMint = async () => {
        try {
          setIsMinting(true);
          if (wallet && candyMachine?.program) {
            const mintTxId = await mintOneToken(
              candyMachine,
              props.config,
              wallet.publicKey,
              props.treasury
            );
    
            const status = await awaitTransactionSignatureConfirmation(
              mintTxId,
              props.txTimeout,
              props.connection,
              "singleGossip",
              false
            );
    
            if (!status?.err) {
              setAlertState({
                open: true,
                message: "Congratulations! Mint succeeded!",
                severity: "success",
              });
            } else {
              setAlertState({
                open: true,
                message: "Mint failed! Please try again!",
                severity: "error",
              });
            }
          }
        } catch (error: any) {
          // TODO: blech:
          let message = error.msg || "Minting failed! Please try again!";
          if (!error.msg) {
            if (error.message.indexOf("0x138")) {
            } else if (error.message.indexOf("0x137")) {
              message = `SOLD OUT!`;
            } else if (error.message.indexOf("0x135")) {
              message = `Insufficient funds to mint. Please fund your wallet.`;
            }
          } else {
            if (error.code === 311) {
              message = `SOLD OUT!`;
              setIsSoldOut(true);
            } else if (error.code === 312) {
              message = `Minting period hasn't started yet.`;
            }
          }
    
          setAlertState({
            open: true,
            message,
            severity: "error",
          });
        } finally {
          if (wallet) {
            const balance = await props.connection.getBalance(wallet.publicKey);
            setBalance(balance / LAMPORTS_PER_SOL);
          }
          setIsMinting(false);
        }
      };

    useEffect(() => {
    (async () => {
        //if (!wallet) return;
        const { candyMachine, goLiveDate, itemsRemaining } =
        await getCandyMachineState(
            wallet as anchor.Wallet,
            props.candyMachineId,
            props.connection
        );

        setRemaining(itemsRemaining);

        setIsSoldOut(itemsRemaining === 0);
        setStartDate(goLiveDate);
        setCandyMachine(candyMachine);
    })();
    }, [wallet, props.candyMachineId, props.connection]);

    const startDateMiliseconds = props.startDate * 1000;

    return (
        <div className="header">
            <div className="container">
                <div className="navbar">
                    <h2 className="logo">LAZY HIPPOS</h2>
                    <div className="menu">
                        <a href="https://lazyhippo.art/#attributes" className="menu-item">attributes</a>
                        <a href="https://lazyhippo.art/#roadmap" className="menu-item">roadmap</a>
                        <a href="https://lazyhippo.art/#faq" className="menu-item">FAQ</a>
                    </div>
                    {!wallet ? ( <ConnectButton className="connect button-hover">connect wallet</ConnectButton>) : ( <ConnectButton className="connect" disabled>{shortenAddress(wallet.publicKey.toBase58() || "")}</ConnectButton>)}
                </div>
                <div className="content-header">
                <img className="hippo-image" src="img/hippo-gif.gif" alt="Lazy Hippos"></img>
                <h1>Meet our lazy hippos!</h1>
                <h2 className="hippo-description">1111 randomly generated very<br /> lazy hippos living on Solana blockchain.</h2>

                <img className="hippo-gif-mobile" src="img/hippo-gif.gif" alt="Lazy Hippos"></img>

                {(<h3 className="coming-soon">{!isActive ? "Presale starting soon. Mint price 0.25 SOL." : "Price 0.25 SOL"}</h3>)}
                {<h3>{remaining != -1 ? "Remaining: " + (remaining + 611) + "/1111" : ""}</h3>}

                <MintContainer>
                    {(
                <button
                    className={!isActive ? "mint-button" : "mint-button button-hover"}
                    disabled={isSoldOut || isMinting || !isActive}
                    onClick={onMint}
                >
                    {isSoldOut ? (
                    "SOLD OUT"
                    ) : isActive ? (
                    isMinting ? (
                        <CircularProgress />
                    ) : (
                        "MINT"
                    )
                    ) : (
                    <Countdown
                        date={startDateMiliseconds}
                        onMount={({ completed }) => completed && setIsActive(true)}
                        onComplete={() => setIsActive(true)}
                        //renderer={renderCounter}
                    />
                    )}
                </button>
                )}
            </MintContainer>
            
            <Snackbar
                open={alertState.open}
                autoHideDuration={6000}
                onClose={() => setAlertState({ ...alertState, open: false })}
            >
                <Alert
                onClose={() => setAlertState({ ...alertState, open: false })}
                severity={alertState.severity}
                >
                {alertState.message}
                </Alert>
            </Snackbar>
    
                <a href="https://discord.gg/vmrQgSXdED"><i className="fab fa-discord"></i></a>
                <a href="https://twitter.com/SolHippo"><i className="fab fa-twitter"></i></a>
                </div>
            </div>
            <div className="header-bottom-image"></div>
        </div>
    );
}

interface AlertState {
    open: boolean;
    message: string;
    severity: "success" | "info" | "warning" | "error" | undefined;
}

const renderCounter = ({ days, hours, minutes, seconds, completed }: any) => {
    return (
      <CounterText>
        {hours} hours, {minutes} minutes, {seconds} seconds
      </CounterText>
    );
};

export default Header;