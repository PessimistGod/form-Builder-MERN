import React from 'react';

const MCAQuestion = ({ question, onTextChange, onOptionChange, onCorrectOptionsChange, onPointsChange, onDelete, onAddOption, onDeleteOption }) => {


  
  return (
    <div className="mb-4">
      <h3 className="text-lg font-bold mb-2">MCA Question</h3>
      <textarea
        value={question.text}
        onChange={(e) => onTextChange(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Enter the MCA question text"
      ></textarea>
      <div className="mb-2">
        <h4 className="text-md font-bold mb-2">Options</h4>
        {question.options.map((option, index) => (
          <div key={index} className="flex mb-2">
            <input
              type="checkbox"
              checked={question.correctOptions.includes(index)}
              onChange={() => onCorrectOptionsChange(index)}
              className="mr-2"
            />
            <input
              type="text"
              value={option}
              onChange={(e) => onOptionChange(e.target.value, index)}
              className="w-full p-2 border rounded"
              placeholder={`Option ${index + 1}`}
            />
            <button onClick={() => onDeleteOption(index)} className="bg-red-500 text-white py-2 px-4 rounded ml-2">
              Delete
            </button>
          </div>
        ))}
        <button onClick={onAddOption} className="bg-green-500 text-white py-2 px-4 rounded">
          Add Option
        </button>
      </div>
      <div className="mb-2">
        <h4 className="text-md font-bold mb-2">Points</h4>
        <input
          type="number"
          value={question.points}
          onChange={(e) => onPointsChange(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button onClick={onDelete} className="bg-red-500 text-white py-2 px-4 rounded">
        Delete Question
      </button>
    </div>
  );
};

export default MCAQuestion;
