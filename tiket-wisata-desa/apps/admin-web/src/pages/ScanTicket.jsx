import { useState, useRef, useEffect } from 'react';
import { adminService } from '../api/adminService';

export default function ScanTicket() {
  const [qrCode, setQrCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // Menyimpan status sukses/gagal
  const inputRef = useRef(null);

  // Otomatis fokus ke input saat halaman dibuka
  // Sangat berguna jika Admin menggunakan alat Scanner QR fisik
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!qrCode.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      // Endpoint 5.4 Scan Ticket
      const response = await adminService.scanTicket(qrCode);
      
      setResult({
        status: 'success',
        message: 'Check-in Berhasil! Tiket valid.',
        // Asumsi backend Golang mengembalikan detail booking
        data: response.data || response 
      });
      
      setQrCode(''); // Kosongkan input agar siap untuk scan tiket berikutnya
    } catch (error) {
      console.error('Gagal scan tiket:', error);
      setResult({
        status: 'error',
        message: error.response?.data?.message || 'Tiket DITOLAK! QR Code tidak valid atau sudah digunakan.'
      });
    } finally {
      setLoading(false);
      // Kembalikan fokus ke input setelah submit
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Scan Tiket Pengunjung</h2>
        <p className="text-gray-500 mb-8">
          Arahkan kursor ke kolom di bawah, lalu gunakan alat Scanner QR Code atau ketik kode secara manual.
        </p>

        <form onSubmit={handleSubmit} className="mb-8">
          <input
            ref={inputRef}
            type="text"
            value={qrCode}
            onChange={(e) => setQrCode(e.target.value)}
            placeholder="Arahkan scanner ke sini..."
            className="w-full text-center text-2xl tracking-widest border-2 border-gray-300 rounded-lg p-4 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition"
            required
            disabled={loading}
            autoComplete="off"
          />
          <button 
            type="submit" 
            disabled={loading || !qrCode}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition disabled:bg-blue-300"
          >
            {loading ? 'Memverifikasi...' : 'Proses Check-in (Enter)'}
          </button>
        </form>

        {/* Notifikasi Hasil Scan */}
        {result && (
          <div className={`p-4 rounded-lg border-2 ${result.status === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
            <h3 className="text-xl font-bold mb-1">
              {result.status === 'success' ? '✅ Akses Diberikan' : '❌ Akses Ditolak'}
            </h3>
            <p>{result.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}