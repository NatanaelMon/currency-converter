const button = document.querySelector('button')
const select = document.getElementById('select')


//Usando async await para esperar os dados chegarem do servidor para então usar na aplicação
const convertValues = async () => {
    const inputReais = document.getElementById('input-value').value
    const placeholderReais = document.getElementById('value-real-text')
    const placeholderDolar = document.getElementById('value-dolar-text')

    const data = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL").then(response => response.json())

    const dólar = data.USDBRL.high
    const bitcoin = data.BTCBRL.high
    const euro = data.EURBRL.high

    const result = (inputReais / dólar).toFixed(2)
    const resultBitcoin = inputReais / bitcoin
    const resultEuro = (inputReais / euro).toFixed(2)
    if (select.value === '$ Dólar americano') {
        placeholderReais.innerHTML = `R$ ${inputReais},00`
        placeholderDolar.innerHTML = `$ ${result}`
    }

    if (select.value === '€ Euro') {
        placeholderReais.innerHTML = `R$ ${inputReais},00`
        placeholderDolar.innerHTML = `€ ${resultEuro}`
    }
    if (select.value === '₿ Bitcoin') {
        placeholderReais.innerHTML = `R$ ${inputReais},00`
        placeholderDolar.innerHTML = `₿ ${resultBitcoin}`
    }
    else if (inputReais === "") {
        placeholderReais.innerHTML = `R$ 0${inputReais},00`

    }
}

const changeValues = () => {
    const selectName = document.getElementById('currency-name-value')
    const imgChange = document.getElementById('img-changed')

    if (select.value === '€ Euro') {
        selectName.innerHTML = '€ Euro'
        imgChange.src = "./assets/euro.svg"
    }
    if (select.value === '$ Dólar americano') {
        selectName.innerHTML = '$ Dólar americano'
        imgChange.src = "./assets/eua.svg"
    }
    if (select.value === '₿ Bitcoin') {
        selectName.innerHTML = '₿ Bitcoin'
        imgChange.src = "./assets/bitcoin.svg"
    }
    convertValues()
}

select.addEventListener('change', changeValues)
button.addEventListener('click', convertValues)
