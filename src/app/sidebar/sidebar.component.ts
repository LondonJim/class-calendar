import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ImageDetails } from "src/assets/image-list";
import { DailyLayoutService } from "src/app/services/daily-layout.service";
import { ScreenDisplayModel } from "src/app/models/screen-display.model";
import { ColorPickerControl } from "@iplab/ngx-color-picker";
import {Subscribable, Subscription} from "rxjs";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  DEFAULT_COORDINATES = {  x: 100, y: 100, z: 100, size: 100, edit: false }
  imageDetails = ImageDetails;
  valueColor: string;

  public githubControl = new ColorPickerControl();
  valueColorSubscription: Subscription;

  @Output() valueColorEvent = new EventEmitter<string>();

  constructor(private dailyLayoutService: DailyLayoutService) { }

  ngOnInit(): void {
    this.githubControl.setValueFrom('#000000')
    this.githubControl.setColorPresets([
      '#000000',
      '#FFFFFF',
      '#1E90FF',
      '#008000',
      '#DC143C',
      '#FF69B4',
      '#9370DB',
      '#FF8C00',
      '#A9A9A9',
      '#808080',
      '#00008B',
      '#90EE90',
      '#B22222',
      '#FFB6C1',
      '#800080',
      '#FFD700',
    ])
    this.valueColorSubscription = this.githubControl.valueChanges.subscribe((color) => {
      let selectedColor: string;
      selectedColor = `rgb(${color["rgba"].red},${color["rgba"].green},${color["rgba"].blue})`;
      console.log(selectedColor)
      this.valueColorEvent.emit(selectedColor);
    })
  }

  onAddImage(selectedImageIndex) {
    const imageDetails = this.imageDetails.filter(({ index }) => index === selectedImageIndex)
    const newImage: ScreenDisplayModel = { ...imageDetails[0], ...this.DEFAULT_COORDINATES };
    this.dailyLayoutService.addImage('monday', newImage)
  }
}
