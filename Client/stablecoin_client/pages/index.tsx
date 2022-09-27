import type { NextPage } from 'next'
import styles from '../styles/Home.module.css';
import { Box, Button, Button2, Dropdown, Panel, Container, Input } from '../components/SimpleCompents';
import Axios from 'axios';
import React, { useEffect } from 'react';
import Eth from '../utils/ethereum';
import { useBalance } from '../utils/hooks/EthereumHooks';

interface data {
  id: number;
  name: string;
}

const stringArrary = ['0x50bD41A6b4AF4ba8ED78f09912F363D26fd7d57C', '0x1eD14542bFDE8d84D82dfA8B43EC12d2c510361C', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];


const Home: NextPage<{ data: data, ethBalance: number }> = ({ data, ethBalance }) => {
  const [address, setAddress] = React.useState(stringArrary[0]);
  const [EthBalance, dispatch] = useBalance(address, "ether");
  const [tokenBalance, dispatchToken] = useBalance(address, "token");

  return (
    <div className={styles.container}>
      <Container flexDirection='row'>
        <Container flexDirection='column' >
          <Box title='Address: '>
            <Dropdown options={stringArrary} onChange={setAddress} />
            <h2>{`ether: ${EthBalance ? EthBalance.toFixed(5) : 0}`}</h2>
            <h2>{`token: ${tokenBalance ? tokenBalance : 0}`}</h2>
          </Box>
          <Box title='Send Token'>
            <Input label='to address' placeholder='to address' />
            <Input label='amount' placeholder='0.1001 cho' />
          </Box>
          <Box title='block chain Info'>
          </Box>
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

  return {
    props: {
      data: data.data,
      ethBalance: ethBalance ? parseFloat(ethBalance).toFixed(5) : 0,
    },
  };
};

export default Home

