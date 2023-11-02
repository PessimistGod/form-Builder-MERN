import React, { useEffect, useState } from 'react';
import { AiOutlineEdit,AiOutlineDelete } from 'react-icons/ai'

const CategoryBuilder = ({ categories, setCategories, formTitle, setFormTitle, index, data, updateData }) => {
  const [newCategory, setNewCategory] = useState('');
  const [newItem, setNewItem] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Separate state for this CategoryBuilder instance
  const [localCategories, setLocalCategories] = useState(categories);
  const [localFormTitle, setLocalFormTitle] = useState(formTitle);

  useEffect(() => {
    updateData({ formTitle: localFormTitle, categories: localCategories });
      // eslint-disable-next-line
  }, [localFormTitle, localCategories]);

  const categoryState = localCategories[index] || { title: '', items: [] };
      // eslint-disable-next-line
  const { title: categoryTitle, items: categoryItems } = categoryState;

  const addCategory = () => {
    if (newCategory) {
      const updatedCategories = [...localCategories];
      const newCategoryObject = { title: newCategory, items: [] };
      updatedCategories.push(newCategoryObject);
      setLocalCategories(updatedCategories);
      setNewCategory('');
    }
  };


  const addItem = () => {
    if (newItem && selectedCategory) {
      const updatedCategories = [...localCategories];
      const selectedCategoryIndex = updatedCategories.findIndex((cat) => cat.title === selectedCategory);

      if (selectedCategoryIndex !== -1) {
        const updatedCategory = { ...updatedCategories[selectedCategoryIndex] };
        updatedCategory.items.push(newItem);
        updatedCategories[selectedCategoryIndex] = updatedCategory;
        setLocalCategories(updatedCategories);
        setNewItem('');
      }
    }
  };


  const editCategory = (newTitle) => {
    const updatedCategories = [...localCategories];
    updatedCategories[index] = { title: newTitle, items: categoryItems };
    setLocalCategories(updatedCategories);
  };

  const deleteCategory = () => {
    const updatedCategories = [...localCategories];
    updatedCategories.splice(index, 1);
    setLocalCategories(updatedCategories);
  };

  const editItem = (itemIndex, newItemTitle) => {
    const updatedCategories = [...localCategories];
    const updatedCategory = { ...categoryState };
    updatedCategory.items[itemIndex] = newItemTitle;
    updatedCategories[index] = updatedCategory;
    setLocalCategories(updatedCategories);
  };

  const deleteItem = (itemIndex) => {
    const updatedCategories = [...localCategories];
    const updatedCategory = { ...categoryState };
    updatedCategory.items.splice(itemIndex, 1);
    updatedCategories[index] = updatedCategory;
    setLocalCategories(updatedCategories);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Categorize</h1>

      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Form Title</h2>
        <input
          type="text"
          placeholder="Enter Form Title"
          value={localFormTitle}
          onChange={(e) => setLocalFormTitle(e.target.value)}
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
            {localCategories.map((category) => (
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
        {localCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-4 mx-2">
            <div className='flex items-center'>
            <h3 className="text-xl font-bold">{category.title}</h3>
            <button
              onClick={() => editCategory(prompt('Enter new category title', category.title))}
              className="text-blue-500 mx-2 flex items-center"
            >
              <AiOutlineEdit /> Edit
            </button>
            <button onClick={() => deleteCategory(categoryIndex)} className="text-red-500 mx-2 flex items-center">
            <AiOutlineDelete /> Delete
            </button>
            </div>
            <ul className='flex flex-col'>
              {category.items.map((item, itemIndex) => (
                <li key={itemIndex} className="ml-4 flex">
                  {item}
                  <button
                    onClick={() =>
                      editItem(
                        itemIndex,
                        prompt('Enter new item title', item)
                      )
                    }
                    className="text-blue-500 ml-2 flex items-center"
                  >
                    <AiOutlineEdit /> Edit
                  </button>
                  <button onClick={() => deleteItem(itemIndex)} className="text-red-500 ml-2 flex items-center">
                    <AiOutlineDelete /> Delete
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
