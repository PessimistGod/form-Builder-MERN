import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import CategoryBuilder from './FormComponents/CategoryBuilder';
import ClozeQuestionBuilder from './FormComponents/ClozeBuilder';
import ComprehensionQuestionBuilder from './FormComponents/ComprehensionBuilder';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineDelete } from 'react-icons/ai';

const CreateTest = () => {
  const { testName, SectionId } = useParams();
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;
  const [questions, setQuestions] = useState([]);
  const [addingQuestionType, setAddingQuestionType] = useState('category');

  const [categories, setCategories] = useState([]);
  const [formTitle, setFormTitle] = useState('');

  const [categoryData, setCategoryData] = useState([]);
  const [clozeData, setClozeData] = useState([]);
  const [comprehensionData, setComprehensionData] = useState([]);
  const [imageURL, setImageURL] = useState('');


  
  const saveTest = async () => {
    try { 

      const newFormData = {
        testName,
        imageURL,
        categories: categoryData.filter((category) => category !== undefined),
        clozeQuestions: clozeData.filter((question) => question !== undefined),
        comprehensionQuestions: comprehensionData.filter((questions) => questions !== undefined),
        SectionId
      };
      
      const response = await axios.post(`${API_URL}/api/tests`, newFormData);
      if(response.data){
        navigate('/sections')
      }
      console.log('Test created:', response.data);
    } catch (error) {
      console.error('Failed to create the test:', error);
    }
  };

  const addQuestion = () => {
    let initialData = null;

    if (addingQuestionType === 'category') {
      initialData = {
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
          inputValue : '',
          image: '',
          questionText: '',
          options: [],
          correctOptions: [],
          points: 1,
        }
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
    updatedQuestions[index].data = data;
    setQuestions(updatedQuestions);
  };

  const changeQuestionType = (index, type) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[index].data === null) {
      updatedQuestions[index].data = {};
    }
    updatedQuestions[index].data.type = type;
    setQuestions(updatedQuestions);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updatedQuestions = [...questions];
    const [reorderedItem] = updatedQuestions.splice(result.source.index, 1);
    updatedQuestions.splice(result.destination.index, 0, reorderedItem);

    setQuestions(updatedQuestions);
  };

  const updateCategories = (index, updatedCategories) => {
    const updatedCategoryState = [...categories];
    updatedCategoryState[index] = updatedCategories;
    setCategories(updatedCategoryState);
  };

  const updateComprehensionData = (index, updatedData) => {
    const updatedComprehensionState = [...comprehensionData];
    updatedComprehensionState[index] = updatedData;
    setComprehensionData(updatedComprehensionState);
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Test Question Builder</h1>
    <div className='flex justify-center items-center my-8'>
        <label className="font-bold">Test Logo Url:</label>
        <input
          type="text"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          className="w-64 p-2 border rounded outline-none mx-2"
        />
        {imageURL && <div className='w-8 h-8 rounded-full'><img className='rounded-full object-contain' src={imageURL} alt="" /></div>}
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="questions">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {questions.map((question, index) => (
                <Draggable key={index} index={index}>
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
                          <CategoryBuilder
                          key={index}
                            categories={categories}
                            setCategories={(updatedCategories) => updateCategories(index, updatedCategories)}
                            formTitle={formTitle}
                            setFormTitle={setFormTitle}
                            index={index}
                            data={categoryData[index] || { formTitle: '', categories: [] }}
                            updateData={(updatedData) => {
                              const updatedCategoryData = [...categoryData];
                              updatedCategoryData[index] = updatedData;
                              setCategoryData(updatedCategoryData);
                            }}
                          />
                        )}
                        {question.data?.type === 'cloze' && (
                          <ClozeQuestionBuilder
                            question={question.data}
                            updateQuestionData={(data) => updateQuestionData(index, data)}
                            clozeData={clozeData} setClozeData={setClozeData}
                            index={index}
                          />
                        )}
                        {question.data?.type === 'comprehension' && (
                        <ComprehensionQuestionBuilder
                        question={question.data}
                        updateQuestionData={(data) => updateQuestionData(index, data)}
                        comprehensionIndex={index}
                        setComprehensionData={setComprehensionData}
                        updateComprehensiveData={(updateComprehensiveData) => updateComprehensionData(index, updateComprehensiveData)}
                      />
                      
                        )}
                      </div>
                      <button onClick={() => removeQuestion(index)} className="text-red-600 mt-6 flex items-center ml-auto">
                      <AiOutlineDelete size={35} /> Question
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
          } py-2 px-4 rounded ml-2`}
        >
          Category Question
        </button>
        <button
          onClick={() => setAddingQuestionType('cloze')}
          className={`${
            addingQuestionType === 'cloze'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-300 text-gray-700'
          } py-2 px-4 rounded ml-2`}
        >
          Cloze Question
        </button>
        <button
          onClick={() => setAddingQuestionType('comprehension')}
          className={`${
            addingQuestionType === 'comprehension'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-300 text-gray-700'
          } py-2 px-4 rounded ml-2`}
        >
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
