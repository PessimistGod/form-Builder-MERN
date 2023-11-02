import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewResponse = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const { userId } = useParams();
  const [userResponse, setUserResponse] = useState(null);
  const [error, setError] = useState(null);

  console.log(userResponse)
  useEffect(() => {
    const fetchUserResponse = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/user/response/${userId}`);

        if (response.status === 200) {
          setUserResponse(response.data);
        } else {
          setError('Failed to fetch user response');
        }
      } catch (err) {
        setError('Error fetching user response');
        console.error('Error fetching user response:', err);
      }
    };

    fetchUserResponse();
  }, [userId, API_URL]);

  const renderComprehensionResponse = (comprehension) => {
    if (!comprehension || comprehension.length === 0) {
      return <p>No comprehension responses available.</p>;
    }
  
    return comprehension.map((responses, index) => (
      <div key={index} className="mb-4 p-4 border rounded-lg bg-white">
        <h2 className="text-xl font-semibold mb-2">Response {index + 1}</h2>
        {responses.map((response, i) => (
          <div key={i} className="mb-4">
            <p className="mb-2">Type: {response.type || 'N/A'}</p>
            <p className="mb-2">
              Main Question:{' '}
              {response.mainQuestion ? (
                response.mainQuestion.startsWith('http') ? (
                  <a href={response.mainQuestion} target="_blank" rel="noreferrer">
                    {response.mainQuestion}
                  </a>
                ) : response.mainQuestion
              ) : 'N/A'}
            </p>
            <p className="mb-2">Question Text: {response.questionText || 'N/A'}</p>
            {response.type === 'Paragraph' ? (
              <p className="mb-2">Value: {response.value || 'N/A'}</p>
            ) : response.type === 'MCQ' ? (
              <div className="mb-2">
                <p className="mb-2">Value: {response.value || 'N/A'}</p>
              </div>
            ) : response.type === 'MCA' ? (
              response.value && response.value.length > 0 ? (
                <div className="mb-2">
                  <p className="mb-2">Value: {response.value.join(', ') || 'N/A'}</p>
                  {response.options ? ( // Check if options is defined
                    <ul>
                      {response.options.map((option, optionIndex) => (
                        <li key={optionIndex}>
                          <label>
                            <input type="checkbox" disabled />
                            {option}
                          </label>
                        </li>
                      ))}
                    </ul>
                  ) : null }
                </div>
              ) : null
            ) : null}
          </div>
        ))}
      </div>
    ));
  };
  
  
  
  
  const renderUserCategoryData = (userCategoryData) => {
    if (!userCategoryData || userCategoryData.length === 0) {
      return <p>No user category data available.</p>;
    }

    return userCategoryData.map((category, categoryIndex) => (
      <div key={categoryIndex} className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Category {categoryIndex + 1}</h2>
        <ul>
          {category.map((data, dataIndex) => (
            <li key={dataIndex} className="mb-2">
              <p>Title: {data.title || 'N/A'}</p>
              <p>Item Name: {data.itemName || 'N/A'}</p>
              <p>User Response: {data.userResponse || 'N/A'}</p>
            </li>
          ))}
        </ul>
      </div>
    ));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold my-4 text-center">User Response</h1>
      {error && <p className="text-red-500">{error}</p>}
      {userResponse && (
        <div className="border rounded-lg shadow-lg p-6 bg-white">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">User Information</h2>
            <p>User Name: {userResponse.userName || 'N/A'}</p>
            <p>User Email: {userResponse.userEmail || 'N/A'}</p>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold">User Category Data</h2>
            {renderUserCategoryData(userResponse.userCategoryData)}
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold">Combined Cloze Values</h2>
            <ul>
              {userResponse.combinedClozeValues.map((clozeValue, index) => (
                <li key={index} className="mb-2">
                  <p>Preview: {clozeValue.preview || 'N/A'}</p>
                  <p>Response: {clozeValue.response || 'N/A'}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold">Comprehension Responses</h2>
            {renderComprehensionResponse(userResponse.comprehensionResponses)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewResponse;
