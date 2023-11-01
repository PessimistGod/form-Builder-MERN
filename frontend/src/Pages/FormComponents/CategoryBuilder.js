import React, { useEffect, useState } from 'react';

const CategoryBuilder = ({categories}) => {
  const [, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [newItem, setNewItem] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [formTitle, setFormTitle] = useState('');

  const [dataCategory, setDataCategory] = useState({ title: '', items: [] });

  useEffect(() => {
    // Update dataCategory whenever formTitle or categories change
    setDataCategory({
      title: formTitle,
      items: [...categories],
    });
  }, [formTitle, categories]);

  console.log(dataCategory);

  const addCategory = () => {
    if (newCategory) {
      setCategories([...categories, { title: newCategory, items: [] }]);
      setNewCategory('');
    }
  };

  const addItem = () => {
    if (newItem && selectedCategory) {
      const updatedCategories = categories.map((category) => {
        if (category.title === selectedCategory) {
          return {
            ...category,
            items: [...category.items, newItem],
          };
        }
        return category;
      });

      setCategories(updatedCategories);
      setNewItem('');
    }
  };

  const editCategory = (categoryTitle, newTitle) => {
    const updatedCategories = categories.map((category) => {
      if (category.title === categoryTitle) {
        return {
          ...category,
          title: newTitle,
        };
      }
      return category;
    });

    setCategories(updatedCategories);
  };

  const deleteCategory = (categoryTitle) => {
    const updatedCategories = categories.filter((category) => category.title !== categoryTitle);
    setCategories(updatedCategories);
  };

  const editItem = (categoryTitle, oldItem, newItem) => {
    const updatedCategories = categories.map((category) => {
      if (category.title === categoryTitle) {
        return {
          ...category,
          items: category.items.map((item) => (item === oldItem ? newItem : item)),
        };
      }
      return category;
    });

    setCategories(updatedCategories);
  };

  const deleteItem = (categoryTitle, itemToDelete) => {
    const updatedCategories = categories.map((category) => {
      if (category.title === categoryTitle) {
        return {
          ...category,
          items: category.items.filter((item) => item !== itemToDelete),
        };
      }
      return category;
    });

    setCategories(updatedCategories);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Categorize</h1>

      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Form Title</h2>
        <input
          type="text"
          placeholder="Enter Form Title"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          className="w-1/3 p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Create Categories</h2>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Category Title"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="w-1/3 p-2 border rounded"
          />
          <button onClick={addCategory} className="bg-blue-500 text-white py-2 px-4 rounded ml-2">
            Add Category
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Create Items</h2>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Item Title"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            className="w-1/3 p-2 border rounded"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-1/3 p-2 border rounded mx-4"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.title} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>
          <button onClick={addItem} className="bg-blue-500 text-white py-2 px-4 rounded">
            Add Item
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-2">Categories and Items</h2>
        {categories.map((category) => (
          <div key={category.title} className="mb-4">
            <h3 className="text-xl font-bold">{category.title}</h3>
            <button
              onClick={() => editCategory(category.title, prompt('Enter new category title', category.title))}
              className="text-blue-500 mr-2"
            >
              Edit Category
            </button>
            <button onClick={() => deleteCategory(category.title)} className="text-red-500 mr-2">
              Delete Category
            </button>
            <ul>
              {category.items.map((item) => (
                <li key={item} className="ml-4">
                  {item}
                  <button
                    onClick={() =>
                      editItem(
                        category.title,
                        item,
                        prompt('Enter new item title', item)
                      )
                    }
                    className="text-blue-500 ml-2"
                  >
                    Edit Item
                  </button>
                  <button onClick={() => deleteItem(category.title, item)} className="text-red-500 ml-2">
                    Delete Item
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBuilder;
