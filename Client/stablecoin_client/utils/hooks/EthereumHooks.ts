// cutom hooks for getting ether balance and token balance

import { useState, useEffect } from 'react';
import Eth from '../ethereum';

export const useBalance = (address: string, type?: string) => {
    const [balance, setBalance] = useState(0);

    const dispatch = useEffect(() => {
        const getBalance = async () => {
            if (Eth.checkValidationofEthereumAddress(address)) {
                if (type === 'token') {
                    console.log('token');
                    const balance = parseInt(await Eth.getBalanceofToken(address) || '0');
                    setBalance(balance);
                } else if (type === 'ether') {
                    const balance = parseFloat(await Eth.getEtherBalance(address) || '0');
                    setBalance(balance);
                }
            } else {
                setBalance(0);
            }
        }
        getBalance();
    }, [address, type])
    return [balance, dispatch];
}

/* 
react custom hook for getting ethereum balance and token balance.
which can be used in any component.
which changes the balance of the address when the address changes.
which changes the balance of the address new transaction is made.
*/

import { useState, useEffect } from 'react';
import Eth from '../ethereum';

export const useBalance = (address: string, type?: string) => {
    const [balance, setBalance] = useState(0);

    const dispatch = useEffect(() => {
        const getBalance = async () => {
            if (Eth.checkValidationofEthereumAddress(address)) {
                if (type === 'token') {
                    console.log('token');
                    const balance = parseInt(await Eth.getBalanceofToken(address) || '0');
                    setBalance(balance);
                } else if (type === 'ether') {
                    const balance = parseFloat(await Eth.getEtherBalance(address) || '0');
                    setBalance(balance);
                }
            } else {
                setBalance(0);
            }
        }
        getBalance();
    }, [address, type])
    return [balance, dispatch];
}

/*
use this hook in any component like this:

import { useBalance } from '../hooks/EthereumHooks';

const [balance, dispatch] = useBalance(address, 'token');

*/

/* 
if you want to change the balance of the address when address is not changed but new transaction is made.
you can use this hook like this:





