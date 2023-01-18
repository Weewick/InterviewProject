import { r3JitTypeSourceSpan } from '@angular/compiler';
import { Component, Input } from '@angular/core';

import validateType, { Types } from './types'

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent {
  @Input() label: string = "label";
  @Input() text: string = "something";
  @Input() type: validateType = { type: Types.string, array: false };
}
