import {Component, AfterViewInit} from '@angular/core';

@Component({
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements AfterViewInit {
  subtitle: string;
  
  constructor() {
    this.subtitle = 'This is the Toitsu NG main page.';
  }
  
  ngAfterViewInit() {
  }

}
