import React from 'react';

const ParagraphQuestion = ({ question, onTextChange, onPointsChange, onDelete }) => {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-bold mb-2">Paragraph Question</h3>
      <textarea
        value={question.text}
        onChange={(e) => onTextChange(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Enter the paragraph question text"
      ></textarea>
      <div className="mb-2">
        <h4 className="text-md font-bold mb-2">Points</h4>
        <input
          type="number"
          value={question.points}
          onChange={(e) => onPointsChange(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button onClick={onDelete} className="bg-red-500 text-white py-2 px-4 rounded">Delete Question</button>
    </div>
  );
};

export default ParagraphQuestion;
