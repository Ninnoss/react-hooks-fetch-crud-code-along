import React, { useEffect, useState } from 'react';
import ItemForm from './ItemForm';
import Filter from './Filter';
import Item from './Item';

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/items')
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === 'All') return true;

    return item.category === selectedCategory;
  });

  function handleAddItem(newItem) {
    setItems([...items, newItem]);
  }

  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      }
      return item;
    });
    setItems(updatedItems);
  }

  function handleDeleteItem(deletedItem) {
    const updatedItems = items.filter((item) => item.id !== deletedItem.id);
    setItems(updatedItems);
  }

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
            key={item.id}
            item={item}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
