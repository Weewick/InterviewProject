import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

import schema from '../mock-schema'
import Types, { typeTest, buildValidationArray } from '../types'

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
  sortedData: any[] = [];
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
  
  verify(form: object): void {
    console.log(form);
  }

  getData(value: string): FormArray {
    return this.form.get(value) as FormArray;
  }

  getDataAt(value: string, index: string): FormGroup {
    return this.getData(value).get(index) as FormGroup;
  }
  
  addField(value: string): void {
    let str: string = "";
    
    for (let i = 0; i < this.sortedResult.length; i++) {
      if (this.sortedResult[i][3] && value === this.sortedResult[i][3]) {
        str = this.sortedResult[i][1];
        break;
      }
    }

    for (const type in Types) {
      if (str === type.concat("[]")) {
        this.getData(value).push(this.fb.group({ 0: ["", buildValidationArray(type as unknown as Types)] }));
      }
    }
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

  split(array: any[], object: any, iteration: number, bool: boolean) {
    if (typeof object === 'object' && !Array.isArray(object)) {
      for (let [key, value] of Object.entries(object)) {  
        if (bool) {
          if (key !== "dataType") {
            array.push(this.checkValue(key, iteration.toString()));
          }
        }
        this.split(array, value, iteration+1, bool);
      }
    } else {
      if (bool) {
        array.push(this.checkValue(object, iteration.toString()));
      } else {
        array.push(object);
      }
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
    let index: number = 0;
    
    for (let i = 0; i < this.sortedResult.length; i++) {
      if (this.sortedResult[i][2]) {
        let value: string = this.sortedResult[i][1];

        for (const type in Types) {
          if (value === type) {
            array.push([this.sortedData[index], buildValidationArray(type as unknown as Types)]);
          } else if (value === type.concat("[]")) {
            array.push(this.buildData(this.sortedData[index], buildValidationArray(type as unknown as Types)));
          }
        }
        index++;
      }
    }

    Object.assign(temp, array);

    this.form = this.fb.group(temp);
  }

  buildData(data: string[] = [], validationArray: any[]) {
    return this.fb.array(data.map(val => this.fb.group({ 0: [val, validationArray] })));
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {   
    for (let [key, value] of Object.entries(schema)) {
      this.result.push(this.checkValue(key, "0"));
      this.split(this.result, value, 0, true);
      this.result.push(["/"]);
    }

    for (let [key, value] of Object.entries(this.mockData)) {
      this.split(this.sortedData, value, 0, false);
    }

    this.sort();

    this.formBuilder();

    console.log(this.result);
    console.log(this.sortedResult);
    console.log(this.form);
    console.log(this.sortedData);
  }
}
