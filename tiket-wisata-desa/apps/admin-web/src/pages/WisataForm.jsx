import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../api/adminService';

export default function WisataForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [availableTags, setAvailableTags] = useState([]);
  
  // Hapus 'slug', tambahkan 'tagIds'
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    ticketPrice: '',
    capacity: '',
    mapsUrl: '',
    imageUrl: '',
    isDisabilityFriendly: false,
    isKidsFree: false,
    tagIds: [], 
  });

  // Ambil daftar tag dari backend saat komponen dimuat
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await adminService.getTags();
        const tagsData = response.data || response;
        setAvailableTags(Array.isArray(tagsData) ? tagsData : []);
      } catch (error) {
        console.error('Gagal mengambil tag:', error);
      }
    };
    fetchTags();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Fungsi khusus untuk menangani multiple checkbox tags
  const handleTagToggle = (tagId) => {
    setFormData((prev) => {
      const isSelected = prev.tagIds.includes(tagId);
      const newTagIds = isSelected 
        ? prev.tagIds.filter(id => id !== tagId) // Hapus jika sudah ada
        : [...prev.tagIds, tagId];               // Tambah jika belum ada
      
      return { ...prev, tagIds: newTagIds };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        ticketPrice: Number(formData.ticketPrice),
        capacity: Number(formData.capacity),
        // tagIds sudah berupa array of numbers berkat handleTagToggle
      };
      
      await adminService.createWisata(payload);
      alert('Wisata berhasil ditambahkan!');
      navigate('/admin/wisata');
    } catch (error) {
      console.error('Gagal menyimpan wisata:', error);
      alert('Gagal menyimpan data wisata.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Tambah Wisata Baru</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Hapus kolom Slug, biarkan Nama mengambil lebar penuh atau gabung dengan Lokasi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Wisata</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} required className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Harga Tiket (Rp)</label>
            <input type="number" name="ticketPrice" value={formData.ticketPrice} onChange={handleChange} required className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kapasitas Harian</label>
            <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} required className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL Gambar</label>
            <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL Google Maps</label>
            <input type="url" name="mapsUrl" value={formData.mapsUrl} onChange={handleChange} required className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
          <textarea name="description" rows="3" value={formData.description} onChange={handleChange} required className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"></textarea>
        </div>

        {/* Section Multiple Tags */}
        <div className="pt-2">
          <label className="block text-sm font-bold text-gray-700 mb-2">Kategori / Tag Wisata</label>
          <div className="flex flex-wrap gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
            {availableTags.length === 0 ? (
              <span className="text-sm text-gray-500">Memuat tag...</span>
            ) : (
              availableTags.map(tag => (
                <label key={tag.id} className="flex items-center gap-2 cursor-pointer bg-white px-3 py-1.5 rounded-full border border-gray-300 hover:bg-blue-50 transition">
                  <input 
                    type="checkbox" 
                    checked={formData.tagIds.includes(tag.id)}
                    onChange={() => handleTagToggle(tag.id)}
                    className="w-4 h-4 text-blue-600 rounded cursor-pointer" 
                  />
                  <span className="text-sm text-gray-700 capitalize">{tag.name.replace('-', ' ')}</span>
                </label>
              ))
            )}
          </div>
        </div>

        <div className="flex gap-6 py-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="isDisabilityFriendly" checked={formData.isDisabilityFriendly} onChange={handleChange} className="w-4 h-4 text-blue-600 rounded" />
            <span className="text-sm font-medium text-gray-700">Ramah Disabilitas</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="isKidsFree" checked={formData.isKidsFree} onChange={handleChange} className="w-4 h-4 text-blue-600 rounded" />
            <span className="text-sm font-medium text-gray-700">Gratis Tiket untuk Anak</span>
          </label>
        </div>

        <div className="flex justify-end gap-3 mt-6 border-t pt-4">
          <button type="button" onClick={() => navigate('/admin/wisata')} className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition font-medium">Batal</button>
          <button type="submit" disabled={loading} className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition font-medium disabled:bg-blue-400">
            {loading ? 'Menyimpan...' : 'Simpan Wisata'}
          </button>
        </div>
      </form>
    </div>
  );
}