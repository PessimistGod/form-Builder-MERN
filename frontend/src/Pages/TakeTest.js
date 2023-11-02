import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TakeTest = () => {
  const { testId } = useParams();
  const API_URL = process.env.REACT_APP_API_URL;

  const [testData, setTestData] = useState(null);
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  
  const [userCategoryResponses, setUserCategoryResponses] = useState({});
  const [clozeResponses, setClozeResponses] = useState([]);
  const [clozePreview, setClozePreview] = useState([]);
  const [comprehensionResponses, setComprehensionResponses] = useState([]);

  const [userCategoryData, setUserCategoryData] = useState([]);

  const combinedClozeValues = clozeResponses.map((response, index) => ({
    preview: clozePreview[index],
    response,
  }));



  useEffect(() => {
    async function fetchTest() {
      try {
        const response = await axios.get(`${API_URL}/api/tests/${testId}`);
        if (response.status === 200) {
          setTestData(response.data);
          
          const initialClozeResponses = new Array(response.data.clozeQuestions.length).fill('');
           
          setClozeResponses(initialClozeResponses);

          const ClozePreview = response.data.clozeQuestions.map((question) => (
            question.preview
          ));
          setClozePreview(ClozePreview);
        } else {
          // Handle errors
        }
      } catch (error) {
        // Handle errors
      }
    }

    fetchTest();
  }, [testId, API_URL]);

  const handleMultipleChoiceResponse = (setIndex, questionIndex, optionIndex) => {
    const updatedComprehensionResponses = [...comprehensionResponses];
    if (!updatedComprehensionResponses[setIndex]) {
      updatedComprehensionResponses[setIndex] = [];
    }
    if (!updatedComprehensionResponses[setIndex][questionIndex]) {
      updatedComprehensionResponses[setIndex][questionIndex] = {};
    }
  
    const questionType = testData.comprehensionQuestions[setIndex][questionIndex].queType;
    const optionValue = testData.comprehensionQuestions[setIndex][questionIndex].options[optionIndex];
  
    if (questionType === 'MCQ') {
      updatedComprehensionResponses[setIndex][questionIndex].type = 'MCQ';
      updatedComprehensionResponses[setIndex][questionIndex].value = optionValue;
    } else if (questionType === 'MCA') {
      if (!updatedComprehensionResponses[setIndex][questionIndex].value) {
        updatedComprehensionResponses[setIndex][questionIndex].value = [];
      }
      updatedComprehensionResponses[setIndex][questionIndex].type = 'MCA';
      const value = updatedComprehensionResponses[setIndex][questionIndex].value;
      const optionValue = testData.comprehensionQuestions[setIndex][questionIndex].options[optionIndex];
  
      if (value.includes(optionValue)) {
        // Option found, remove it from the array
        value.splice(value.indexOf(optionValue), 1);
      } else {
        // Option not found, add it to the array
        value.push(optionValue);
      }
    }
  
    // Add the main question (inputValue) and question text to the response object
    updatedComprehensionResponses[setIndex][questionIndex].mainQuestion =
      testData.comprehensionQuestions[setIndex][questionIndex].inputValue;
    updatedComprehensionResponses[setIndex][questionIndex].questionText =
      testData.comprehensionQuestions[setIndex][questionIndex].text;
  
    setComprehensionResponses(updatedComprehensionResponses);
  };
  
  
  const handleTextInputResponse = (setIndex, questionIndex, textResponse) => {
    const updatedComprehensionResponses = [...comprehensionResponses];
    if (!updatedComprehensionResponses[setIndex]) {
      updatedComprehensionResponses[setIndex] = [];
    }
    if (!updatedComprehensionResponses[setIndex][questionIndex]) {
      updatedComprehensionResponses[setIndex][questionIndex] = {};
    }
    updatedComprehensionResponses[setIndex][questionIndex].type = 'Paragraph';
    updatedComprehensionResponses[setIndex][questionIndex].value = textResponse;
    
    // Add the main question (inputValue) and question text to the response object
    updatedComprehensionResponses[setIndex][questionIndex].mainQuestion =
      testData.comprehensionQuestions[setIndex][questionIndex].inputValue;
    updatedComprehensionResponses[setIndex][questionIndex].questionText =
      testData.comprehensionQuestions[setIndex][questionIndex].text;
  
    setComprehensionResponses(updatedComprehensionResponses);
  };
  
  





  const handleCategoryResponse = (categoryIndex, item, selectedCategoryIndex) => {
    const updatedUserCategoryResponses = { ...userCategoryResponses };
  
    if (!updatedUserCategoryResponses[categoryIndex]) {
      updatedUserCategoryResponses[categoryIndex] = {};
    }
  
    updatedUserCategoryResponses[categoryIndex][item] = selectedCategoryIndex;
  
    const updatedUserCategoryData = [];
  
    for (let cIndex = 0; cIndex < testData.categories.length; cIndex++) {
      const category = testData.categories[cIndex];
      const categoryData = [];
  
      for (let subIndex = 0; subIndex < category.categories.length; subIndex++) {
        const subCategory = category.categories[subIndex];
  
        for (let itemIndex = 0; itemIndex < subCategory.items.length; itemIndex++) {
          const itemName = subCategory.items[itemIndex];
          const userResponse = updatedUserCategoryResponses[cIndex]
            ? updatedUserCategoryResponses[cIndex][itemName]
            : null;
  
          if (userResponse) {
            const [selectedCIndex, selectedSIndex] = userResponse.split('-');
            const selectedSubCategory = testData.categories[selectedCIndex].categories[selectedSIndex];
  
            // Set userResponse to the title of the selected subCategory
            const itemData = {
              title: category.formTitle,
              itemName,
              userResponse: selectedSubCategory.title,
            };
  
            categoryData.push(itemData);
          }
        }
      }
  
      updatedUserCategoryData.push(categoryData);
    }
  
    setUserCategoryData(updatedUserCategoryData);
    setUserCategoryResponses(updatedUserCategoryResponses);
  };
  
  

  const handleInsertOption = (questionIndex, option) => {
    const updatedClozeResponses = [...clozeResponses];
    updatedClozeResponses[questionIndex] += option + ', ';

    setClozeResponses(updatedClozeResponses);
  };


  const handleClearResponse = (questionIndex) => {
    const updatedClozeResponses = [...clozeResponses];
    updatedClozeResponses[questionIndex] = '';
    setClozeResponses(updatedClozeResponses);
  };
  
  const submitResponses = async () => {
    try {
        const FormData = {
            userName,
            userEmail,
            userCategoryData,
            combinedClozeValues,
            comprehensionResponses,
            testId
          }
          console.log(FormData)
      const response = await axios.post(`${API_URL}/api/user/response`, FormData);

      if (response.status === 201) {
        console.log('Responses submitted successfully');
      } else {
        console.log('Failed to submit responses');
      }
    } catch (error) {
      console.error('Error submitting responses:', error);
      // Handle network or other errors
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Take Test</h1>

      <div className="flex flex-col md:flex-row items-center justify-center">
  <input
    className="px-4 py-2 m-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
    type="text"
    placeholder="Enter your Name"
    onChange={(e)=>setUserName(e.target.value)}
  />
  <input
    className="px-4 py-2 m-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
    type="email"
    placeholder="Enter your email"
    onChange={(e)=>setUserEmail(e.target.value)}

  />
</div>


      {/* Render categories */}
      {testData && testData.categories && testData.categories.length > 0 ? (
        testData.categories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="my-6">
            <h2 className="text-2xl font-semibold my-4">{category.formTitle}</h2>
            {category.categories.map((subCategory, subCategoryIndex) => (
              <div key={subCategoryIndex}>
                {subCategory.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center mb-2">
                    <p className="w-1/4 pr-2">{item}</p>
                    <select
                      className="w-3/4 p-2 border border-gray-300 rounded-md"
                      value={userCategoryResponses[categoryIndex]?.[item]}
                      onChange={(e) => handleCategoryResponse(categoryIndex, item, e.target.value)}
                    >
                      <option value="">Select a category</option>
                      {testData.categories.map((c, cIndex) =>
                        c.categories.map((sub, subIndex) => (
                          <option key={`${cIndex}-${subIndex}`} value={`${cIndex}-${subIndex}`}>
                            {sub.title}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>No categories found.</p>
      )}

{/* Render Cloze */}
{testData && testData.clozeQuestions && testData.clozeQuestions.length > 0 ? (
  testData.clozeQuestions.map((question, index) => (
    <div key={index} className="my-6">
      <p
        className="my-4 font-semibold whitespace-pre-line text-2xl"
        dangerouslySetInnerHTML={{ __html: question.preview }}
      ></p>
      <ul>
        {question.options &&
          question.options.map((option, optionIndex) => (
            <li key={optionIndex} className="mb-2">
              <button
                className="bg-green-500 text-white px-3 py-1 rounded-md mr-2"
                onClick={() => handleInsertOption(index, option)}
              >
                {option}
              </button>
            </li>
          ))}
      </ul>
      <div className="mt-4">
        <p className="font-semibold">Your response:</p>
        <div className="flex items-center mt-2">
          <div
            className="w-full p-2 border border-gray-300 rounded-md text-gray-700"
          >
           {clozeResponses[index]}
          </div>
          <button
            className="text-red-500 ml-4"
            onClick={() => handleClearResponse(index)}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  ))
) : (
  <p>No cloze questions found.</p>
)}



      {/* Render comprehension questions */}
      {testData &&
  testData.comprehensionQuestions &&
  testData.comprehensionQuestions.length > 0 ? (
    testData.comprehensionQuestions.map((comprehensionSet, setIndex) => (
      <div key={setIndex} className="mb-8 p-4 border border-gray-300 rounded-lg">
        <p className="text-lg font-semibold mb-4">Comprehension {setIndex + 1}:</p>
        {/* Display the inputValue (image/question) once for the set */}
        {comprehensionSet[0] && (
          <div>
            {comprehensionSet[0].textType === 'image' ? (
              <img src={comprehensionSet[0].inputValue} alt="Question" className="mb-4" />
            ) : (
              <p className="mb-4 font-extrabold">{comprehensionSet[0].inputValue}</p>
            )}
          </div>
        )}
        {comprehensionSet.map((question, questionIndex) => (
          <div key={questionIndex} className="mb-4">
            <div className='flex justify-between'>
            <p className="font-bold">{question.queType} Question</p>
            <p>Points: {question.points}</p>
            </div>
            <p className="mb-4 font-semibold">{question.text}</p>
            {question.queType === 'MCQ' && (
              <ul className="list-disc list-inside space-y-2">
                {question.options.map((option, optionIndex) => (
                  <li className='list-none' key={optionIndex}>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`question${setIndex}-${questionIndex}`}
                        value={option}
                        onChange={() =>
                          handleMultipleChoiceResponse(setIndex, questionIndex, optionIndex)
                        }
                      />
                      <span>{option}</span>
                    </label>
                  </li>
                ))}
              </ul>
            )}
            {question.queType === 'MCA' && (
              <ul className="list-disc list-inside space-y-2">
                {question.options.map((option, optionIndex) => (
                  <li className='list-none' key={optionIndex}>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name={`question${setIndex}-${questionIndex}`}
                        value={option}
                        onChange={() =>
                          handleMultipleChoiceResponse(setIndex, questionIndex, optionIndex)
                        }
                      />
                      <span>{option}</span>
                    </label>
                  </li>
                ))}
              </ul>
            )}
            {question.queType === 'Paragraph' && (
              <textarea
                rows="4"
                cols="50"
                className="p-2 border border-gray-300 rounded-md w-full"
                placeholder="Your answer"
                onChange={(e) => handleTextInputResponse(setIndex, questionIndex, e.target.value)}
              ></textarea>
            )}
          </div>
        ))}
      </div>
    ))
) : (
  <p className="text-lg text-gray-700">No comprehension questions found.</p>
)}



      <div className="text-center">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={submitResponses}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default TakeTest;
