import { createContext } from 'react';
import { Product } from './types/Product';
import { Color } from './types/Color';

type State = {
  products: Product[],
  colors: Color[],
  onDelete: (productId: number) => void;
  onRename: (productId: number, title: string, colorId: number) => void;
  onSelect: (productId: number, selected: boolean) => void;
  changeAll: (selected: boolean) => void;
  sortBySelect: () => void;
  showAll: () => void;
};

export const ProductContext = createContext<State>(
  {
    products: [],
    colors: [],
    onDelete() {},
    onRename() {},
    onSelect() {},
    changeAll() {},
    sortBySelect() {},
    showAll() {},
  },
);
