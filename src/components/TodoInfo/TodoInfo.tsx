import React, { useState, useEffect } from 'react';

import classNames from 'classnames';

import './TodoInfo.scss';

import { Product } from '../../types/Product';
import { Color } from '../../types/Color';

type Props = {
  product: Product;
  colors: Color[];
  onDelete: (productId: number) => void;
  onRename: (productId: number, title: string, colorId: number) => void;
  onSelect: (productId: number, selected: boolean) => void;
};

export const TodoInfo: React.FC<Props> = React.memo(
  ({
    product,
    colors,
    onDelete,
    onRename,
    onSelect,
  }) => {
    const { currentColor, selected } = product;

    const [renameTitle, setRenameTitle] = useState<string>(product.title);
    const [renameColor, setRenameColor] = useState<string>(
      product.colorId.toString(),
    );
    const [isEdited, setEdited] = useState(false);

    const [titleTouch, setTitleTouch] = useState(false);
    const [colorTouch, setColorTouch] = useState(false);

    const isTitleTouched = titleTouch && renameTitle.length < 1;
    const isColorTouched = colorTouch && renameColor.length < 1;

    const resetAllChanges = () => {
      setRenameTitle('');
      setRenameColor('');
    };

    const onRenameSubmit = (event: React.FormEvent): void => {
      event.preventDefault();

      if (renameTitle.length > 0
        && renameColor.length > 0) {
        onRename(product.id, renameTitle, Number(renameColor));
        setEdited(prevState => !prevState);

        resetAllChanges();
        setTitleTouch(false);
        setColorTouch(false);
      } else {
        setTitleTouch(true);
        setColorTouch(true);
      }
    };

    const addRenameTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRenameTitle(event.target.value);
    };

    const addRenameColor = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setRenameColor(event.target.value);
    };

    const changeSelect = () => {
      onSelect(product.id, !selected);
    };

    useEffect(() => {
      setRenameTitle(product.title);
      setRenameColor(product.colorId.toString());
    }, [product]);

    return (
      <article
        data-id={product.id}
        className="TodoInfo"
        key={product.id}
      >

        {
          !isEdited
            ? (
              <section className="TodoInfo-section">
                <section className="TodoInfo__checkbox-section">
                  <input
                    type="checkbox"
                    className="btn-check"
                    id={`$btn-check-${product.id}-outlined`}
                    onClick={changeSelect}
                    checked={selected}
                  />
                  <label
                    className="btn btn-outline-success btn-success-check"
                    htmlFor={`$btn-check-${product.id}-outlined`}
                  >
                    &#10003;
                  </label>
                  <h2
                    className={classNames(
                      'TodoInfo__title',
                      {
                        'TodoInfo__title-selected': selected,
                      },
                    )}
                    style={currentColor && { color: currentColor.color }}
                  >
                    {product.title}
                  </h2>
                </section>
                <section>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => onDelete(product.id)}
                  >
                    &#10005;
                  </button>
                  {
                    !selected && (
                      <button
                        type="button"
                        className="btn btn-outline-warning"
                        onClick={() => setEdited((prevState => !prevState))}
                      >
                        &#9998;
                      </button>
                    )
                  }
                </section>
              </section>
            ) : (
              <form
                onSubmit={onRenameSubmit}
                method="GET"
                action="/api/users"
                className="TodoInfo-submitForm"
              >
                <article className="TodoInfo-edit">
                  <section className="TodoInfo-edit__section">
                    <input
                      className={classNames(
                        'TodoInfo-edit__input',
                        'form-control',
                        {
                          'error-border': isTitleTouched,
                        },
                      )}
                      type="text"
                      value={renameTitle}
                      onChange={addRenameTitle}
                      onBlur={() => setTitleTouch(true)}
                      maxLength={15}
                    />

                    <select
                      className={classNames(
                        'TodoInfo-edit__select',
                        'form-control',
                        {
                          'error-border': isColorTouched,
                        },
                      )}
                      value={renameColor}
                      onChange={addRenameColor}
                      onBlur={() => setColorTouch(true)}
                    >
                      <option
                        value=""
                        disabled
                      >
                        Choose a color
                      </option>
                      {colors.map((currColor) => (
                        <option
                          key={currColor.id}
                          value={currColor.id}
                        >
                          {currColor.color}
                        </option>
                      ))}
                    </select>
                  </section>

                  <button
                    type="submit"
                    className="btn btn-outline-success btn-success-submit"
                  >
                    &#10003;
                  </button>
                </article>
              </form>
            )
        }
      </article>
    );
  },
);
