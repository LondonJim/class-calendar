import { ImageDetailModel } from '../models/image-detail.model';

export class ScreenDisplayModel extends ImageDetailModel{
  x: number;
  y: number;
  z: number;
  size: number;
  edit: boolean;
}
