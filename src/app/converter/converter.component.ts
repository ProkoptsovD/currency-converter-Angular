import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { getCurrencySymbol } from '@angular/common';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { baseCurrency } from '../constants/constants';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {
  @Input() currencyList: any;
  @Input() currencyRates: any;

  currencyLeft: string = baseCurrency;
  currencyRight: string = 'USD';
  amountRight: string = '';
  amountLeft: string = '';

  constructor() {}

  ngOnInit(): void {}
  ngOnChanges(): void{
      this.addSymbol()
  }
  onInputChange(event: any) {
    const { id, name } = event.target;
    const isNaN = Number.isNaN(event.target.value);
    
    if(isNaN) return Notify.failure('Please, enter a number, not a string');
    
    switch(name) {
      case 'left': {
        const converted = this.convert(id, this.currencyRight, this.amountLeft);
        console.log(converted);
        this.amountRight = converted === '0' ? '' : converted;
        
        break;
      }
      case 'right': {
        const converted = this.convert(id, this.currencyLeft, this.amountRight)
        this.amountLeft = converted === '0' ? '' : converted;
        console.log(converted);
        break;
      }
      default:
        throw new Error('Side is not defined');
    }

  }
  onSelectChangeLeft() {
    const converted = this.convert(this.currencyLeft, this.currencyRight, this.amountLeft);
    this.amountRight = converted === '0' ? '' : converted;
  }
  onSelectChangeRight() {
    const converted = this.convert(this.currencyRight, this.currencyLeft, this.amountRight);
    this.amountLeft = converted === '0' ? '' : converted;
  }
  convert(from: string, to: string, amount: string) {
    const doesToEqualBaseCurrency = to === baseCurrency;
    const areFromAndToEqual = to === from;
    const noBaseCurency = to !== baseCurrency && from !== baseCurrency;
    
    if (doesToEqualBaseCurrency) {
        return this.toFixed((this.currencyRates[to] / this.currencyRates[from]) * +amount, 2);
    }
    if (areFromAndToEqual) {
        return amount;
    }
    if (noBaseCurency) {
        return this.toFixed((this.currencyRates[to] / this.currencyRates[from]) * +amount, 2)
    }
    return this.toFixed(this.currencyRates[to] * this.currencyRates[from] * +amount, 2)
  }
  toFixed(num: number, precise: number) : string {
    return Number.isInteger(num) ? num.toString() : num.toFixed(precise).toString();
  }
  reset(event: any) {
    event.preventDefault();
    
    this.amountRight = '';
    this.amountLeft = '';
  }
  addSymbol(): any {
    this.currencyList = !this.currencyList ? [] : this.currencyList.reduce((acc: any, currency: string) => {
          acc = [...acc, {
              label: currency,
              symbol: getCurrencySymbol(currency, 'narrow'),
          }
        ]

        return acc;
    }, []);
  }
}