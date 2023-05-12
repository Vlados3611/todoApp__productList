import React, { useState, useEffect } from 'react';

import classNames from 'classnames';

import './TodoSelect.scss';

import { Product } from '../../types/Product';

type Props = {
  products: Product[];
  changeAll: (selected: boolean) => void;
};

export const TodoSelect: React.FC<Props> = ({
  products,
  changeAll,
}) => {
  const [fitleredProducts, setFilterToProducts] = useState(products);

  useEffect(() => {
    setFilterToProducts(products.filter(
      (product) => product.selected === true,
    ));
  }, [products]);

  return (
    <article className="TodoSelect">
      <section>
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={() => changeAll(true)}
        >
          Select All
        </button>
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={() => changeAll(false)}
        >
          Remove select
        </button>
      </section>

      <p
        className={classNames(
          'TodoSelect__title',
          {
            'TodoSelect__title--selected': fitleredProducts.length,
          },
        )}
      >
        {`Selected items: ${fitleredProducts.length}`}
      </p>
    </article>

  );
};
