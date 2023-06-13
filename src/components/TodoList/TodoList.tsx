import React, { useContext } from 'react';

import './TodoList.scss';

import { TodoInfo } from '../TodoInfo';
import { TodoSelect } from '../TodoSelect/TodoSelect';

import { ProductContext } from '../../ProductContext';
import { TodoListContext } from './TodoListContext';

import { Product } from '../../types/Product';

export const TodoList: React.FC = React.memo(
  () => {
    const { products, colors } = useContext(ProductContext);

    const isLengthEqual = products.length < 1;

    return (
      <section className="TodoList">
        <TodoSelect />

        {
          products.map((product: Product) => (
            <TodoListContext.Provider value={{ product, colors }}>
              <TodoInfo
                key={product.id}
              />
            </TodoListContext.Provider>
          ))
        }

        {isLengthEqual && (
          <p className="TodoList__title">Products is not found</p>
        )}
      </section>
    );
  },
);
