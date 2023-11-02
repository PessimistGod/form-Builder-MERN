import React from 'react';

const Home = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Form Builder Assignment</h1>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Instructions:</h2>
        <ol className="list-decimal list-inside pl-4 mt-4">
          <li>Navigate to "Sections."</li>
          <li>Create a section for yourself.</li>
          <li>Within the section, create a test</li>
          <li>Add questions as required.</li>
          <li>After creating the questions, submit the test.</li>
          <li>Now, you can take the test.</li>
          <li>After taking the test, you will be navigated to the home screen.</li>
          <li>From the home screen, navigate to "Sections."</li>
          <li>Click on "Responses" to view all the responses.</li>
        </ol>
      </div>
    </div>
  );
};

export default Home;
