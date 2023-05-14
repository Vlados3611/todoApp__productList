import React, { useState } from 'react';

import './TodoFilter.scss';
import { Product } from '../types/Product';

type Props = {
  products: Product[];
  sortBySelect: () => void;
  showAll: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  products,
  sortBySelect,
  showAll,
}) => {
  const [filterToggler, switchFilterToggler] = useState(false);
  const [touchedSelect, setTouchSelect] = useState(false);

  const productList = products.filter((product) => product.selected);

  return (
    <article className="TodoFilter">
      <button
        type="button"
        className="TodoFilter__toggler"
        onClick={() => switchFilterToggler(prevState => !prevState)}
      >
        filter settings &#10000;
      </button>
      {
        filterToggler && (
          <section className="TodoFilter__sectionList">
            <button
              type="button"
              className="btn btn-outline-success TodoFilter__button"
              onClick={() => {
                sortBySelect();
                setTouchSelect(true);
              }}
              disabled={
                productList.length < 1
                || products.length === productList.length
              }
            >
              Show selected
            </button>
            <button
              type="button"
              className="btn btn-outline-success TodoFilter__button"
              onClick={() => {
                showAll();
                setTouchSelect(false);
              }}
              disabled={!touchedSelect}
            >
              Show All
            </button>
          </section>
        )
      }
    </article>
  );
};
