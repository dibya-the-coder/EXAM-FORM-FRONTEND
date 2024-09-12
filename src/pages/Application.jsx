import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FormProvider } from '../context/FormContext';
import Login from './Login';
import Register from './Register'
import Profile from '../pages/Profile';
import ExamPage from './ExamPage';
import AllFormPage from './AllFormPage';
import Preview from './Preview'
import ExamAccordion from './ExamAccordion';

const Application = () => {
  return (
    <FormProvider>
      <Router>
          <Routes>
            <Route path='/register' element={<Register/>}/>
            <Route path='/dashboard' element={<ExamPage/>}>
              <Route path="" element={<Profile />} />
              <Route path="exam-page" element={<ExamAccordion />} />
              <Route path="get-all" element={<AllFormPage />} />
              <Route path="preview" element={<Preview />}/>
            </Route>
            <Route path="/" element={<Login/>} /> 
          </Routes>
      </Router>
    </FormProvider>
  );
};

export default Application;
