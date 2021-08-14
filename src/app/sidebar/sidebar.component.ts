import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { ImageDetails } from "src/assets/image-list";
import { DailyLayoutService } from "src/app/services/daily-layout.service";
import { ScreenDisplayModel } from "src/app/models/screen-display.model";
import { ColorPickerControl } from "@iplab/ngx-color-picker";
import { Subscription } from "rxjs";
import Swal from "sweetalert2";
import {ImageDetailModel} from "../models/image-detail.model";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  DEFAULT_COORDINATES = {  x: 100, y: 100, z: 100, size: 100, edit: false }
  paintBrushSizes = [3, 5, 7, 9, 11, 13, 15]
  imageDetails = ImageDetails;
  selectedImageDetail: ImageDetailModel;
  valueColor: string;
  selectedPaintBrushSize: number = 3;
  selectedColor: string = 'rgb(0,0,0)';
  selectedTime: string;
  selectedTitle: string;

  public githubControl = new ColorPickerControl();
  valueColorSubscription: Subscription;

  @Output() paintBrushEvent = new EventEmitter<{selectedColor: string, paintBrushSize: number}>();
  @Output() deleteDrawing = new EventEmitter();

  @ViewChild('iconAttributation',{static: false}) iconAttributation: ElementRef;
  @ViewChild('addImagePopUp',{static: false}) addImagePopUp: ElementRef;

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
      this.selectedColor = `rgb(${color["rgba"].red},${color["rgba"].green},${color["rgba"].blue})`;
      this.emitPaintBrush();
    })
    this.emitPaintBrush();
  }

  onSelectBrushSize(paintBrushSize) {
    this.selectedPaintBrushSize = paintBrushSize;
    this.emitPaintBrush()
  }

  emitPaintBrush() {
    this.paintBrushEvent.emit({selectedColor: this.selectedColor, paintBrushSize: this.selectedPaintBrushSize});
  }

  onAddImage(selectedImageIndex) {
    const imageDetails = this.imageDetails.filter(({ index }) => index === selectedImageIndex)
    let newImage: ScreenDisplayModel = { ...imageDetails[0], ...this.DEFAULT_COORDINATES };
    this.selectedImageDetail = imageDetails[0];
    this.selectedTitle = imageDetails[0].tag;
    this.selectedTime = '';
    Swal.fire({
      title: 'Adding Image',
      html: this.addImagePopUp.nativeElement,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Confirm'
    }).then((result) => {
      if (result.isConfirmed) {
        newImage = {...newImage, tag: `${this.selectedTime ? this.selectedTime + ' - ' : ''}${this.selectedTitle}`}
        this.dailyLayoutService.addImage(newImage);
      }
    })
  }

  onDisplayFullScreen(isDisplayFullScreen) {
    this.dailyLayoutService.resetEditMode();
    this.dailyLayoutService.displayFullScreen(isDisplayFullScreen);
  }

  onDeleteDrawing() {
    Swal.fire({
      title: 'Do you want to delete the drawing?',
      showDenyButton: true,
      confirmButtonText: `Yes`,
      denyButtonText: `No`,
      width: 600,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.deleteDrawing.emit(true);
        setTimeout(() => {
          this.deleteDrawing.emit(false);
        })
      }
    })
  }

  onDeleteImages() {
    Swal.fire({
      title: 'Do you want to delete the images?',
      showDenyButton: true,
      confirmButtonText: `Yes`,
      denyButtonText: `No`,
      width: 600,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.dailyLayoutService.deleteImages();
      }
    })
  }

  onDeleteAll() {
    Swal.fire({
      title: 'Do you want to delete the entire page?',
      showDenyButton: true,
      confirmButtonText: `Yes`,
      denyButtonText: `No`,
      width: 600,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        setTimeout(() => {
          this.dailyLayoutService.deleteImages();
        })
        setTimeout(() => {
          this.deleteDrawing.emit(true);
        })
      }
    })
  }

  onIconAttributation() {
    Swal.fire({
      html: this.iconAttributation.nativeElement
    })
  }

  test(e) {
    console.log(e)
  }
}
