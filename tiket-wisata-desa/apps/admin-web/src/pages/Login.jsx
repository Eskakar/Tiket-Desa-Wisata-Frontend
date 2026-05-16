import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../api/adminService';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await adminService.login(email, password);
      
      // Menyesuaikan dengan struktur JSON dari Golang (response.data.token)
      if (response.success && response.data?.token) {
        // Simpan token ke localStorage
        localStorage.setItem('adminToken', response.data.token);
        
        // Cek apakah role benar-benar ADMIN sebelum diarahkan ke dashboard
        if (response.data.user?.role === 'ADMIN') {
          navigate('/admin/wisata');
        } else {
          // Jika bukan ADMIN (misal CUSTOMER), hapus token dan tolak
          localStorage.removeItem('adminToken');
          setError('Akses ditolak. Anda bukan Admin.');
        }
      } else {
        setError('Gagal login. Format response tidak valid.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal login. Periksa email dan password Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login Admin</h2>
        
        {error && <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition disabled:bg-blue-400"
          >
            {loading ? 'Memproses...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}