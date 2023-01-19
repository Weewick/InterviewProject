import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css']
})
export class LabelComponent {
  Arr = Array; 
  @Input() indentNum: number = 0;
  @Input() label: string = "label";
}
