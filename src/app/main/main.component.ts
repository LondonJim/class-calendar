import { Component, OnInit } from '@angular/core';
import { ImageDetails } from "src/assets/image-list";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  imageDetails = ImageDetails;

  constructor() { }

  ngOnInit(): void {
  }

}
