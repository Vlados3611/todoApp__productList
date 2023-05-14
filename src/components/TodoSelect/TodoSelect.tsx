import React, { useState, useEffect } from 'react';

import classNames from 'classnames';

import './TodoSelect.scss';

import { Product } from '../../types/Product';
import { TodoFilter } from '../../TodoFilter/TodoFilter';

type Props = {
  products: Product[];
  changeAll: (selected: boolean) => void;
  sortBySelect: () => void;
  showAll: () => void;
};

export const TodoSelect: React.FC<Props> = ({
  products,
  changeAll,
  sortBySelect,
  showAll,
}) => {
  const [productsList, setProductToList] = useState(products);

  const fitleredProductsBySelect = productsList.filter((product) => (
    product.selected
  ));

  useEffect(() => {
    setProductToList(products.filter(
      (product) => product.selected === true,
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
              onClick={() => changeAll(true)}
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
        <TodoFilter
          products={products}
          sortBySelect={sortBySelect}
          showAll={showAll}
        />
      </article>
    </>
  );
};
