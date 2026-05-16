import { Routes, Route, Navigate } from 'react-router-dom';

// Import Komponen & Halaman
import Layout from '../components/Layout';
import ProtectedRoute from './ProtectedRoute';
import Login from '../pages/Login';
import WisataList from '../pages/WisataList';
import WisataForm from '../pages/WisataForm';
import WisataEdit from '../pages/WisataEdit';
import BookingVerif from '../pages/BookingVerif';
import ScheduleManage from '../pages/ScheduleManage';
import ScanTicket from '../pages/ScanTicket';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />
      
      {/* Protected Admin Routes (dibungkus oleh Layout) */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* Default redirect dari /admin ke /admin/wisata */}
        <Route index element={<Navigate to="wisata" replace />} />
        
        <Route path="wisata" element={<WisataList />} />
        <Route path="wisata/create" element={<WisataForm />} />
        <Route path="wisata/edit/:id" element={<WisataEdit />} />
        <Route path="bookings" element={<BookingVerif />} />
        <Route path="schedules" element={<ScheduleManage />} />
        <Route path="scan" element={<ScanTicket />} />
      </Route>

      {/* Fallback route jika URL tidak ditemukan */}
      <Route path="*" element={<Navigate to="/admin/wisata" replace />} />
    </Routes>
  );
}