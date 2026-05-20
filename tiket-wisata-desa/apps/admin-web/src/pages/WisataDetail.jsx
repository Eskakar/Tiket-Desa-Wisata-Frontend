import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { adminService } from '../api/adminService';

export default function WisataDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [wisata, setWisata] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await adminService.getWisataBySlug(slug);
        setWisata(response.data || response);
      } catch (error) {
        console.error('Gagal mengambil detail:', error);
        alert('Data wisata tidak ditemukan.');
        navigate('/admin/wisata');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [slug, navigate]);

  if (loading) return <div className="p-8 text-center text-gray-500">Memuat detail wisata...</div>;
  if (!wisata) return null;

  return (
    <div className="max-w-4xl bg-white p-8 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">{wisata.name}</h2>
        <div className="flex gap-3">
          <Link to={`/admin/wisata/edit/${wisata.slug}`} className="px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition font-medium">
            Edit Wisata
          </Link>
          <Link to="/admin/wisata" className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition font-medium">
            Kembali
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {wisata.imageUrl ? (
            <img src={wisata.imageUrl} alt={wisata.name} className="w-full h-64 object-cover rounded-lg shadow-sm border" />
          ) : (
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
              Tidak ada gambar
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Lokasi</h3>
            <p className="text-gray-800 text-lg">{wisata.location}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Harga Tiket</h3>
            <p className="text-gray-800 text-lg">Rp {wisata.ticketPrice?.toLocaleString('id-ID')}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Kapasitas Harian</h3>
            <p className="text-gray-800 text-lg">{wisata.capacity} Orang</p>
          </div>
          <div className="flex gap-4 pt-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${wisata.isKidsFree ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              Anak Gratis: {wisata.isKidsFree ? 'Ya' : 'Tidak'}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${wisata.isDisabilityFriendly ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              Ramah Disabilitas: {wisata.isDisabilityFriendly ? 'Ya' : 'Tidak'}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t pt-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Deskripsi</h3>
        <p className="text-gray-700 leading-relaxed">{wisata.description}</p>
      </div>

      <div className="mt-6">
        <a href={wisata.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          📍 Lihat di Google Maps
        </a>
      </div>
    </div>
  );
}