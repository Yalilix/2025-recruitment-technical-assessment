import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';
import { Browse } from './pages/Browse';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/browse" />} />
          <Route path="/browse" element={<Browse />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
