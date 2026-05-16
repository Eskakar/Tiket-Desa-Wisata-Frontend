import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes'; // Otomatis membaca index.jsx di dalam folder routes

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;