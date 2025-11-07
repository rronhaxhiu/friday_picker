import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserSelect from './pages/UserSelect';
import Attendance from './pages/Attendance';
import Dashboard from './pages/Dashboard';
import Results from './pages/Results';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserSelect />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

