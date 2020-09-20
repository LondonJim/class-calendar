import {Component} from '@angular/core';
import { SplitComponent, SplitAreaDirective } from 'angular-split';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'class-calendar';
  paintBrush: {selectedColor: string, paintBrushSize: number};
}
