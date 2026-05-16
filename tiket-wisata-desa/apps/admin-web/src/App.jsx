import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import WisataList from './pages/WisataList';
// Import halaman lainnya...

// Komponen sederhana untuk memproteksi route admin
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children; // Disini biasanya dibungkus dengan komponen <Layout> Admin
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<div>Halaman Login (Buat Form Login Disini)</div>} />
        
        {/* Protected Admin Routes */}
        <Route 
          path="/admin/wisata" 
          element={
            <ProtectedRoute>
              <WisataList />
            </ProtectedRoute>
          } 
        />
        {/* Tambahkan route untuk Form Create, Edit, dan Verifikasi Booking */}
        
        <Route path="*" element={<Navigate to="/admin/wisata" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;