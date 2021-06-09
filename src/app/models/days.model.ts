import { ScreenDisplayModel } from '../models/screen-display.model';

export class DaysModel {
  monday: {images: ScreenDisplayModel[], canvas: HTMLCanvasElement};
  tuesday: {images: ScreenDisplayModel[], canvas: HTMLCanvasElement};
  wednesday: {images: ScreenDisplayModel[], canvas: HTMLCanvasElement};
  thursday: {images: ScreenDisplayModel[], canvas: HTMLCanvasElement};
  friday: {images: ScreenDisplayModel[], canvas: HTMLCanvasElement};
}
