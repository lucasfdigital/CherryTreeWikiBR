import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Success } from './pages/Success';
import { Cancel } from './pages/Cancel';
import { DonateButton } from './components/DonateButton';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route
          path="/"
          element={
            <div className="sidebar-footer">
              <DonateButton />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;