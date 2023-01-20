import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormArray } from '@angular/forms';

import schema from '../mock-schema'
import Types, { typeTest } from '../types'

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent implements OnInit {
  Arr = Array;
  form!: FormGroup;
  firstClick: boolean = false;
  result: string[][] = [];
  sortedResult: string[][] = [];
  errorArray: boolean[] = [];
  @Input() indentNum: number = 0;

  mockData = {
    "name": "Dieter",
    "age": 38,
    "birthdate": "1985-01-04",
    "residence": {
      "country": "Germany",
      "city": "Berlin"
    },
    "wishlist": ["monitor", "car", "mobile phone"]
  }
  
  verify(): void {
    this.firstClick = true;

    for (let i = 0; i < this.sortedResult.length; i++) {
      if (this.sortedResult[i][2]) {
        let value: string = (<HTMLInputElement>document.getElementById(this.sortedResult[i][0])).value;
        let index: string = this.sortedResult[i][1];

        if (Object.values(Types).indexOf(index) >= 0) {
          let type: Types = index as unknown as Types;

          this.errorArray[i] = typeTest(value, type);
        }   
      }
    }

    console.log(this.errorArray);
  }

  getData(value: string): FormArray {
    return this.form.get(value) as FormArray;
  }
  
  addField(value: string): void {
    this.getData(value).push(this.fb.group({ 0: null }));
  }

  removeField(value: string, index: number): void {
    if (this.getData(value).length > 1) {
      this.getData(value).removeAt(index);
    } else {
      this.getData(value).patchValue([{ 0: null }]);
    }
  }

  checkArrayType(value: string): boolean {
    for (const type in Types) {
      if (value === type) {
        return false;
      } else if (value === type.concat("[]")) {
        return true;
      }
    }

    throw new Error(`Non-existent type: ${value}`);
  }

  checkValue(value: string, iteration: string): string[] {
    for (const type in Types) {
      if (value === type || value === type.concat("[]")) {
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
    let index: number = 0;
    
    for (let i = 1; i < this.result.length-1; i++) {
      if (this.result[i-1][0] === "value" && this.result[i][0] === "type") {       
        this.sortedResult.push([this.result[i-1][1], this.result[i][1], this.result[i][2], index.toString()]);
        index++;
      } else if (this.result[i-1][0] === "value" && this.result[i][0] === "value") {
        this.sortedResult.push([this.result[i-1][1], this.result[i][2]]);
      } else if (this.result[i-1][0] === "/") {
        this.sortedResult.push(["/"]);
      }
    }
  }

  formBuilder() {
    let array: any[] = [];
    let temp: object = {};

    for (let i = 0; i < this.sortedResult.length; i++) {
      if (this.sortedResult[i][2]) {
        let value: string = this.sortedResult[i][1];

        for (const type in Types) {
          if (value === type) {
            array.push("bb");
          } else if (value === type.concat("[]")) {
            array.push(this.buildData(["a", "b", "c", "d"]));
          }
        }
      }
    }

    Object.assign(temp, array);

    this.form = this.fb.group(temp);
  }

  buildData(data: string[] = []) {
    return this.fb.array(data.map(val => this.fb.group(val)));
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {   
    for (let [key, value] of Object.entries(schema)) {
      this.result.push(this.checkValue(key, "0"));
      this.split(value, 0);
      this.result.push(["/"]);
    }

    this.sort();

    this.formBuilder();

    console.log(this.result);
    console.log(this.sortedResult);
    console.log(this.form);
  }
}
