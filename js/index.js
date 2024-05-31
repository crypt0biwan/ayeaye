let ethereum_instance

if(!ethereum && window.ethereum) {
    ethereum_instance = window.ethereum
} else {
    ethereum_instance = ethereum
}

// OG 2015 Aye Aye
const abi = [
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
        "name": "sendCoin",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "coinBalance",
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
                "name": "_param1",
                "type": "address"
            }
        ],
        "name": "coinBalanceOf",
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
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
        ],
        "name": "CoinTransfer",
        "type": "event"
    }
]
const contractAddress = '0x3eddc7ebc7db94f54b72d8ed1f42ce6a527305bb'

// Wrapped Aye Aye (WAAC)
const wrapperAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"allowance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientAllowance","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientBalance","type":"error"},{"inputs":[{"internalType":"address","name":"approver","type":"address"}],"name":"ERC20InvalidApprover","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC20InvalidReceiver","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"ERC20InvalidSender","type":"error"},{"inputs":[{"internalType":"address","name":"spender","type":"address"}],"name":"ERC20InvalidSpender","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":true,"internalType":"address","name":"owner","type":"address"}],"name":"ClaimedAndWrapped","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"}],"name":"DropBoxCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":true,"internalType":"address","name":"owner","type":"address"}],"name":"Unwrapped","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":true,"internalType":"address","name":"owner","type":"address"}],"name":"Wrapped","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"claimAndWrap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"createDropBox","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"dropBoxes","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"unwrap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"wrap","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const wrapperContractAddress = '0x30ae41d5f9988d359c733232c6c693c0e645c77e'

let provider = false
let contract = false
let wrapperContract = false

if (ethereum_instance) {
    provider = new ethers.providers.Web3Provider(ethereum_instance)
}

if (!provider) {
    console.error("Your browser is not web3 enabled.")
    error.classList.remove('d-none')
}

const addressInput = document.querySelector('#address')
const loader = document.querySelector('#loader')
const info = document.querySelector('#info')
const txinfo = document.querySelector('#txinfo')
const error = document.querySelector('#error')
const infoTableBody = document.querySelector('#info-table tbody')
const txInfoTableBody = document.querySelector('#txinfo-table tbody')

const known_addresses = [
    {
        address: '0x299f9496781d6a469c838abd7dc7bb0351c54532',
        label: 'ClaimAyeAye contract'
    },
    {
        address: '0x8fa4bfaafb319a3e2359398b1cad54ab5cf84414',
        label: 'AyeAyeGet contract'
    },
    {
        address: '0x3eddc7ebc7db94f54b72d8ed1f42ce6a527305bb',
        label: 'AyeAye OG contract'
    },
    {
        address: '0x30ae41d5f9988d359c733232c6c693c0e645c77e',
        label: 'Wrapper'
    },
    {
        address: '0xcd063b3081ea55535e5b60a21eff7f14e785a877',
        label: 'AyeAye Deployer'
    }
]

const formatValue = (value, decimals = 2, style = 'decimal') =>
	new Intl.NumberFormat('en-US', {
		style,
		currency: 'USD',
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals,
	}).format(value)

async function getContractInfo(address) {
    try {
        console.log(`getContractInfo(${address})`)

        const balance = await contract.coinBalanceOf(address)
        const wrappedBalance = await wrapperContract.balanceOf(address)

        await new Promise(r => setTimeout(r, 300))

        infoTableBody.innerHTML = `
            <tr><td>Unwrapped Balance</td><td>${formatValue(balance, 0)}</td></tr>
            <tr><td>Wrapped Balance (WAAC)</td><td>${formatValue(wrappedBalance, 0)}</td></tr>
            <tr><td><b>Total</b></td><td><b>${formatValue(parseInt(balance) + parseInt(wrappedBalance), 0)}</b></td></tr>
        `
        
        const eventAbi = [
            "event CoinTransfer(address indexed sender, address indexed receiver, uint indexed amount)"
        ]

        const eventContract = await new ethers.Contract(contractAddress, eventAbi, provider)
        const latestTransactionBlock = txs_archive[txs_archive.length-1].blockNumber
        const blockNumberFrom = latestTransactionBlock + 1
        const blockNumberTo = await provider.getBlockNumber()

        console.log(`Getting txs from block ${blockNumberFrom} to ${blockNumberTo}`)
        
        const txs = await eventContract.queryFilter("CoinTransfer", blockNumberFrom, blockNumberTo)
        
        let tableHTML = ''
        
        const all_txs = [...txs_archive, ...txs]
        let show_txs = false
        
        all_txs.reverse().forEach(tx => {
            const { data, transactionHash, blockNumber, transactionIndex } = tx
            const [sender, receiver, amount] = ethers.utils.defaultAbiCoder.decode(
                ['address', 'address', 'uint256'],
                data
            )
                
            if(sender.toLowerCase() === address.toLowerCase() || receiver.toLowerCase() === address.toLowerCase()) {
                const known_sender = known_addresses.find(a => a.address === sender.toLowerCase())
                const known_receiver = known_addresses.find(a => a.address === receiver.toLowerCase())

                show_txs = true

                tableHTML += `
                    <tr>
                        <td class="text-nowrap">${formatValue(blockNumber, 0)}</td>
                        <td class="text-nowrap">${transactionIndex}</td>
                        <td class="text-nowrap"><a href="?address=${sender}">${known_sender ? known_sender.label : sender}</a></td>
                        <td class="text-nowrap">➡️ <a href="?address=${receiver}">${known_receiver ? known_receiver.label : receiver}</a></td>
                        <td class="text-nowrap">${formatValue(parseInt(amount, 10), 0)}</td>
                        <td class="text-nowrap"><a target="_blank" href="https://etherscan.io/tx/${transactionHash}">${transactionHash}</a></td>
                    </tr>
                `
            }
        })

        txInfoTableBody.innerHTML = tableHTML

        loader.classList.add('d-none')
        info.classList.remove('d-none')

        if(show_txs) {
            txinfo.classList.remove('d-none')
        }
    } catch(e) {
        console.error(e)
        loader.classList.add('d-none')
        info.classList.add('d-none')
        txinfo.classList.add('d-none')
        error.classList.remove('d-none')
    }
}

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
})

function checkAddress(address) {
    if(params?.address !== address) {
        window.history.pushState('', '', `?address=${address}`)
    }

    infoTableBody.innerHTML = ''
    txInfoTableBody.innerHTML = ''

    loader.classList.remove('d-none')
    error.classList.add('d-none')
    info.classList.add('d-none')
    txinfo.classList.add('d-none')
    
    getContractInfo(address)
}

addressInput.addEventListener('change', async function(e) {
    e.preventDefault();

    checkAddress(e.target.value)
})

async function init() {
    try {
        contract = await new ethers.Contract(contractAddress, abi, provider)
        wrapperContract = await new ethers.Contract(wrapperContractAddress, wrapperAbi, provider)

        if(params?.address) {
            document.querySelector('#address').value = params.address
            
            checkAddress(params.address)
        }
    } catch(e) {
        console.error(e)
        loader.classList.add('d-none')
        info.classList.add('d-none')
        txinfo.classList.add('d-none')
        error.classList.remove('d-none')
    }
}

init()