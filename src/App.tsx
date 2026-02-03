import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Overlay from './pages/Overlay';
import Control from './pages/Control';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/overlay" element={<Overlay />} />
        <Route path="/control" element={<Control />} />
        <Route path="/" element={<Navigate to="/control" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
