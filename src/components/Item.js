import React from 'react';

function Item({ item, onUpdateItem, onDeleteItem }) {
  function handleAddToCart() {
    const config = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        isInCart: !item.isInCart,
      }),
    };
    fetch(`http://localhost:4000/items/${item.id}`, config)
      .then((res) => res.json())
      .then((updatedItem) => onUpdateItem(updatedItem));
  }

  function handleDeleteItem() {
    const config = {
      method: 'DELETE',
    };
    fetch(`http://localhost:4000/items/${item.id}`, config)
      .then((res) => res.json())
      .then(() => onDeleteItem(item));
  }

  return (
    <li className={item.isInCart ? 'in-cart' : ''}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button
        onClick={handleAddToCart}
        className={item.isInCart ? 'remove' : 'add'}>
        {item.isInCart ? 'Remove From' : 'Add to'} Cart
      </button>
      <button
        onClick={handleDeleteItem}
        className="remove">
        Delete
      </button>
    </li>
  );
}

export default Item;
