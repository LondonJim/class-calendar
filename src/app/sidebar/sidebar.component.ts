import { Component, OnInit } from '@angular/core';
import { ImageDetails } from "src/app/image-list/image-list";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  imageDetails = ImageDetails;

  constructor() { }

  ngOnInit(): void {
    console.log(this.imageDetails)
  }

}
