import React, { useState } from 'react';
import MCQQuestion from './ComprehensionComponents/MCQQuestion';
import ParagraphQuestion from './ComprehensionComponents/ParagraphQuestion';
import MCAQuestion from './ComprehensionComponents/MCAQuestion';

const ComprehensionBuilder = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('text');
  const [inputValue, setInputValue] = useState('');


  const addQuestion = (queType) => {
    const newQuestion = {
      queType,
      text: selectedOption === 'text' ? inputValue : '',
      options: [],
      correctOptions: [],
      points: 1,
    };

    setQuestions([...questions, newQuestion]);
  };
  
  const deleteQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const updateMCQQuestion = (index, updatedQuestion) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = updatedQuestion;
    setQuestions(updatedQuestions);
  };

  
  const updateMCAQuestion = (index, updatedQuestion) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = updatedQuestion;
    setQuestions(updatedQuestions);
  };

  const updateParagraphQuestion = (index, updatedQuestion) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = updatedQuestion;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Comprehension Question</h2>
      <div className="mb-4">
        <label className="block font-bold mb-2">Choose Option:</label>
        <select value={selectedOption} onChange={handleOptionChange} className="w-full p-2 border rounded">
          <option value="text">Question Description</option>
          <option value="image">Image URL</option>
        </select>
      </div>
      {selectedOption === 'text' ? (
        <div className="mb-4">
          <label className="block font-bold mb-2">Enter Question Description:</label>
          <textarea
            value={inputValue}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Question Description"
          />
        </div>
      ) : (
        <div className="mb-4">
          <label className="block font-bold mb-2">Enter Image URL:</label>
          <input
            type="text"
            placeholder="Image URL"
            value={inputValue}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
      )}
      <div className="mt-4">
        <button onClick={() => addQuestion('MCQ')} className="bg-blue-500 text-white py-2 px-4 rounded mr-4 my-1">
          Add MCQ Question
        </button>
        <button onClick={() => addQuestion('MCA')} className="bg-blue-500 text-white py-2 px-4 rounded  mr-4 my-1">
          Add MCA Question
        </button>
        <button onClick={() => addQuestion('Paragraph')} className="bg-blue-500 text-white py-2 px-4 rounded my-1">
          Add Paragraph Question
        </button>

      </div>
      {questions.map((question, index) => (
        <div key={index} className="mb-8">
          {question.queType === 'MCQ' ? (
        <MCQQuestion
        question={question}
        onTextChange={(text) => updateMCQQuestion(index, { ...question, text })}
        onOptionChange={(value, optionIndex) => {
          const updatedOptions = [...question.options];
          updatedOptions[optionIndex] = value;
          updateMCQQuestion(index, { ...question, options: updatedOptions });
        }}
        onCorrectOptionChange={(correctOption) => updateMCQQuestion(index, { ...question, correctOptions: [correctOption] })} // Use an array to store the selected correct option
        onPointsChange={(points) => updateMCQQuestion(index, { ...question, points })}
        onDelete={() => deleteQuestion(index)}
        onAddOption={() => {
          const updatedOptions = [...question.options, ''];
          updateMCQQuestion(index, { ...question, options: updatedOptions });
        }}
        onDeleteOption={(optionIndex) => {
          const updatedOptions = [...question.options];
          updatedOptions.splice(optionIndex, 1);
          updateMCQQuestion(index, { ...question, options: updatedOptions });
        }}
      />
      

          ) : question.queType === 'MCA' ? (
            <MCAQuestion
              question={question}
              onTextChange={(text) => updateMCAQuestion(index, { ...question, text })}
              onOptionChange={(value, optionIndex) => {
                const updatedOptions = [...question.options];
                updatedOptions[optionIndex] = value;
                updateMCAQuestion(index, { ...question, options: updatedOptions });
              }}
              onCorrectOptionsChange={(optionIndex) => {
                const updatedCorrectOptions = [...question.correctOptions];
                if (updatedCorrectOptions.includes(optionIndex)) {
                  updatedCorrectOptions.splice(updatedCorrectOptions.indexOf(optionIndex), 1);
                } else {
                  updatedCorrectOptions.push(optionIndex);
                }
                updateMCAQuestion(index, { ...question, correctOptions: updatedCorrectOptions });
              }}
              onPointsChange={(points) => updateMCAQuestion(index, { ...question, points })}
              onDelete={() => deleteQuestion(index)}
              onAddOption={() => {
                const updatedOptions = [...question.options, ''];
                updateMCAQuestion(index, { ...question, options: updatedOptions });
              }}
              onDeleteOption={(optionIndex) => {
                const updatedOptions = [...question.options];
                updatedOptions.splice(optionIndex, 1);
                updateMCAQuestion(index, { ...question, options: updatedOptions });
              }}
            />
          ) : (
            <ParagraphQuestion
              question={question}
              onTextChange={(text) => updateParagraphQuestion(index, { ...question, text })}
              onPointsChange={(points) => updateParagraphQuestion(index, { ...question, points })}
              onDelete={() => deleteQuestion(index)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ComprehensionBuilder;
