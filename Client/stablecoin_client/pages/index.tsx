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
} from "../components/SimpleComponentsTest";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import Eth from "../utils/ethereum";
import { useBalance } from "../utils/hooks/EthereumHooks";
import { useGlobalDispatch, useGlobalState } from "../context";
import { DispatchinApp } from "../utils/utils";
import { createPortal } from "react-dom";
import { PortalProps } from "@mui/material";
import { AiFillCheckCircle, AiFillMinusCircle } from "react-icons/ai";
import { GiBackwardTime } from "react-icons/gi";

const stringArrary = [
  "0x50bD41A6b4AF4ba8ED78f09912F363D26fd7d57C",
  "0x1eD14542bFDE8d84D82dfA8B43EC12d2c510361C",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];
const privateKeyArray = [
  "8a9214c740bb26055a37789dc3ff31b13794b990f29822e0733e60c3fd2dde89",
  "91e3edbed9f7f6dd154543920ee3b7e93ad3e964e18f1086156789c759575461",
];

function Portal(props: PortalProps) {
  const { children } = props;
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setElement(document.getElementById("__next"));
  }, []);

  if (!element) {
    return <></>;
  }

  return createPortal(children, element);
}

const Home: NextPage<{
  ethBalance: number;
  InitialBlockNumber: number;
}> = ({ ethBalance, InitialBlockNumber }): JSX.Element => {
  const state = useGlobalState();
  const dispatch = useGlobalDispatch();

  const [address, setAddress] = React.useState(stringArrary[0]);
  const [privateKey, setPrivateKey] = React.useState(privateKeyArray[0]);

  const [statusIcon, setStatusIcon] = useState<React.ReactNode>("");

  useEffect(() => {
    switch (state.status) {
      case "idle":
        setStatusIcon(
          <AiFillMinusCircle
            style={{
              width: "25px",
              height: "25px",
              marginLeft: "0.5em",
              color: "#ffc400",
            }}
          />
        );
        break;
      case "pending":
        setStatusIcon(
          <GiBackwardTime
            style={{
              width: "25px",
              height: "25px",
              marginLeft: "0.5em",
              color: "grey",
            }}
          />
        );
        break;
      case "success":
        setStatusIcon(
          <AiFillCheckCircle
            style={{
              width: "25px",
              height: "25px",
              marginLeft: "0.5em",
              color: "green",
            }}
          />
        );
        break;
      default:
        break;
    }
  }, [state]);

  const UserInfoBox = () => {
    const [EthBalance, dispatch1] = useBalance(state.address, "ether");
    const [tokenBalance, dispatchToken] = useBalance(state.address, "token");

    const addressChange = (value: any) => {
      console.log("====================================");
      console.log(value);
      console.log("====================================");
      dispatch({ type: "SET_ADDRESS", address: value });
    };

    return (
      <Box>
        <div className="box__address">
          <h3>Address: {state.address}</h3>
          <Dropdown options={stringArrary} onChange1={addressChange} />
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
        privateKey,
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
        setTransactionHistory(transactionHistory);
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
    const [totalSupply, setTotalSupply] = React.useState(0);
    const [mintAmount, setMintAmount] = React.useState(0);

    const onClick = () => {
      DispatchinApp(dispatch);
    };

    const onClick2 = () => {
      console.log("====================================");
      console.log(state.address);
      console.log("====================================");
    };

    useEffect(() => {
      const interval = setInterval(async () => {
        const totalSupply = await Eth.getTotalSupply();
        setTotalSupply(totalSupply ? totalSupply : 0);
      }, 10000);
      return () => clearInterval(interval);
    }, []);

    return (
      <Box title="Admin">
        <h4>Token Total Supply: {totalSupply}</h4>
        <Input label="mint amount" onChange={setMintAmount} />

        <Button2 text="mint" onClick={onClick} value={mintAmount.toString()} />
        <Button2 text="etes" onClick={onClick2} value={mintAmount.toString()} />
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
  const ethBalance = await Eth.getEtherBalance(stringArrary[0]);
  const tokenBalance = await Eth.getBalanceofToken(stringArrary[0]);
  const blockNumber = await Eth.getLatestBlockNumber();

  return {
    props: {
      ethBalance: ethBalance ? parseFloat(ethBalance).toFixed(5) : 0,
      tokenBalance: tokenBalance ? tokenBalance : 0,
      InitialBlockNumber: blockNumber,
    },
  };
};

export default Home;
