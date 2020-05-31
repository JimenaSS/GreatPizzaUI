import { Topping } from './topping';

export class Pizza {
    constructor(
        public name: string,
        public toppings: Array<Topping>
      ) {  }
}
