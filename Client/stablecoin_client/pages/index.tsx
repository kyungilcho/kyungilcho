import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import {
  Box,
  Button2,
  Dropdown,
  Container,
  Input,
  ScrollContainer,
  Card,
} from "../components/SimpleComponents";
import React, { useContext, useEffect, useMemo } from "react";
import Eth from "../utils/ethereum";
import { useBalance } from "../utils/hooks/EthereumHooks";
import { StateContext, useGlobalDispatch, useGlobalState } from "../context";
import useIconChange from "../utils/hooks/useIconChange";
import { Portal } from "../components/Portal";
import { useAccountListState, useAccountListDispatch } from "../context/AccountList";
import TransactionHistoryBox from "./index/TransactionHistoryBox";
import UserInfoBox from "./index/UserInfoBox";
import SendTokenBox from "./index/SendTokenBox";

const Home: NextPage<{
  InitialBlockNumber: number;
  totalTokenSupply: number;
}> = ({ InitialBlockNumber, totalTokenSupply }): JSX.Element => {

  const state = useGlobalState();
  const dispatch = useGlobalDispatch();

  const accountListState = useAccountListState();
  const accountListDispatch = useAccountListDispatch();

  const { statusIcon } = useIconChange(state.status);

  console.log('start');

  // const SendTokenBox = () => {
  //   const [toAddress, setToAddress] = React.useState("");
  //   const [amount, setAmount] = React.useState(0);

  //   const onClickHandler = async () => {
  //     await Eth.sendToken(
  //       state.address,
  //       toAddress,
  //       amount,
  //       state.privateKey,
  //       dispatch
  //     );
  //     return [setToAddress(""), setAmount(0)];
  //   };

  //   return (
  //     <Box title="Send Token">
  //       <Container flexDirection="row">
  //         <Container flexDirection="column">
  //           <Input
  //             label="to address"
  //             placeholder="to address"
  //             onChange={setToAddress}
  //           />
  //           <Input
  //             label="amount"
  //             placeholder="0.1001 cho"
  //             onChange={setAmount}
  //           />
  //         </Container>
  //         <Button2 text="Send" onClick={onClickHandler} value={toAddress} />
  //       </Container>
  //     </Box>
  //   );
  // };

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
          dispatch({type: "SET_PRIVATEKEY", privateKey: privateKey!}),
          dispatch({ type: "SET_ADDRESS", address: Eth.getAddressFromPrivateKey(privateKey!) as string }),
          accountListDispatch({
            type: "ADD_ACCOUNT_LIST", 
            accountList: {[Eth.getAddressFromPrivateKey(privateKey!) as string]: {
            address: Eth.getAddressFromPrivateKey(privateKey!),
            privateKey: privateKey
          }}
        })
        ]
      }
      accountListDispatch({
        type: "ADD_ACCOUNT_LIST", 
        accountList: {[Eth.getAddressFromPrivateKey(privateKey!) as string]: {
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
          <UserInfoBox address={state.address} dispatch={dispatch} accountList={accountListState.accountList} />
          <SendTokenBox senderAddress={state.address} privateKey={state.privateKey} dispatch={dispatch} />
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
