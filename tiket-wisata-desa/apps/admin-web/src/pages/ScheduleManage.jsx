import { useState, useEffect } from 'react';
import { adminService } from '../api/adminService';

export default function ScheduleManage() {
  const [wisataList, setWisataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    wisataId: '',
    visitDate: '',
    quota: ''
  });

  // Mengambil daftar wisata untuk mengisi dropdown
  useEffect(() => {
    const fetchWisata = async () => {
      try {
        const response = await adminService.getAllWisata(1);
        const dataArray = Array.isArray(response) ? response : response.data || response.wisata || [];
        setWisataList(dataArray);
      } catch (error) {
        console.error('Gagal mengambil data wisata:', error);
      }
    };
    fetchWisata();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Menyesuaikan tipe data payload sesuai kebutuhan endpoint 2.4
      const payload = {
        wisataId: Number(formData.wisataId),
        visitDate: formData.visitDate,
        quota: Number(formData.quota)
      };
      
      await adminService.createSchedule(payload);
      alert('Jadwal berhasil ditambahkan!');
      
      // Reset form setelah berhasil
      setFormData({ wisataId: '', visitDate: '', quota: '' });
    } catch (error) {
      console.error('Gagal membuat jadwal:', error);
      alert('Gagal menyimpan jadwal. Pastikan server merespons dengan benar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Manajemen Jadwal & Kuota</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Wisata</label>
          <select 
            name="wisataId" 
            value={formData.wisataId} 
            onChange={handleChange} 
            required 
            className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
          >
            <option value="" disabled>-- Pilih Wisata --</option>
            {wisataList.map((w) => (
              <option key={w.id} value={w.id}>{w.name}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Buka</label>
            <input 
              type="date" 
              name="visitDate" 
              value={formData.visitDate} 
              onChange={handleChange} 
              required 
              className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kuota Tiket</label>
            <input 
              type="number" 
              name="quota" 
              value={formData.quota} 
              onChange={handleChange} 
              min="1"
              required 
              placeholder="Contoh: 100"
              className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button 
            type="submit" 
            disabled={loading || wisataList.length === 0} 
            className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition font-medium disabled:bg-blue-400"
          >
            {loading ? 'Menyimpan...' : 'Buka Jadwal'}
          </button>
        </div>
      </form>
    </div>
  );
}