import { useEffect, useState } from 'react';
import { adminService } from '../api/adminService';
import { Link } from 'react-router-dom';

export default function WisataList() {
  const [wisata, setWisata] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWisata = async () => {
    try {
      setLoading(true);
      const response = await adminService.getAllWisata(1);
      
      // Amankan pembacaan data: Tembak langsung ke response.data.items sesuai struktur Golang
      let dataArray = [];
      if (response && response.data && Array.isArray(response.data.items)) {
        dataArray = response.data.items;
      } else if (Array.isArray(response)) {
        // Fallback jika suatu saat response langsung berupa array
        dataArray = response; 
      }
      
      setWisata(dataArray); 
    } catch (error) {
      console.error('Gagal mengambil data wisata:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWisata();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus wisata ini?')) {
      try {
        await adminService.deleteWisata(id);
        alert('Wisata berhasil dihapus');
        fetchWisata(); // Refresh data
      } catch (error) {
        console.error('Gagal menghapus:', error);
        alert('Gagal menghapus wisata');
      }
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading data wisata...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manajemen Wisata</h2>
        <Link to="/admin/wisata/create">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition">
            + Tambah Wisata
          </button>
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 border-b border-gray-200 uppercase text-gray-700">
            <tr>
              <th className="px-4 py-3">Nama</th>
              <th className="px-4 py-3">Lokasi</th>
              <th className="px-4 py-3">Harga Tiket</th>
              <th className="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {wisata.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">Belum ada data wisata.</td>
              </tr>
            ) : (
              wisata.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{item.name}</td>
                  <td className="px-4 py-3">{item.location}</td>
                  <td className="px-4 py-3">Rp {item.ticketPrice?.toLocaleString('id-ID')}</td>
                  <td className="px-4 py-3 flex justify-center gap-4">
                    <Link to={`/admin/wisata/edit/${item.id}`} className="text-blue-500 hover:text-blue-700 font-medium">Edit</Link>
                    <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700 font-medium">Hapus</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}