import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

const Sections = () => {
  const [sections, setSections] = useState([]);
  const [newSectionName, setNewSectionName] = useState('');
  const [newTestName, setNewTestName] = useState('');
  const [TestDataFetched, setTestDataFetched] = useState(null);
  const [creatingTestInSectionId, setCreatingTestInSectionId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSections() {
      try {
        const response = await axios.get(`${API_URL}/api/sections`);
        if (response.status === 200) {
          setSections(response.data);
        } else {
          // Handle errors
        }
      } catch (error) {
        // Handle errors
      }
    }

    async function fetchTests() {
      try {
        const response = await axios.get(`${API_URL}/api/tests`);
        if (response.status === 200) {
          setTestDataFetched(response.data);
        } else {
          // Handle errors
        }
      } catch (error) {
        // Handle errors
      }
    }

    fetchSections();
    fetchTests();
  }, []);

  function handleTakeTest(id){
    navigate(`/test/${id}`)
  }
  function ViewAllResponses(){

  }

  const handleCreateSection = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/sections`, {
        name: newSectionName,
      });

      if (response.status === 200) {
        const newSection = response.data;
        setSections([...sections, newSection]);
        setNewSectionName('');
      } else {
        // Handle errors
      }
    } catch (error) {
      // Handle errors
    }
  };

  const handleCreateTest = (sectionId) => {
    if (creatingTestInSectionId === sectionId) {
      navigate(`/test/${newTestName}/${sectionId}`);
    } else {
      setCreatingTestInSectionId(sectionId);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Sections</h2>
      {sections.map((section) => (
        <div key={section._id} className="mb-4">
          <h3 className="text-xl font-semibold">{section.name}</h3>
          {creatingTestInSectionId === section._id ? (
            <div>
              <input
                type="text"
                placeholder="Test Name"
                value={newTestName}
                onChange={(e) => setNewTestName(e.target.value)}
                className="w-1/2 p-2 border rounded mt-2"
              />
              <button
                onClick={() => handleCreateTest(section._id)}
                className="bg-green-500 text-white py-2 px-4 rounded mt-2"
              >
                Create Test
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleCreateTest(section._id)}
              className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
            >
              {creatingTestInSectionId === section._id ? 'Edit Test' : 'Create Test'}
            </button>
          )}
          {/* List existing tests for this section */}
          <ul className="list-disc list-inside">
            {TestDataFetched &&
              TestDataFetched
                .filter((test) => test.SectionId === section._id)
                .map((test) => (
                  <li key={test._id} className="mb-2">
                    {test.testName}
                    <button onClick={()=>handleTakeTest(test._id)}>take test</button>
                    <button onClick={()=>ViewAllResponses(test._id)}>Responses</button>

                  </li>
                  
                ))}
          </ul>
        </div>
      ))}
      <div className="mt-4">
        <input
          type="text"
          placeholder="New Section Name"
          value={newSectionName}
          onChange={(e) => setNewSectionName(e.target.value)}
          className="w-1/2 p-2 border rounded mr-2"
        />
        <button onClick={handleCreateSection} className="bg-blue-500 text-white py-2 px-4 rounded">
          Create Section
        </button>
      </div>
    </div>
  );
};

export default Sections;
