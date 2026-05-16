import { useEffect, useState } from 'react';
import { adminService } from '../api/adminService';

export default function BookingVerif() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      // Mengambil booking yang statusnya sedang menunggu verifikasi
      const response = await adminService.getBookingsByStatus('WAITING_VERIFICATION');
      
      // Amankan struktur data, sesuaikan dengan response Golang si B
      const dataArray = Array.isArray(response) ? response : response.data || [];
      setBookings(dataArray);
    } catch (error) {
      console.error('Gagal mengambil data booking:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleApprove = async (id) => {
    if (window.confirm('Yakin ingin menyetujui pembayaran ini?')) {
      try {
        await adminService.verifyBooking(id);
        alert('Booking berhasil disetujui!');
        fetchBookings(); // Refresh data setelah aksi
      } catch (error) {
        console.error('Gagal menyetujui booking:', error);
        alert('Terjadi kesalahan saat memverifikasi.');
      }
    }
  };

  const handleReject = async (id) => {
    if (window.confirm('Yakin ingin menolak pembayaran ini? (Aksi ini tidak dapat dibatalkan)')) {
      try {
        await adminService.rejectBooking(id);
        alert('Booking berhasil ditolak!');
        fetchBookings(); // Refresh data
      } catch (error) {
        console.error('Gagal menolak booking:', error);
        alert('Terjadi kesalahan saat menolak.');
      }
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Memuat data booking...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Verifikasi Pembayaran</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 border-b border-gray-200 uppercase text-gray-700">
            <tr>
              <th className="px-4 py-3">ID Booking</th>
              <th className="px-4 py-3">Nama Customer</th>
              <th className="px-4 py-3">Wisata</th>
              <th className="px-4 py-3">Total Tiket</th>
              <th className="px-4 py-3">Bukti Pembayaran</th>
              <th className="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  Tidak ada antrean verifikasi pembayaran saat ini.
                </td>
              </tr>
            ) : (
              bookings.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">#{item.id}</td>
                  <td className="px-4 py-3">{item.customerName || 'N/A'}</td>
                  <td className="px-4 py-3">{item.wisataName || 'N/A'}</td>
                  <td className="px-4 py-3">{item.totalTicket} Tiket</td>
                  <td className="px-4 py-3">
                    {item.paymentProof ? (
                      <a 
                        href={item.paymentProof} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        Lihat Bukti
                      </a>
                    ) : (
                      <span className="text-red-400 italic">Belum Upload</span>
                    )}
                  </td>
                  <td className="px-4 py-3 flex justify-center gap-3">
                    <button 
                      onClick={() => handleApprove(item.id)}
                      disabled={!item.paymentProof}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Terima
                    </button>
                    <button 
                      onClick={() => handleReject(item.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded transition"
                    >
                      Tolak
                    </button>
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