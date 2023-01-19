import { Component, Input, OnInit } from '@angular/core';

import schema from '../mock-schema'
import Types, { typeTest } from '../types'

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent implements OnInit {
  Arr = Array;
  result: string[][] = [];
  sortedResult: string[][] = [];
  @Input() indentNum: number = 0;
  
  verify(): void {
    for (let i = 0; i < this.sortedResult.length; i++) {
      if (this.sortedResult[i][2]) {
        let value: string = (<HTMLInputElement>document.getElementById(this.sortedResult[i][0])).value;
        let index: string = this.sortedResult[i][1];

        if (Object.values(Types).indexOf(index) >= 0) {
          let type: Types = index as unknown as Types;

          console.log(value);
          console.log(typeTest(value, type));
        }   
      }
    }
  }

  checkValue(value: string, iteration: string): string[] {
    for (const type in Types) {
      if (value === type || value.endsWith("[]", value.length+1)) {
        return ["type", value, iteration];
      }
    }

    return ["value", value, iteration];
  }

  split(object: object, iteration: number) {
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
