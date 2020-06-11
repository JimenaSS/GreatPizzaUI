import { Component, OnInit, Input } from '@angular/core';
import { Pizza } from 'src/app/models/pizza';
import { Topping } from 'src/app/models/topping';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})

export class ResultComponent implements OnInit {
  @Input() pizza: Pizza = new Pizza('', []);
  @Input() topping: Topping = new Topping('');

  isAddingTopping = false;

  constructor() {
  }

  ngOnInit() {
  }

  Delete(value: string) {
    console.log(value);
  }

  Add() {
    this.isAddingTopping = true;
  }

  StoreTopping(toppingValue: string) {
    this.pizza.toppings.push(new Topping(toppingValue));
    this.CancelTopping();
  }

  CancelTopping() {
    this.topping.name = '';
    this.isAddingTopping = false;
  }
}
