import React, { useState, useContext } from 'react';

import './TodoFilter.scss';

import { ProductContext } from '../ProductContext';
import { Product } from '../types/Product';

export const TodoFilter: React.FC = () => {
  const {
    products,
    sortBySelect,
    showAll,
  } = useContext(ProductContext);

  const [filterToggler, switchFilterToggler] = useState<boolean>(false);
  const [touchedSelect, setTouchSelect] = useState<boolean>(false);

  const productList = products.filter((product: Product) => product.selected);

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
