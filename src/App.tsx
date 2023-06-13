import React, { useState, useCallback } from 'react';

import classNames from 'classnames';

import './App.scss';

import productsFromServer from './api/products';
import colorsFromServer from './api/colors';

import { TodoList } from './components/TodoList/TodoList';

import { Product } from './types/Product';
import { Color } from './types/Color';

import { ProductContext } from './ProductContext';

enum SortType {
  SELECTED,
  NONE,
}

export const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(productsFromServer);
  const [todoTitle, setTodoTitle] = useState<string>('');
  const [todoColor, setTodoColor] = useState<string>('');
  const [titleTouch, setTitleTouch] = useState<boolean>(false);
  const [productTouch, setColorTouch] = useState<boolean>(false);

  const [sortType, setSortType] = useState<SortType>(SortType.NONE);

  const isTitleTouched: boolean = titleTouch && todoTitle.length < 1;
  const isColorTouched: boolean = productTouch && todoColor.length < 1;

  const findColorById = (colorId: number): Color | undefined => {
    const foundColor = colorsFromServer.find((color) => (
      color.id === colorId
    ));

    return foundColor || undefined;
  };

  const addTodoTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };

  const addTodoColor = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTodoColor(event.target.value);
  };

  const removeTodoChanges = () => {
    setTodoTitle('');
    setTodoColor('');
  };

  const onAdd = (event: React.FormEvent): void => {
    event.preventDefault();

    const addMaxId = (
      products.length !== 0
        ? Math.max(...products.map((product) => product.id))
        : 0
    );

    const newProduct = {
      id: addMaxId + 1,
      title: todoTitle,
      selected: false,
      colorId: Number(todoColor),
      color: findColorById(Number(todoColor)),
    };

    if (todoTitle.length > 0 && todoColor.length > 0) {
      setProducts((prevState: Product[]) => (
        [...prevState, newProduct]
      ));

      removeTodoChanges();

      setTitleTouch(false);
      setColorTouch(false);
    } else {
      setTitleTouch(true);
      setColorTouch(true);
    }
  };

  const onDelete = useCallback(
    (productId: number): void => {
      setProducts((prevState) => prevState.filter((state) => (
        state.id !== productId
      )));
    }, [],
  );

  const onRename = useCallback(
    (
      productId: number,
      title: string,
      colorId: number,
    ): void => {
      setProducts((prevState) => prevState.map((product) => {
        if (product.id !== productId) {
          return product;
        }

        return { ...product, title, colorId };
      }));
    }, [],
  );

  const onSelect = useCallback(
    (productId: number, selected: boolean): void => {
      setProducts((prevState: Product[]) => prevState.map(
        (product) => {
          if (product.id !== productId) {
            return product;
          }

          return { ...product, selected };
        },
      ));
    }, [],
  );

  const changeAllProducts = useCallback(
    (selected: boolean) => {
      setProducts((prevState: Product[]) => prevState.map(
        (product: Product) => {
          if (product.selected === selected) {
            return product;
          }

          return { ...product, selected };
        },
      ));
    }, [],
  );

  const getFilteredProducts = (
    productList: Product[],
    sortBy: SortType,
  ): Product[] => {
    const sortedProductList = productList.map((product: Product) => ({
      ...product,
      currentColor: findColorById(product.colorId),
    }));

    switch (sortBy) {
      case SortType.SELECTED:
        return sortedProductList.filter((product: Product) => (
          product.selected
        ));

      default:
        return sortedProductList;
    }
  };

  const sortBySelect = () => {
    setSortType(SortType.SELECTED);
  };

  const showAll = () => {
    setSortType(SortType.NONE);
  };

  const fitleredProducts: Product[] = getFilteredProducts(products, sortType);

  const value = {
    products: fitleredProducts,
    colors: colorsFromServer,
    onDelete,
    onRename,
    onSelect,
    changeAll: changeAllProducts,
    sortBySelect,
    showAll,
  };

  return (
    <div className="App">
      <form
        className="App__form form"
        onSubmit={onAdd}
        action="/api/users"
        method="POST"
      >
        <h1
          className="App__title"
        >
          Product List
        </h1>

        {isTitleTouched && (
          <span className="error">Please enter a title</span>
        )}

        <div className="field">
          <input
            className={classNames(
              'form__textInput',
              'form-control',
              {
                'error-border': isTitleTouched,
              },
            )}
            type="text"
            data-cy="titleInput"
            value={todoTitle}
            onChange={addTodoTitle}
            onBlur={() => setTitleTouch(true)}
            placeholder="Enter a title"
            maxLength={15}
          />
        </div>

        {(isColorTouched) && (
          <span className="error">Please choose a color</span>
        )}

        <div className="field">
          <select
            className={classNames(
              'form__selectColor',
              'form-control',
              {
                'error-border': isColorTouched,
              },
            )}
            data-cy="userSelect"
            value={todoColor}
            onChange={addTodoColor}
            onBlur={() => setColorTouch(true)}
          >
            <option
              value=""
              disabled
            >
              Choose a color
            </option>

            {colorsFromServer.map((currentColor) => (
              <option
                key={currentColor.id}
                value={currentColor.id}
              >
                {currentColor.color}
              </option>
            ))}

          </select>
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          className="btn btn-warning btn-todoAdd"
        >
          Add
        </button>
      </form>

      <ProductContext.Provider value={value}>
        <TodoList />
      </ProductContext.Provider>
    </div>
  );
};
