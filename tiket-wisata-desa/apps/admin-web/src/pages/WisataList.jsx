import { useEffect, useState } from 'react';
import { adminService } from '../api/adminService';
import { Link } from 'react-router-dom';

export default function WisataList() {
  const [wisata, setWisata] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWisata = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllWisata(1);
      // Sesuaikan dengan struktur response API aktual (misal: data.data atau data.results)
      setWisata(data); 
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

  if (loading) return <div>Loading data wisata...</div>;

  return (
    <div>
      <h2>Manajemen Wisata</h2>
      <Link to="/admin/wisata/create">
        <button>+ Tambah Wisata</button>
      </Link>
      
      <table border="1" style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Lokasi</th>
            <th>Harga Tiket</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {wisata.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.location}</td>
              <td>Rp {item.ticketPrice}</td>
              <td>
                <Link to={`/admin/wisata/edit/${item.id}`}>Edit</Link> | 
                <button onClick={() => handleDelete(item.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}