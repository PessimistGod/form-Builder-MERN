import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from './AppLayout';
import Home from './Pages/Home';
import Sections from './Pages/Sections';
import CreateTest from './Pages/CreateTest';
import TakeTest from './Pages/TakeTest';
import DisplayUsers from './Pages/DisplayUsers';
import ViewResponse from './Pages/ViewResponse';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path='/sections' element={<Sections />} />
          <Route path='/test/:testName/:SectionId' element={<CreateTest />} />
          <Route path='/test/:testId' element={<TakeTest />} />
          <Route path='/displayUser/:testId' element={<DisplayUsers />} />
          <Route path='/displayUserResponse/:userId' element={<ViewResponse />} />

          
          

          


        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
