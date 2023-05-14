import React, { useContext } from 'react';

import './TodoList.scss';

import { TodoInfo } from '../TodoInfo';
import { TodoSelect } from '../TodoSelect/TodoSelect';

import { ProductContext } from '../../ProductContext';
import { TodoListContext } from './TodoListContext';

export const TodoList: React.FC = React.memo(
  () => {
    const { products, colors } = useContext(ProductContext);

    return (
      <section className="TodoList">
        <TodoSelect />

        {products.map((product) => (
          <TodoListContext.Provider value={{ product, colors }}>
            <TodoInfo
              key={product.id}
            />
          </TodoListContext.Provider>
        ))}
      </section>
    );
  },
);
