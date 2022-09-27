import Web3 from 'web3';

const contractAddress = "0x8acbD743E6AdAaEd96202F6BCcCa529c8925E520";
const web3 = new Web3("https://ropsten.infura.io/v3/6d0db331b03946feb41e4bfad99423c4");


// function receives an ethereum address and returns balance of the address in the coin smart contract

const getBalanceofToken = async (address: string) => {

    const abi = [
        {
            "constant": true,
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "balances",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "maximumFee",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "_totalSupply",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_owner",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "name": "balance",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_to",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "basisPointsRate",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        }
    ];

    try {
        const contract = new web3.eth.Contract(abi, contractAddress);
        return await contract.methods.balanceOf(address).call();
    }
    catch (err) {
        console.log(err);
    }
}

//get Ether balance of an address

const getEtherBalance = async (address: string) => {
    console.log('getEtherBalance');
    console.log(address);


    try {
        const balance = await web3.eth.getBalance(address);
        console.log(balance);
        return web3.utils.fromWei(balance, 'ether');
    }
    catch (err) {
        console.log(err);
    }
}

const checkValidationofEthereumAddress = (value: string) => {
    if (value.length === 42) {
        return true;
    }
    return false;
}

/* get latest block number */

const getLatestBlockNumber = async () => {
    try {
        const blockNumber = await web3.eth.getBlockNumber();
        return blockNumber;
    }
    catch (err) {
        console.log(err);
    }
}



// export all functions as good.method 
const Eth = {
    checkValidationofEthereumAddress,
    getBalanceofToken,
    getEtherBalance,
    getLatestBlockNumber,
}

export default Eth;