import { Component, OnInit, Input } from '@angular/core';
import { Pizza } from 'src/app/models/pizza';

@Component({
  selector: 'app-show-all',
  templateUrl: './show-all.component.html',
  styleUrls: ['./show-all.component.css']
})
export class ShowAllComponent implements OnInit {
  @Input() pizzas: Pizza[] = [];
  constructor() { }

  ngOnInit() {
  }
}
