import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { getCurrencySymbol } from '@angular/common';
import { baseCurrency } from '../constants/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() currencyList: any;
  @Input() lastUpdate: string = '';
  @Input() nextUpdate: string = '';

  filtered: any;

  constructor() {}

  ngOnInit(): void {}
  ngOnChanges(): void {
    this.filtered = this.format()
  }
  format(): any {
    return !this.currencyList ? [] : this.currencyList.reduce((acc: any, currency: string) => {
      if (currency !== baseCurrency) {
            acc = [...acc, {
              label: currency,
              symbol: getCurrencySymbol(currency, 'narrow'),
          }]
      }
      
        return acc;
    }, []);
  }
}
