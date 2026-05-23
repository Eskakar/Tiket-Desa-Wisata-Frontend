import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminService } from '../api/adminService';

export default function WisataEdit() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [wisataId, setWisataId] = useState(null);
  const [availableTags, setAvailableTags] = useState([]);

  const [formData, setFormData] = useState({
    name: '', location: '', description: '', ticketPrice: '',
    capacity: '', mapsUrl: '', imageUrl: '',
    isDisabilityFriendly: false, isKidsFree: false, tagIds: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ambil tags dan detail wisata secara bersamaan
        const [tagsRes, detailRes] = await Promise.all([
          adminService.getTags(),
          adminService.getWisataBySlug(slug)
        ]);

        const tagsData = tagsRes.data || tagsRes;
        setAvailableTags(Array.isArray(tagsData) ? tagsData : []);

        const data = detailRes.data || detailRes;
        setWisataId(data.id);
        
        // Ekstrak ID dari array object tags yang dikembalikan backend
        const currentTagIds = Array.isArray(data.tags) ? data.tags.map(t => t.id) : [];

        setFormData({
          name: data.name || '',
          location: data.location || '',
          description: data.description || '',
          ticketPrice: data.ticketPrice || '',
          capacity: data.capacity || '',
          mapsUrl: data.mapsUrl || '',
          imageUrl: data.imageUrl || '',
          isDisabilityFriendly: data.isDisabilityFriendly || false,
          isKidsFree: data.isKidsFree || false,
          tagIds: currentTagIds,
        });
      } catch (error) {
        console.error('Gagal mengambil data:', error);
        alert('Gagal memuat data wisata. Mungkin URL tidak ditemukan.');
        navigate('/admin/wisata');
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, [slug, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleTagToggle = (tagId) => {
    setFormData((prev) => {
      const isSelected = prev.tagIds.includes(tagId);
      const newTagIds = isSelected 
        ? prev.tagIds.filter(id => id !== tagId) 
        : [...prev.tagIds, tagId];               
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
        capacity: Number(formData.capacity)
      };
      
      await adminService.updateWisata(wisataId, payload);
      alert('Wisata berhasil diperbarui!');
      navigate('/admin/wisata');
    } catch (error) {
      console.error('Gagal memperbarui wisata:', error);
      alert('Gagal memperbarui data wisata.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="p-8 text-center text-gray-500">Memuat data form...</div>;

  // Kode UI di bawah ini sama persis dengan WisataForm.jsx
  return (
    <div className="max-w-3xl bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Wisata</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
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
            {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </div>
      </form>
    </div>
  );
}