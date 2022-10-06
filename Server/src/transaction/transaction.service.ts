import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import Web3 from 'web3';

const contractAddress = '0xDd9eB7952D6058Ee1eC4B194e6FEF08c824D6df0';

// get json data from json file and parse it

@Injectable({})
export class TransactionService {
  test() {
    return 'test';
  }

  /* 
  receive an address and search transaction history of the ropsten block chain of an address
  and return the transaction history which related to a certain smart contract
  */
  async getTransactionHistory(address: string) {

    try {
      // read the json file of the smart contract

      const abi = JSON.parse(
        fs.readFileSync(
          '/home/kyungil/projects/stableCoin/Server/src/constant/TokenABI.json',
          'utf8',
        ),
      );

      // create a web3 object
      const web3 = new Web3(
        'https://goerli.infura.io/v3/6d0db331b03946feb41e4bfad99423c4',
      );

      // create a contract object
      const contract = new web3.eth.Contract(abi.abi, contractAddress);

      // get the transaction history of the address
      const history = await contract.getPastEvents('allEvents', {
        fromBlock: 0,
        toBlock: 'latest',
        filter: { from: address, to: address },
      });
      // return the transaction history
      return history;
    } catch (err) {
      console.log(err);
    }
  }
}
