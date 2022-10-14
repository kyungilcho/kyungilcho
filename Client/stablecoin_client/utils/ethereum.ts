import Web3 from "web3";
import { abi } from "./constant/TokenABI";
import { Transaction } from "ethereumjs-tx";
import axios from "axios";
import { getData } from "./API";
import { isNullOrUndefined } from "./utils";


const contractAddress = "0xDd9eB7952D6058Ee1eC4B194e6FEF08c824D6df0";
const web3 = new Web3(
  "https://goerli.infura.io/v3/6d0db331b03946feb41e4bfad99423c4"
);

// function receives an ethereum address and returns balance of the address in the coin smart contract

const getBalanceofToken = async (address: string) => {
  try {
    const contract = new web3.eth.Contract(abi, contractAddress);
    return await contract.methods.balanceOf(address).call();
  } catch (err) {
    console.log(err);
  }
};

//get Ether balance of an address

const getEtherBalance = async (address: string) => {
  try {
    const balance = await web3.eth.getBalance(address);
    return web3.utils.fromWei(balance, "ether");
  } catch (err) {
    console.log(err);
  }
};

const checkValidationofEthereumAddress = (value: string) => {
  if (value.length === 42) {
    return true;
  }
  return false;
};
/*
get transaction count of an address
*/
const getTransactionCount = async (address: string) => {
  try {
    const count = await web3.eth.getTransactionCount(address);
    return web3.utils.toHex(count);
  } catch (err) {
    console.log(err);
  }
};

/* 
get estimated gas price
*/

const getEstimatedGasPrice = async () => {
  try {
    const gasPrice = await web3.eth.getGasPrice();
    return web3.utils.toHex(gasPrice);
  } catch (err) {
    console.log(err);
  }
};

/* 
get estimated gas limit
*/

const getEstimatedGasLimit = async (
  senderAddress: string,
  receiverAddress: string,
  amount: number,
  data: string
) => {
  try {
    const gasLimit = await web3.eth.estimateGas({
      from: senderAddress,
      to: receiverAddress,
      value: amount,
      data: data,
    });

    return web3.utils.toHex(gasLimit);
  } catch (err) {
    console.log(err);
  }
};

/*
create a new transaction Object and return it
transaction data is the data of the transaction
*/

const createTransactionObject = async (
  senderAddress: string,
  receiverAddress: string,
  amount: number,
  data: string
) => {
  const txObject = {
    from: senderAddress,
    nonce: await getTransactionCount(senderAddress),
    gasLimit: await getEstimatedGasLimit(
      senderAddress,
      receiverAddress,
      amount,
      data
    ),
    gasPrice: await getEstimatedGasPrice(),
    to: receiverAddress,
    value: web3.utils.toHex(web3.utils.toWei(amount.toString(), "ether")),
    data: data,
  };
  return txObject;
};

/* 
create signed raw transaction and return it,
private key input is not starting with 0x. Thus, we need to add 0x to the private key
*/

const createSignedRawTransaction = async (
  senderAddress: string,
  receiverAddress: string,
  amount: number,
  privateKey: string,
  data: string
) => {
  try {
    const txObject = await createTransactionObject(
      senderAddress,
      receiverAddress,
      amount,
      data
    );
    const tx = new Transaction(txObject, { chain: "goerli" });

    const privateKeyBuffer = Buffer.from(privateKey, "hex");
    tx.sign(privateKeyBuffer);
    const serializedTx = tx.serialize();
    const raw = "0x" + serializedTx.toString("hex");
    return raw;
  } catch (err) {
    console.log(err);
  }
};

/* Send Signed Transaction */

const sendSignedRawTransaction = async (raw: string, dispatch: any) => {
    try {
        const receipt = await web3.eth.sendSignedTransaction(raw)
        .on("transactionHash", (hash: string) => {
            console.log("hash", hash);
            dispatch({ type: 'SET_TRANSACTION_STATE', status: 'pending'});
        })
        .on("receipt", (receipt: any) => {
            console.log("receipt", receipt);
            dispatch({ type: 'SET_TRANSACTION_STATE', status: 'success'});

        })
        .on("confirmation", (confirmationNumber: number, receipt: any) => {
            console.log("confirmationNumber", confirmationNumber);
        dispatch({ type: 'SET_TRANSACTION_STATE', status: 'idle'});
        });        
        return receipt;
    } catch (err) {
        console.log(err);
        dispatch({ type: 'SET_TRANSACTION_STATE', status: 'failure'});
    }
}

