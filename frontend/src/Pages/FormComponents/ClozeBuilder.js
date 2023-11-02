import React, { useEffect, useState } from 'react';

const ClozeBuilder = ({clozeData,setClozeData,index }) => {

  
  const [description, setDescription] = useState('');
  const [preview, setPreview] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedWord, setSelectedWord] = useState('');
  const [newOption, setNewOption] = useState('');

  useEffect(() => {
    const updatedClozeData = [...clozeData];
    updatedClozeData[index] = { description, preview, options };
    setClozeData(updatedClozeData);
    // eslint-disable-next-line
  }, [description, preview, options]);
  

  const replaceWordWithBlank = () => {
    if (selectedWord) {
      let updatedDescription = description;
  
      options.forEach((option) => {
        updatedDescription = updatedDescription.replace(
          new RegExp(`\\b${option}\\b`, 'g'),
          '_____'
        );
      });
  
      updatedDescription = updatedDescription.replace(
        new RegExp(`\\b${selectedWord}\\b`, 'g'),
        '_____'
      );
  
      setPreview(updatedDescription);
      setOptions([...options, selectedWord]);
      setSelectedWord('');
    }
  };
  
  const handleDescriptionChange = (e) => {
    setDescription(e.currentTarget.innerHTML);
    updatePreview(e.currentTarget.innerHTML);
  };
  
  const updatePreview = (newDescription) => {
    options.forEach((option) => {
      newDescription = newDescription.replace(
        new RegExp(`\\b${option}\\b`, 'g'),
        '_____'
      );
    });
    setPreview(newDescription);
  };

  const handleSelectText = () => {
    const selectedText = window.getSelection().toString();
    setSelectedWord(selectedText);
  };

  const handleAddOption = () => {
    if (newOption) {
      setOptions([...options, newOption]);
      setNewOption('');
    }
  };

  const handleDeleteOption = (index) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
  };
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Cloze Question</h2>
      <div className="mb-4">
        <h3 className="text-lg font-bold mb-2">Description</h3>
        <div
          contentEditable={true}
          onInput={handleDescriptionChange}
          onMouseUp={handleSelectText}
          className="w-full p-2 border rounded"
        ></div>
      </div>
      <button
        onClick={replaceWordWithBlank}
        className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
      >
        Add Word
      </button>
      <h3 className="text-lg font-bold mb-2">Preview</h3>
      <div
        className="preview border p-2 rounded"
        dangerouslySetInnerHTML={{ __html: preview }}
      ></div>
      <h3 className="text-lg font-bold mb-2">Options</h3>
      <div>
        {options.map((option, index) => (
          <div key={index} className="option border p-2 rounded mt-2">
            {option}
            <button onClick={() => handleDeleteOption(index)} className="ml-2 text-red-600">
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <input
          type="text"
          placeholder="New Option"
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          className="p-2 border rounded"
        />
        <button onClick={handleAddOption} className="bg-green-500 text-white py-2 px-4 rounded ml-2">
          Add Option
        </button>
      </div>
    </div>
  );
};

export default ClozeBuilder;
