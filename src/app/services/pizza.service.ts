import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Pizza } from '../models/pizza';
import { Topping } from '../models/topping';
import { Config } from '../models/config';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';


@Injectable({
  providedIn: 'root'
})

export class PizzaService {
  errorMessage: string;
  private config: Config;

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {
    this.getConfig().subscribe(
      (data: Config) => this.config = { ...data },
      error => this.errorMessage = error.message
    );
  }

  public getAllPizzas(): Pizza[] {
    let pizzas = [];

    this.http.get<Pizza>(this.config.pizzaUrl)
      .pipe(
        catchError(this.errorHandler.handleError)
      )
      .subscribe(
        (data: any) => {
          data.forEach(pizzaElement => {
            pizzas.push(this.marshallPizza(pizzaElement, new Pizza('', [])));
          });
        },
        error => this.errorMessage = error
      );

    return pizzas;
  }

  public getPizzaByName(pizzaName: string): Pizza {
    let pizza = new Pizza('', []);

    this.http.get<Pizza>(this.config.pizzaUrl + pizzaName)
      .pipe(
        catchError(this.errorHandler.handleError)
      )
      .subscribe(
        (data: any) => {
          pizza = this.marshallPizza(data, pizza);
        },
        error => (this.errorMessage = error.Message)
      );

      return pizza;
  }

  private marshallPizza(data: any, pizza: Pizza): Pizza {
    if (data.name !== undefined && data.toppings !== undefined) {
      pizza.name = data.name;

      data.toppings.forEach(topping => {
        pizza.toppings.push(new Topping(topping.name));
      });
    }

    return pizza;
  }

  private getConfig() {
    return this.http.get('assets/config.json');
  }
}
