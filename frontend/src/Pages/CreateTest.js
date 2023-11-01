import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import CategoryQuestionBuilder from './FormComponents/CategoryBuilder';
import ClozeQuestionBuilder from './FormComponents/ClozeBuilder';
import ComprehensionQuestionBuilder from './FormComponents/ComprehensionBuilder';
import axios from 'axios'

const CreateTest = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [questions, setQuestions] = useState([]);
  const [addingQuestionType, setAddingQuestionType] = useState('category');


  const saveTest = async () => {
    try {
      const newFormData = {};

      newFormData.categories = [];
      newFormData.clozeQuestions = [];
      newFormData.comprehensionQuestions = [];
      
      questions.forEach((question, index) => {
        if (question.type === 'category') {
          newFormData.categories.push(question.data);
        } else if (question.type === 'cloze') {
          newFormData.clozeQuestions.push(question.data);
        } else if (question.type === 'comprehension') {
          newFormData.comprehensionQuestions.push(question.data);
        }
      });

      
      const response = await axios.post(`${API_URL}/api/tests`, newFormData);
      
      console.log('Test created:', response.data);
    } catch (error) {
      console.error('Failed to create the test:', error);
    }
  };
  
  

  const addQuestion = () => {
    let initialData = null;
  
    if (addingQuestionType === 'category') {
      initialData ={
        type: 'category',
        title: '', 
        category: '',
        items: [],
      };
    } else if (addingQuestionType === 'cloze') {
      initialData = {
        type: 'cloze',
        description: '',
        preview: '',
        options: [],
      };
    } else if (addingQuestionType === 'comprehension') {
      initialData = {
        type: 'comprehension',
        queType: '',
        data: {
          image: '',
          questionText: 'text',
          options: [],
          correctOptions: [],
          points: 1,
        },
      };
    }
  
    const newQuestion = {
      type: addingQuestionType,
      data: initialData,
    };
  
    setQuestions([...questions, newQuestion]);
  };
  

  const removeQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const updateQuestionData = (index, data) => {
    const updatedQuestions = [...questions];
    console.log(updatedQuestions[index].data, updatedQuestions, data, index)
    updatedQuestions[index].data = data;
    setQuestions(updatedQuestions);
   
  };

  const changeQuestionType = (index, type) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[index].data === null) {
      updatedQuestions[index].data = {}; // Initialize data if it's null
    }
    updatedQuestions[index].data.type = type; // Update the type in data
    setQuestions(updatedQuestions);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updatedQuestions = [...questions];
    const [reorderedItem] = updatedQuestions.splice(result.source.index, 1);
    updatedQuestions.splice(result.destination.index, 0, reorderedItem);

    setQuestions(updatedQuestions);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Test Question Builder</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="questions">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {questions.map((question, index) => (
                <Draggable key={index} draggableId={index.toString()} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="bg-white rounded-lg shadow p-4 hover:shadow-md md:w-3/4 md:mx-auto my-24"
                    >
                      <div className="mb-4">
                        <label className="font-bold">Question {index + 1}:</label>
                        <div className="flex items-center">
                          <select
                            onChange={(e) => changeQuestionType(index, e.target.value)}
                            value={question.data?.type || 'category'}
                            className="w-64 p-2 border rounded ml-2"
                          >
                            <option value="category">Category Question</option>
                            <option value="cloze">Cloze Question</option>
                            <option value="comprehension">Comprehension Question</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        {question.data?.type === 'category' && (
                          <CategoryQuestionBuilder
                          question={question.data}
                          updateQuestionData={(data) => updateQuestionData(index, data)}
                          />
                          )
                        }
                        {question.data?.type === 'cloze' && (
                          <ClozeQuestionBuilder
                            question={question.data}
                            updateQuestionData={(data) => updateQuestionData(index, data)}
                          />
                        )}
                        {question.data?.type === 'comprehension' && (
                          <ComprehensionQuestionBuilder
                            question={question.data}
                            updateQuestionData={(data) => updateQuestionData(index, data)}
                          />
                        )}
                      </div>
                      <button onClick={() => removeQuestion(index)} className="text-red-600 mt-2">
                        Remove Question
                      </button>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <div className="text-center my-10">
        <label className="font-bold">Add Question:</label>
        <button
          onClick={() => setAddingQuestionType('category')}
          className={`${
            addingQuestionType === 'category'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-300 text-gray-700'
          } py-2 px-4 rounded ml-2`
        }>
          Category Question
        </button>
        <button
          onClick={() => setAddingQuestionType('cloze')}
          className={`${
            addingQuestionType === 'cloze'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-300 text-gray-700'
          } py-2 px-4 rounded ml-2`
        }>
          Cloze Question
        </button>
        <button
          onClick={() => setAddingQuestionType('comprehension')}
          className={`${
            addingQuestionType === 'comprehension'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-300 text-gray-700'
          } py-2 px-4 rounded ml-2`
        }>
          Comprehension Question
        </button>
        <button onClick={addQuestion} className="bg-blue-500 text-white py-2 px-4 rounded ml-2">
          Add Question
        </button>
      </div>
      <button onClick={saveTest} className="bg-green-500 text-white py-2 px-4 rounded ml-2">
        Save Test
      </button>
    </div>
  );
};

export default CreateTest;
