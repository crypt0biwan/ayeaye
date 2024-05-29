const { ethereum } = window;

const abi = [{"constant":true,"inputs":[{"name":"_param1","type":"address"}],"name":"coinBalanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]
const contractAddress = '0x3eddc7ebc7db94f54b72d8ed1f42ce6a527305bb'

let provider = false

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
const addressInfo = document.querySelector('#addressInfo')
const error = document.querySelector('#error')

const formatValue = (value, decimals = 2, style = 'decimal') =>
	new Intl.NumberFormat('en-US', {
		style,
		currency: 'USD',
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals,
	}).format(value)

async function getContractInfo(address) {
    try {
        const contract = await new ethers.Contract(contractAddress, abi, provider)
        const balance = await contract.coinBalanceOf(address)

        await new Promise(r => setTimeout(r, 300))

        addressInfo.innerHTML = `This address has an <u>unwrapped</u> balance of <b>${formatValue(balance, 0)}</b> Aye`

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

    addressInfo.innerHTML = ''

    loader.classList.remove('d-none')
    error.classList.add('d-none')
    info.classList.add('d-none')

    getContractInfo(e.target.value)
})