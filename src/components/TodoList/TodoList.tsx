import React from 'react';

import './TodoList.scss';

import { Product } from '../../types/Product';
import { Color } from '../../types/Color';
import { TodoInfo } from '../TodoInfo';
import { TodoSelect } from '../TodoSelect/TodoSelect';

type Props = {
  products: Product[];
  colors: Color[];
  onDelete: (productId: number) => void;
  onRename: (productId: number, title: string, colorId: number) => void;
  onSelect: (productId: number, selected: boolean) => void;
  changeAll: (selected: boolean) => void;
};

export const TodoList: React.FC<Props> = React.memo(
  ({
    products,
    colors,
    onDelete,
    onRename,
    onSelect,
    changeAll,
  }) => {
    return (
      <section className="TodoList">
        <TodoSelect
          products={products}
          changeAll={changeAll}
        />
        {products.map((product) => (
          <TodoInfo
            key={product.id}
            product={product}
            colors={colors}
            onDelete={onDelete}
            onRename={onRename}
            onSelect={onSelect}
          />
        ))}
      </section>
    );
  },
);
