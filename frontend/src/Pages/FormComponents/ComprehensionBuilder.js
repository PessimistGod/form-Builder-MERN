import React, { useEffect, useState } from 'react';
import MCQQuestion from './ComprehensionComponents/MCQQuestion';
import ParagraphQuestion from './ComprehensionComponents/ParagraphQuestion';
import MCAQuestion from './ComprehensionComponents/MCAQuestion';

const ComprehensionBuilder = ({
  comprehensionData,
  setComprehensionData,
  comprehensionIndex,
}) => {
  const [localQuestions, setLocalQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('text');
  const [inputValue, setInputValue] = useState('');
  const [questionText, setQuestionText] = useState('');


  const addQuestion = (queType) => {
    const newQuestion = {
      queType,
      inputValue : inputValue,
      textType: selectedOption,
      text:questionText,
      options: [],
      correctOptions: [],
      points: 1,
    };

    setLocalQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  };
console.log(inputValue)
  useEffect(() => {
    setComprehensionData((prevData) => {
      const newData = [...prevData];
      newData[comprehensionIndex] = localQuestions;
      return newData;
    });
    // eslint-disable-next-line 
  }, [localQuestions, comprehensionIndex]);

  const deleteQuestion = (index) => {
    setLocalQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions.splice(index, 1);
      return updatedQuestions;
    });
  };

  const updateMCQQuestion = (index, updatedQuestion) => {
    setLocalQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index] = updatedQuestion;
      return updatedQuestions;
    });
  };

  const updateQuestionData = (index, updatedQuestion) => {
    setLocalQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index] = updatedQuestion;
      return updatedQuestions;
    });
  };

  const updateMCAQuestion = (index, updatedQuestion) => {
    setLocalQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index] = updatedQuestion;
      return updatedQuestions;
    });
  };

  const updateParagraphQuestion = (index, updatedQuestion) => {
    setLocalQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index] = updatedQuestion;
      return updatedQuestions;
    });
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
           <div className='rounded-full w-16'>
        {inputValue && (
          <img src={inputValue} alt='checking...' className="mt-2 rounded-lg object-contain"/>
        )}
      </div>

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
      {localQuestions.map((question, index) => (
        <div key={index} className="mb-8">
          {question.queType === 'MCQ' ? (
            <MCQQuestion
              question={question}
              index={index}
              setQuestionText={setQuestionText}
              updateQuestionData={(data) => updateQuestionData(index, data)}
              onTextChange={(text) => updateMCQQuestion(index, { ...question, text })}
              onOptionChange={(value, optionIndex) => {
                const updatedOptions = [...question.options];
                updatedOptions[optionIndex] = value;
                updateMCQQuestion(index, { ...question, options: updatedOptions });
              }}
              onCorrectOptionChange={(correctOption) => updateMCQQuestion(index, { ...question, correctOptions: [correctOption] })}
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
              index={index}
              setQuestionText={setQuestionText}
              updateQuestionData={(data) => updateQuestionData(index, data)}
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
              index={index}
              setQuestionText={setQuestionText}
              onTextChange={(text) => updateParagraphQuestion(index, { ...question, text })}
              onPointsChange={(points) => updateParagraphQuestion(index, { ...question, points })}
              onDelete={() => deleteQuestion(index)}
              updateQuestionData={(data) => updateQuestionData(index, data)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ComprehensionBuilder;
