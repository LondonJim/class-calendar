import { Component, OnInit } from '@angular/core';
import { ImageDetails } from "src/assets/image-list";
import { DailyLayoutService } from "src/app/services/daily-layout.service";
import { ScreenDisplayModel } from "src/app/models/screen-display.model";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  DEFAULT_COORDINATES = {  x: 100, y: 100, z: 100, size: 100, edit: false }
  imageDetails = ImageDetails;

  constructor(private dailyLayoutService: DailyLayoutService) { }

  ngOnInit(): void {}

  onAddImage(selectedImageIndex) {
    const imageDetails = this.imageDetails.filter(({ index }) => index === selectedImageIndex)
    const newImage: ScreenDisplayModel = { ...imageDetails[0], ...this.DEFAULT_COORDINATES };
    this.dailyLayoutService.addImage('monday', newImage)
  }
}
