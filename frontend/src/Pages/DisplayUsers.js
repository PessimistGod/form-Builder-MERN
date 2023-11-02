import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DisplayUsers = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [userResponses, setUserResponses] = useState([]);
  const [error, setError] = useState(null);

  const { testId } = useParams();

  useEffect(() => {
    // Fetch user responses when the component is mounted
    const fetchUserResponses = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/user/${testId}`);

        if (response.status === 200) {
          const fetchedUserResponses = response.data;
          setUserResponses(fetchedUserResponses);
        } else {
          setError('Failed to fetch user responses');
        }
      } catch (error) {
        setError('Error fetching user responses');
        console.error('Error fetching user responses:', error);
      }
    };

    fetchUserResponses();
  }, [testId, API_URL]);

  function handleAction(id) {
    navigate(`/displayUserResponse/${id}`)
}

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold my-4 text-center">All Responses</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/5 xl:w-1/5 text-left py-2 px-3 font-bold">
                User Name
              </th>
              <th className="w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/5 xl:w-1/5 text-left py-2 px-3 font-bold">
                User Email
              </th>
              <th className="w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/5 xl:w-1/5 text-left py-2 px-3 font-bold">
                View Answer
              </th>
            </tr>
          </thead>
          <tbody>
            {userResponses.map((userResponse) => (
              <tr key={userResponse._id} className="bg-white">
                <td className="w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/5 xl:w-1/5 text-left py-2 px-3">
                  {userResponse.userName}
                </td>
                <td className="w-1/3 sm:w-1/4 md:w-1/5 lg-w-1/5 xl:w-1/5 text-left py-2 px-3">
                  <a href={`mailto:${userResponse.userEmail}`} target='_blank' rel="noreferrer"> {userResponse.userEmail} </a>
                </td>
                <td className="w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/5 xl:w-1/5 text-left py-2 px-3">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    onClick={() => handleAction(userResponse._id)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayUsers;
