import type { NextPage } from 'next'
import styles from '../styles/Home.module.css';
import { Box, Button, Button2, Dropdown, Panel, Container, Input } from '../components/SimpleCompents';
import Axios from 'axios';
import React, { useEffect } from 'react';
import Eth from '../utils/ethereum';
import { useBalance } from '../utils/hooks/EthereumHooks';

const stringArrary = ['0x50bD41A6b4AF4ba8ED78f09912F363D26fd7d57C', '0x1eD14542bFDE8d84D82dfA8B43EC12d2c510361C', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const Home: NextPage<{ ethBalance: number, InitialBlockNumber: number }> = ({ ethBalance, InitialBlockNumber }) => {
  
  const UserInfoBox = () => {
    const [address, setAddress] = React.useState(stringArrary[0]);
    const [EthBalance, dispatch] = useBalance(address, "ether");
    const [tokenBalance, dispatchToken] = useBalance(address, "token");

    return (
      <Box title='Address: '>
        <Dropdown options={stringArrary} onChange={setAddress} />
        <h2>{`ether: ${EthBalance ? EthBalance.toFixed(5) : 0}`}</h2>
        <h2>{`token: ${tokenBalance ? tokenBalance : 0}`}</h2>
      </Box>
    )
  }

  const SendTokenBox = () => {
    const [toAddress, setToAddress] = React.useState("");
    const [amount, setAmount] = React.useState(0);

    const clickChecker = (toAddress:string) => {
      console.log('hi');
      console.log(toAddress);
    }

      return (
        <Box title='Send Token'>
          <Container flexDirection='row'>
            <Container flexDirection='column'>
              <Input label='to address' placeholder='to address' onChange={setToAddress} />
              <Input label='amount' placeholder='0.1001 cho' />
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
        setBlockNumber(blockNumber);
      }, 1000);
      return () => clearInterval(interval);
    },[])
    
    return (
      <Box title='BlockChain Info'>
        <h2>{`Block Number: ${blockNumber}`}</h2>
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
        <Container>
          <Box title='Send Ether' />
          <Button2 text='test' />
        </Container>
      </Container>
    </div>
  )
}

export const getStaticProps = async () => {
  const data = await Axios.get(
    'https://61051a8a-215d-4d2c-8cc9-002b7e59b03e.mock.pstmn.io'
  );

  const ethBalance = await Eth.getEtherBalance(stringArrary[0]);
  const blockNumber = await Eth.getLatestBlockNumber();    

  return {
    props: {
      ethBalance: ethBalance ? parseFloat(ethBalance).toFixed(5) : 0,
      InitialBlockNumber: blockNumber,
    },
  };
};

export default Home

