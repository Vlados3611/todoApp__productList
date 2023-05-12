import { Color } from './Color';

export interface Product {
  id: number,
  title: string,
  selected: boolean,
  colorId: number,
  currentColor?: Color | undefined,
}
