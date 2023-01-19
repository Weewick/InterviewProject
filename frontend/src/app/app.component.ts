import { Component, OnInit } from '@angular/core';

import schema from './mock-schema'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  result: string[][] = [];
  sortedResult: string[][] = [];
  
  verify() {
    console.log("verify");
  }

  checkValue(value: string, iteration: string): string[] {
    let result: string[];

    if (value === "string" || value === "number" || value === "date" ||
      value === "string[]" || value === "number[]" || value === "date[]") {
      result = ["type", value, iteration];
    } else {
      result = ["value", value, iteration]
    }

    return result;
  }

  split(object: object, iteration: number) {
    console.log(object, iteration);
    
    if (typeof object === 'object') {
      for (let [key, value] of Object.entries(object)) {  
        if (key !== "dataType") {
          this.result.push(this.checkValue(key, iteration.toString()));
        }
        this.split(value, iteration+1);
      }
    } else {
      this.result.push(this.checkValue(object, iteration.toString()));
    }
  }

  sort() {
    for (let i = 1; i < this.result.length-1; i++) {
      if (this.result[i-1][0] === "value" && this.result[i][0] === "type") {       
        this.sortedResult.push([this.result[i-1][1], this.result[i][1], this.result[i][2]]);
      } else if (this.result[i-1][0] === "value" && this.result[i][0] === "value") {
        this.sortedResult.push([this.result[i-1][1], this.result[i][2]]);
      } else if (this.result[i-1][0] === "/") {
        this.sortedResult.push(["/"]);
      }
    }
  }

  constructor() {
    for (let [key, value] of Object.entries(schema)) {
      this.result.push(this.checkValue(key, "0"));
      this.split(value, 0);
      this.result.push(["/"]);
    }

    this.sort();
  }

  ngOnInit() {
    console.log(this.result);
    console.log(this.sortedResult);
  }
}
