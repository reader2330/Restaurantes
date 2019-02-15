import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.sass']
})
export class InicioComponent implements OnInit {
  state = 1;
  constructor() { }

  ngOnInit() {
  }


  responseChildren(evt) {
    this.state = evt.value;
  }

  goTap(num) {
    this.state = num;
  }

}
