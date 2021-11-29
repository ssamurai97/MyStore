import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'store-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
   pageTitle: string = "Home"
  constructor() { }

  ngOnInit(): void {
  }

}
