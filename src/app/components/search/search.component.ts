import { Component, ViewChild, OnInit } from '@angular/core';
import { Pizza } from 'src/app/models/pizza';
import { ResultComponent } from '../result/result.component';
import { PizzaService } from 'src/app/services/pizza.service';
import { ShowAllComponent } from '../show-all/show-all.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  @ViewChild(ShowAllComponent) showAll;
  @ViewChild(ResultComponent) result;

  pizza = new Pizza('', []);
  submitted = false;
  submittedAll = false;
  adding = false;
  editing = false;
  failed = false;
  errorMessage = '';

  constructor(private pizzaService: PizzaService) { }

  ngOnInit(): void {
  }

  GetAll() {
    const retrievedPizzas = this.pizzaService.getAllPizzas();

    if (this.pizzaService.errorMessage != undefined) {
      this.failed = true;
      this.errorMessage = this.pizzaService.errorMessage;
    } else if (retrievedPizzas.length > 0){
      this.showAll.pizzas = retrievedPizzas;
      this.submittedAll = true;
      this.submitted = this.adding = false;
    } else {
      this.errorMessage = 'No pizzas found.';
    }
  }
}
