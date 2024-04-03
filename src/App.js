import './App.css';
import Homepage from './Homepage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Utilities from './Utilities';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/utilities" element={<Utilities />} />
      </Routes>
    </Router>
  );
}

export default App;
