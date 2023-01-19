import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent {
  Arr = Array; 
  @Input() indentNum: number = 0;
  @Input() label: string = "label";
  @Input() text: string = "something";
  @Input() type: string = "string";
  @Input() array: boolean = false;
}
