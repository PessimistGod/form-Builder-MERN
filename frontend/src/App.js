import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from './AppLayout';
import Home from './Pages/Home';
import Sections from './Pages/Sections';
import CreateTest from './Pages/CreateTest';
import TakeTest from './Pages/TakeTest';

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



        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