/* send Token from sender to receiver. 
function receives sender address, receiver address, amount of token to be sent, and private key of a client as parameters 
network setter common is created from ethereumcommonjs
use sendSignedTransaction method
txData should be made with encodeABI data */

const sendToken = async (
  senderAddress: string,
  receiverAddress: string,
  amount: number,
  privateKey: string,
  dispatch: any
) => {
  try {
    const contract = new web3.eth.Contract(abi, contractAddress);
    console.log("amount", amount);

    console.log('====================================');
    console.log(privateKey);
    console.log('====================================');

    const txData = contract.methods
      .transfer(receiverAddress, amount)
      .encodeABI();

      console.log('====================================');
      console.log(senderAddress);
      console.log('====================================');

    const raw = await createSignedRawTransaction(
      senderAddress,
      contractAddress,
      0,
      privateKey,
      txData
    );

    
    if(isNullOrUndefined(raw) === true) throw new Error("raw is null or undefined");
    else {
        const receipt = await sendSignedRawTransaction(raw!, dispatch);
        return receipt;
    }

  } catch (err) {
    console.log(err);
  }
};

/* mint Token */ 

const mintToken = async (
    senderAddress: string,
    amount: number,
    privateKey: string,
    dispatch: any
    ) => {
    try {
        const contract = new web3.eth.Contract(abi, contractAddress);
        console.log("amount", amount);

        const txData = contract.methods.issue(amount)

        const raw = await createSignedRawTransaction(
        senderAddress,
        contractAddress,
        0,
        privateKey,
        txData
        );

        if(!isNullOrUndefined(raw) === true) throw new Error("raw is null or undefined");
        else {
            const receipt = await sendSignedRawTransaction(raw!, dispatch);
            return receipt;
        }
    } catch (err) {
        console.log(err);
    }
};

/* get latest block number */

const getLatestBlockNumber = async () => {
  try {
    const blockNumber = (await web3.eth.getBlockNumber()) || 0;
    return blockNumber;
  } catch (err) {
    console.log(err);
  }
};

/* get block details */

const getBlockDetails = async (blockNumber: number) => {
  try {
    const block = await web3.eth.getBlock(blockNumber);
    return block;
  } catch (err) {
    console.log(err);
  }
};

/* 
get transaction history of an address 
but only about token transfer transactions of certain smart contract
but only 100 transactions are returned
use Promise.all to get all transactions
*/

const getTransactionHistory = async (address: string) => {
  try {
    console.log("hi");
    const history = await getData(
      "http://192.168.156.162:5555/transaction/history",
      "address",
      address
    );
    console.log("history", history);
    return history;
  } catch (err) {
    console.log(err);
  }
};

const getTotalSupply = async () => {
    try {
        const contract = new web3.eth.Contract(abi, contractAddress);
        const totalSupply = await contract.methods.totalSupply().call();
        return totalSupply;
    } catch (err) {
        console.log(err);
    }
}

// check if private key is valid

const isValidPrivateKey = (privateKey: string) => {
    try {
        const account = web3.eth.accounts.privateKeyToAccount(privateKey);
        return account;
    } catch (err) {
        console.log(err);
    }
}

const getAddressFromPrivateKey = (privateKey: string) => {
    try {
        const account = web3.eth.accounts.privateKeyToAccount(privateKey);
        return account.address;
    } catch (err) {
        console.log(err);
    }
}

const generatePrivateKey = () => {
    try {
        const account = web3.eth.accounts.create();
        return account.privateKey;
    } catch (err) {
        console.log(err);
    }
}

// export all functions as good.method
const Eth = {
  getBalanceofToken,
  getEtherBalance,
  checkValidationofEthereumAddress,
  sendToken,
  getLatestBlockNumber,
  getBlockDetails,
  getTransactionHistory,
  getTotalSupply,
  mintToken,
  isValidPrivateKey,
    getAddressFromPrivateKey,
    generatePrivateKey,
};

export default Eth;
