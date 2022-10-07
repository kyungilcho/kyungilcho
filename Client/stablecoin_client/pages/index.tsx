import type { NextPage } from 'next'
import styles from '../styles/Home.module.css';
import { Box, Button, Button2, Dropdown, Panel, Container, Input, ScrollContainer } from '../components/SimpleCompents';
import Axios from 'axios';
import React, { useEffect } from 'react';
import Eth from '../utils/ethereum';
import { useBalance } from '../utils/hooks/EthereumHooks';
import { useGlobalDispatch, useGlobalState } from '../context';

const stringArrary = ['0x50bD41A6b4AF4ba8ED78f09912F363D26fd7d57C', '0x1eD14542bFDE8d84D82dfA8B43EC12d2c510361C', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const privateKey = "91e3edbed9f7f6dd154543920ee3b7e93ad3e964e18f1086156789c759575461";

const Home: NextPage<{ 
  ethBalance: number, 
  InitialBlockNumber: number 
}> = ({ 
  ethBalance, 
  InitialBlockNumber 
}): JSX.Element => {

  const state = useGlobalState();
  const dispatch = useGlobalDispatch();

  const [address, setAddress] = React.useState(stringArrary[0]);

  const UserInfoBox = () => {
    const [EthBalance, dispatch] = useBalance(address, "ether");
    const [tokenBalance, dispatchToken] = useBalance(address, "token");

    return (
      <Box title='Address: '>
        <Dropdown options={stringArrary} onChange={setAddress} />
        <h2>{`ether: ${EthBalance ? EthBalance.toFixed(5) : 0}`}</h2>
        <h2>{`token: ${tokenBalance ? tokenBalance : 0}`}</h2>
        <Button2 text="token balance check" value='good' onClick={() => {
          console.log();

        }} />
      </Box>
    )
  }

  const SendTokenBox = () => {
    const [toAddress, setToAddress] = React.useState("");
    const [amount, setAmount] = React.useState(0);

    const clickChecker = () => {
      Eth.sendToken(stringArrary[0], toAddress, amount, privateKey);
    }

    return (
      <Box title='Send Token'>
        <Container flexDirection='row'>
          <Container flexDirection='column'>
            <Input label='to address' placeholder='to address' onChange={setToAddress} />
            <Input label='amount' placeholder='0.1001 cho' onChange={setAmount} />
          </Container>
          <Button2 text='Send' onClick={clickChecker} value={toAddress} />
        </Container>
      </Box>
    )

  }

  const BlockChainInfoBox = () => {

    const [blockNumber, setBlockNumber] = React.useState(InitialBlockNumber);

    useEffect(() => {
      const interval = setInterval(async () => {
        const blockNumber = await Eth.getLatestBlockNumber();
        setBlockNumber(blockNumber ? blockNumber : 0);
      }, 10000);
      return () => clearInterval(interval);
    }, [])

    return (
      <Box title='BlockChain Info'>
        <h2>{`Block Number: ${blockNumber}`}</h2>
      </Box>
    )
  }

  
  const TransactionHistoryBox = () => {
    const [transactionHistory, setTransactionHistory] = React.useState([{returnValues: {from: '', to: '', value: 0}}]);

    useEffect(() => {
      const interval = setInterval(async () => {
        const transactionHistory = await Eth.getTransactionHistory(address);
        setTransactionHistory(transactionHistory);
      }, 10000);
      return () => clearInterval(interval);
    }, [address]);

    return (
      <Box title='Transaction History'>
        <Dropdown options={stringArrary} onChange={setAddress} />
        <ScrollContainer flexDirection='column'>
          {transactionHistory.map((transaction, index) => {
            return (
              <Container key={index} flexDirection='column'>
                <h4>{`from: ${transaction.returnValues.from}`}</h4>
                <h4>{`to: ${transaction.returnValues.to}`}</h4>
                <h4>{`value: ${transaction.returnValues.value}`}</h4>
              </Container>
            )
          }
          )}
        </ScrollContainer>
      </Box>
    )

  }

  return (
    <div className={styles.container}>
      <Container flexDirection='row'>
        <Container flexDirection='column' >
          <UserInfoBox />
          <SendTokenBox />
          <BlockChainInfoBox />
        </Container>
        <Container flexDirection='column'>
          <Box title='Send Ether' />
          <Button2 text='test' />
          <TransactionHistoryBox address={address} />
        </Container>
      </Container>
    </div>
  )
}

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


