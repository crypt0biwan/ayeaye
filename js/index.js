const { ethereum } = window;

// OG 2015 Aye Aye
const abi = [{"constant":true,"inputs":[{"name":"_param1","type":"address"}],"name":"coinBalanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]
const contractAddress = '0x3eddc7ebc7db94f54b72d8ed1f42ce6a527305bb'

// Wrapped Aye Aye (WAAC)
const wrapperAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"allowance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientAllowance","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientBalance","type":"error"},{"inputs":[{"internalType":"address","name":"approver","type":"address"}],"name":"ERC20InvalidApprover","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC20InvalidReceiver","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"ERC20InvalidSender","type":"error"},{"inputs":[{"internalType":"address","name":"spender","type":"address"}],"name":"ERC20InvalidSpender","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":true,"internalType":"address","name":"owner","type":"address"}],"name":"ClaimedAndWrapped","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"}],"name":"DropBoxCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":true,"internalType":"address","name":"owner","type":"address"}],"name":"Unwrapped","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":true,"internalType":"address","name":"owner","type":"address"}],"name":"Wrapped","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"claimAndWrap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"createDropBox","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"dropBoxes","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"unwrap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"wrap","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const wrapperContractAddress = '0x30ae41d5f9988d359c733232c6c693c0e645c77e'

let provider = false
let contract = false
let wrapperContract = false

if (ethereum) {
    provider = new ethers.providers.Web3Provider(ethereum)
}

if (!provider) {
    console.error("Your browser is not web3 enabled.")
    error.classList.remove('d-none')
}

const addressInput = document.querySelector('#address')
const loader = document.querySelector('#loader')
const info = document.querySelector('#info')
const error = document.querySelector('#error')
const infoTableBody = document.querySelector('#info-table tbody')

const formatValue = (value, decimals = 2, style = 'decimal') =>
	new Intl.NumberFormat('en-US', {
		style,
		currency: 'USD',
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals,
	}).format(value)

async function getContractInfo(address) {
    try {
        const balance = await contract.coinBalanceOf(address)
        const wrappedBalance = await wrapperContract.balanceOf(address)

        await new Promise(r => setTimeout(r, 300))

        infoTableBody.innerHTML = `
            <tr><td>Unwrapped Balance</td><td>${formatValue(balance, 0)}</td></tr>
            <tr><td>Wrapped Balance (WAAC)</td><td>${formatValue(wrappedBalance, 0)}</td></tr>
            <tr><td><b>Total</b></td><td><b>${formatValue(parseInt(balance) + parseInt(wrappedBalance), 0)}</b></td></tr>
        `
        
        loader.classList.add('d-none')
        info.classList.remove('d-none')
    } catch(e) {
        console.error(e)
        loader.classList.add('d-none')
        info.classList.add('d-none')
        error.classList.remove('d-none')
    }
}

addressInput.addEventListener('change', async function(e) {
    e.preventDefault();

    infoTableBody.innerHTML = ''

    loader.classList.remove('d-none')
    error.classList.add('d-none')
    info.classList.add('d-none')

    getContractInfo(e.target.value)
})

async function init() {
    try {
        contract = await new ethers.Contract(contractAddress, abi, provider)
        wrapperContract = await new ethers.Contract(wrapperContractAddress, wrapperAbi, provider)
    } catch(e) {
        console.error(e)
        loader.classList.add('d-none')
        info.classList.add('d-none')
        error.classList.remove('d-none')
    }
}

init()