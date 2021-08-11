import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'class-calendar';
  paintBrush: {selectedColor: string, paintBrushSize: number};
  deleteDrawing: boolean;
}
