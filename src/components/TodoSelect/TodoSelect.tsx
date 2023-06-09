import React, { useState, useEffect, useContext } from 'react';

import classNames from 'classnames';

import './TodoSelect.scss';

import { TodoFilter } from '../../TodoFilter/TodoFilter';

import { ProductContext } from '../../ProductContext';
import { Product } from '../../types/Product';

export const TodoSelect: React.FC = () => {
  const {
    products,
    changeAll,
  } = useContext(ProductContext);

  const [productsList, setProductToList] = useState<Product[]>(products);

  const fitleredProductsBySelect: Product[] = productsList.filter(
    (product: Product) => (
      product.selected
    ),
  );

  useEffect(() => {
    setProductToList(products.filter(
      (product) => product.selected,
    ));
  }, [products]);

  return (
    <>
      <article className="TodoSelect">
        <section className="TodoSelect__section">
          <section className="TodoSelect__selectButtons">
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={() => {
                changeAll(true);
              }}
              disabled={
                fitleredProductsBySelect.length === products.length
              }
            >
              Select All
            </button>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => changeAll(false)}
              disabled={fitleredProductsBySelect.length < 1}
            >
              Remove select
            </button>
          </section>

          <p
            className={classNames(
              'TodoSelect__title',
              {
                'TodoSelect__title--selected': productsList.length,
              },
            )}
          >
            {`Selected items: ${productsList.length}`}
          </p>
        </section>

        <TodoFilter />
      </article>
    </>
  );
};
