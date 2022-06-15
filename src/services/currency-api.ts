import { baseCurrency } from '../app/constants/constants';

const API_KEY: string = '104355df05805172151bab4a'
const url: string = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`

export const currencyAPI = {
    url,
}