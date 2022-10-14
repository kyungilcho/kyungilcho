import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import {
  Box,
  Button,
  Button2,
  Dropdown,
  Panel,
  Container,
  Input,
  ScrollContainer,
} from "../components/SimpleComponents";
import React, { useEffect, useState } from "react";
import Eth from "../utils/ethereum";
import { useBalance } from "../utils/hooks/EthereumHooks";
import { useGlobalDispatch, useGlobalState } from "../context";
import useIconChange from "../utils/hooks/useIconChange";
import { Portal } from "../utils/Portal";

const Home: NextPage<{
  InitialBlockNumber: number;
  totalTokenSupply: number;
}> = ({ InitialBlockNumber, totalTokenSupply }): JSX.Element => {

  const state = useGlobalState();
  const dispatch = useGlobalDispatch();

  const { statusIcon } = useIconChange(state.status);

  const UserInfoBox = () => {
    const [EthBalance, dispatch1] = useBalance(state.address, "ether");
    const [tokenBalance, dispatchToken] = useBalance(state.address, "token");

    const addressChange = (value: any) => {
      return [
        dispatch({type: "SET_PRIVATEKEY", privateKey: state.accountList[value].privateKey || ""}),
        dispatch({ type: "SET_ADDRESS", address: value }),
      ];
    };

    return (
      <Box>
        <div className="box__address">
          <h3>Address: {state.address}</h3>
          <Dropdown options={state.accountList} onChange1={addressChange} />
        </div>
        <div className="box__info">
          <h2>{`ether: ${EthBalance ? EthBalance.toFixed(5) : 0}`}</h2>
          <h2>{`token: ${tokenBalance ? tokenBalance : 0}`}</h2>

          <Button2
            text="token balance check"
            value="good"
            onClick={() => {
              console.log();
            }}
          />
        </div>
      </Box>
    );
  };

  const SendTokenBox = () => {
    const [toAddress, setToAddress] = React.useState("");
    const [amount, setAmount] = React.useState(0);

    const clickChecker = async () => {
      await Eth.sendToken(
        state.address,
        toAddress,
        amount,
        state.privateKey,
        dispatch
      );
    };

    return (
      <Box title="Send Token">
        <Container flexDirection="row">
          <Container flexDirection="column">
            <Input
              label="to address"
              placeholder="to address"
              onChange={setToAddress}
            />
            <Input
              label="amount"
              placeholder="0.1001 cho"
              onChange={setAmount}
            />
          </Container>
          <Button2 text="Send" onClick={clickChecker} value={toAddress} />
        </Container>
      </Box>
    );
  };

  const BlockChainInfoBox = () => {
    const [blockNumber, setBlockNumber] = React.useState(InitialBlockNumber);

    useEffect(() => {
      const interval = setInterval(async () => {
        const blockNumber = await Eth.getLatestBlockNumber();
        setBlockNumber(blockNumber ? blockNumber : 0);
      }, 10000);
      return () => clearInterval(interval);
    }, []);

    return (
      <Box title="BlockChain Info">
        <h2>{`Block Number: ${blockNumber}`}</h2>
      </Box>
    );
  };

  const TransactionHistoryBox = () => {
    const [transactionHistory, setTransactionHistory] = React.useState([
      { returnValues: { from: "", to: "", value: 0 } },
    ]);

    useEffect(() => {
      const interval = setInterval(async () => {
        const transactionHistory = await Eth.getTransactionHistory(
          state.address
        );
        if(transactionHistory) setTransactionHistory(transactionHistory)
      }, 10000);
      return () => clearInterval(interval);
    }, []);

    return (
      <Box title="Transaction History" className="transaction-history">
        <ScrollContainer flexDirection="column">
          {transactionHistory.map((transaction, index) => {
            return (
              <Container key={index} flexDirection="column" className="card">
                <h4>{`from: ${transaction.returnValues.from}`}</h4>
                <h4>{`to: ${transaction.returnValues.to}`}</h4>
                <h4>{`value: ${transaction.returnValues.value}`}</h4>
              </Container>
            );
          })}
        </ScrollContainer>
      </Box>
    );
  };

  const AdminBox = () => {
    const [totalSupply, setTotalSupply] = React.useState(totalTokenSupply);
    const [mintAmount, setMintAmount] = React.useState(0);

    const onClick = () => {
      Eth.mintToken(state.address, mintAmount, state.privateKey, dispatch);
    };

    const onClick2 = () => {
      console.log("====================================");
      console.log(state);
      console.log("====================================");
    };

    const onClick3 = () => {
      const privateKey = Eth.generatePrivateKey();
      if(state.address === "") {
        return [
          dispatch({type: "SET_PRIVATEKEY", privateKey: privateKey}),
          dispatch({ type: "SET_ADDRESS", address: Eth.getAddressFromPrivateKey(privateKey) }),
          dispatch({
            type: "ADD_ACCOUNT_LIST", 
            accountList: {[Eth.getAddressFromPrivateKey(privateKey!)]: {
            address: Eth.getAddressFromPrivateKey(privateKey!),
            privateKey: privateKey
          }}
        })
        ]
      }
      dispatch({
        type: "ADD_ACCOUNT_LIST", 
        accountList: {[Eth.getAddressFromPrivateKey(privateKey!)]: {
          address: Eth.getAddressFromPrivateKey(privateKey!),
          privateKey: privateKey
        }}
      });
    };

    useEffect(() => {
      const interval = setInterval(async () => {
        const totalSupply = await Eth.getTotalSupply();
        setTotalSupply(totalSupply ? totalSupply : 0);
      }, 10000);
      return () => clearInterval(interval);
    }, []);

    return (
      <Box title="Admin" className="admin">
        <Button2 text="Add Account" onClick={onClick3} />
        <h4>Token Total Supply: {totalSupply}</h4>
        <Input label="mint amount" onChange={setMintAmount} />
        <div className="admin__button-container">
          <Button2
            text="mint"
            onClick={onClick}
            value={mintAmount.toString()}
          />
          <Button2
            text="etes"
            onClick={onClick2}
            value={mintAmount.toString()}
          />
        </div>
        <Portal>
          <h4 className="admin-status">Transaction Status: {statusIcon}</h4>
        </Portal>
      </Box>
    );
  };

  return (
    <div className={styles.container}>
      <Container flexDirection="row" className="container-box">
        <Container flexDirection="column" className="left">
          <UserInfoBox />
          <SendTokenBox />
          <BlockChainInfoBox />
        </Container>

        <Container flexDirection="column" className="right">
          <AdminBox />
          <TransactionHistoryBox address={state.address} />
        </Container>
      </Container>
    </div>
  );
};

export const getStaticProps = async () => {

  const blockNumber = await Eth.getLatestBlockNumber();
  const totalTokenSupply = await Eth.getTotalSupply();

  return {
    props: {

      InitialBlockNumber: blockNumber,
      totalTokenSupply: totalTokenSupply ? totalTokenSupply : 0,
    },
  };
};

export default Home;
