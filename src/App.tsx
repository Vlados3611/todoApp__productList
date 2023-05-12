import React, { useState, useMemo } from 'react';

import './App.scss';

// import usersFromServer from './api/users';
// import todosFromServer from './api/todos';
import productsFromServer from './api/products';
import colorsFromServer from './api/colors';

import { TodoList } from './components/TodoList/TodoList';

import { Product } from './types/Product';
import { Color } from './types/Color';

export const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(productsFromServer);
  const [todoTitle, setTodoTitle] = useState('');
  const [todoColor, setTodoColor] = useState('');
  const [titleTouch, setTitleTouch] = useState(false);
  const [productTouch, setColorTouch] = useState(false);

  const isTitleTouched = titleTouch && todoTitle.length < 1;
  const isColorTouched = productTouch && todoColor.length < 1;

  const findColorById = (colorId: number): Color | undefined => {
    const foundColor = colorsFromServer.find((color) => (
      color.id === colorId
    ));

    return foundColor || undefined;
  };

  const addTodoTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTodoTitle(value);
  };

  const addTodoProduct = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setTodoColor(value);
  };

  const removeTodoChanges = () => {
    setTodoTitle('');
    setTodoColor('');
  };

  const onAdd = (event: React.FormEvent): void => {
    event.preventDefault();

    const newProduct = {
      id: Math.max(...products.map((product) => product.id)) + 1,
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

  const onDelete = (productId: number): void => {
    setProducts((prevState) => prevState.filter((state) => (
      state.id !== productId
    )));
  };

  const onRename = (
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
  };

  const onSelect = (productId: number, selected: boolean): void => {
    setProducts((prevState: Product[]) => prevState.map(
      (product) => {
        if (product.id !== productId) {
          return product;
        }

        return { ...product, selected };
      },
    ));
  };

  const changeAllProducts = (selected: boolean) => {
    setProducts((prevState: Product[]) => prevState.map(
      (product: Product) => (
        {
          ...product,
          selected,
        }
      ),
    ));
  };

  const fitleredProducts = useMemo(() => (
    products.map((product: Product): Product => ({
      ...product,
      currentColor: findColorById(product.colorId),
    }))
  ), [products]);

  return (
    <div className="App">
      <h1
        className="App__title"
      >
        Add todo form
      </h1>

      <form
        className="App__form form"
        onSubmit={onAdd}
        action="/api/users"
        method="POST"
      >
        {isTitleTouched && (
          <span className="error">Please enter a title</span>
        )}

        <div className="field">
          <input
            className="form__textInput form-control"
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
          <span className="error">Please choose a product</span>
        )}

        <div className="field">
          <select
            className="form__selectColor form-control"
            data-cy="userSelect"
            value={todoColor}
            onChange={addTodoProduct}
            onBlur={() => setColorTouch(true)}
          >
            <option
              value=""
              disabled
            >
              Choose a product
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

      <TodoList
        products={fitleredProducts}
        colors={colorsFromServer}
        onDelete={onDelete}
        onRename={onRename}
        onSelect={onSelect}
        changeAll={changeAllProducts}
      />
    </div>
  );
};
