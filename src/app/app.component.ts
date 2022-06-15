import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notify } from 'notiflix';
import { currencyAPI } from 'src/services/currency-api';

const currencyToDisplay: string[] = [
  'USD',
  'UAH',
  'EUR',
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currencyList: any;
  currencyRates: any;
  lastUpdate: string = "Wed, 15 Jun 2022 00:00:01 +0000";
  nextUpdate: string = "Thu, 16 Jun 2022 00:00:01 +0000";

  constructor(private http: HttpClient){}

  ngOnInit(): void { 
    this.http.get<any>(currencyAPI.url).subscribe(data => {
      if (data.result === 'error') return Notify.failure('Couldn\'t get data from server');

      const { conversion_rates, time_last_update_utc, time_next_update_utc } = data;

        this.currencyList = conversion_rates;
        this.format(conversion_rates);
        this.lastUpdate = time_last_update_utc;
        this.nextUpdate = time_next_update_utc;
    })
  }

  format(data: Object): void {
    this.currencyList =  Object.keys(data).filter(currency => currencyToDisplay.includes(currency));
    this.currencyRates = data;
  }
}
