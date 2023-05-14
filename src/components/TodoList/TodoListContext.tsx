import { createContext } from 'react';

import { Product } from '../../types/Product';
import { Color } from '../../types/Color';

type State = {
  product: Product;
  colors: Color[];
};

export const TodoListContext = createContext<State>({
  product: {
    id: 0,
    title: '',
    selected: false,
    colorId: 0,
    currentColor: {
      id: 0,
      color: '',
    },
  },
  colors: [],
});
