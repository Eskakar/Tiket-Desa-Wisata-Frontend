import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Hapus token dan arahkan kembali ke halaman login
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 text-white flex flex-col">
        <div className="p-4 border-b border-slate-700">
          <h1 className="text-xl font-bold">Admin Wisata</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin/wisata" className="block px-4 py-2 rounded hover:bg-slate-700 transition">
            Data Wisata
          </Link>
          <Link to="/admin/bookings" className="block px-4 py-2 rounded hover:bg-slate-700 transition">
            Verifikasi Booking
          </Link>
          <Link to="/admin/schedules" className="block px-4 py-2 rounded hover:bg-slate-700 transition">
            Jadwal & Kuota
          </Link>
          <Link to="/admin/scan" className="block px-4 py-2 rounded hover:bg-slate-700 transition font-medium text-blue-300">
            Scan Tiket
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-700">
          <button 
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition font-medium"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8">
        {/* Outlet adalah tempat di mana komponen halaman (seperti WisataList) akan dirender */}
        <Outlet />
      </main>
    </div>
  );
}