import { useState } from 'react'

import {
  useNavigate,
  useParams,
} from 'react-router-dom'

import Navbar from '../../components/navbar/Navbar'

import { uploadPaymentProof } from '../../services/paymentService'

export default function PaymentPage() {
  const navigate = useNavigate()

  const { bookingId } = useParams()

  const [paymentMethod, setPaymentMethod] =
    useState('QRIS')

  const [paymentProof, setPaymentProof] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const payload = {
        bookingId: Number(bookingId),
        paymentMethod,
        paymentProof,
      }

      const response =
        await uploadPaymentProof(
          payload
        )

      alert(
        response.message ||
          'Pembayaran berhasil dikirim'
      )

      navigate('/my-tickets')
    } catch (error) {
      console.error(error)

      alert(
        error?.response?.data?.message ||
          'Pembayaran gagal'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-slate-50'>
      <Navbar />

      {/* HEADER */}
      <section className='bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600 py-16'>
        <div className='mx-auto max-w-5xl px-6 text-white'>
          <div className='inline-flex rounded-full bg-white/15 px-5 py-2 text-sm backdrop-blur'>
            Pembayaran Tiket
          </div>

          <h1 className='mt-5 text-5xl font-bold'>
            Selesaikan Pembayaran
          </h1>

          <p className='mt-4 text-lg text-emerald-50'>
            Upload bukti pembayaran untuk
            menyelesaikan proses booking
            wisata.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className='mx-auto max-w-5xl px-6 py-14'>
        <div className='grid grid-cols-1 gap-10 lg:grid-cols-3'>
          {/* LEFT */}
          <div className='lg:col-span-2'>
            <form
              onSubmit={handleSubmit}
              className='rounded-[2rem] bg-white p-8 shadow-sm'
            >
              <h2 className='text-3xl font-bold text-slate-800'>
                Detail Pembayaran
              </h2>

              {/* BOOKING ID */}
              <div className='mt-8'>
                <label className='mb-2 block text-sm font-medium text-slate-500'>
                  Booking ID
                </label>

                <input
                  type='text'
                  value={`#${bookingId}`}
                  disabled
                  className='w-full rounded-2xl border border-slate-200 bg-slate-100 px-5 py-4 text-slate-500 outline-none'
                />
              </div>

              {/* PAYMENT METHOD */}
              <div className='mt-8'>
                <label className='mb-2 block text-sm font-medium text-slate-500'>
                  Metode Pembayaran
                </label>

                <select
                  value={paymentMethod}
                  onChange={(e) =>
                    setPaymentMethod(
                      e.target.value
                    )
                  }
                  className='w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-emerald-500'
                >
                  <option value='QRIS'>
                    QRIS
                  </option>

                  <option value='BANK_TRANSFER'>
                    Transfer Bank
                  </option>

                  <option value='E_WALLET'>
                    E-Wallet
                  </option>
                </select>
              </div>

              {/* PAYMENT PROOF */}
              <div className='mt-8'>
                <label className='mb-2 block text-sm font-medium text-slate-500'>
                  Bukti Pembayaran
                </label>

                <input
                  type='text'
                  placeholder='Masukkan URL bukti pembayaran'
                  value={paymentProof}
                  onChange={(e) =>
                    setPaymentProof(
                      e.target.value
                    )
                  }
                  className='w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-emerald-500'
                />

                <p className='mt-3 text-sm text-slate-400'>
                  Untuk MVP gunakan image URL
                  atau link gambar.
                </p>
              </div>

              {/* BUTTON */}
              <button
                type='submit'
                disabled={
                  loading || !paymentProof
                }
                className='mt-10 w-full rounded-2xl bg-emerald-600 py-4 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50'
              >
                {loading
                  ? 'Mengirim Pembayaran...'
                  : 'Kirim Pembayaran'}
              </button>
            </form>
          </div>

          {/* RIGHT */}
          <div>
            <div className='rounded-[2rem] bg-white p-8 shadow-sm'>
              <h2 className='text-2xl font-bold text-slate-800'>
                Instruksi Pembayaran
              </h2>

              <div className='mt-6 space-y-5 text-slate-600'>
                <div className='rounded-2xl bg-slate-100 p-5'>
                  <h3 className='font-semibold text-slate-800'>
                    QRIS
                  </h3>

                  <p className='mt-2 text-sm'>
                    Scan QR code pembayaran
                    menggunakan aplikasi
                    e-wallet atau mobile
                    banking.
                  </p>
                </div>

                <div className='rounded-2xl bg-slate-100 p-5'>
                  <h3 className='font-semibold text-slate-800'>
                    Transfer Bank
                  </h3>

                  <p className='mt-2 text-sm'>
                    Transfer sesuai nominal
                    booking ke rekening yang
                    tersedia.
                  </p>
                </div>

                <div className='rounded-2xl bg-slate-100 p-5'>
                  <h3 className='font-semibold text-slate-800'>
                    Upload Bukti
                  </h3>

                  <p className='mt-2 text-sm'>
                    Pastikan bukti pembayaran
                    terlihat jelas sebelum
                    dikirim.
                  </p>
                </div>
              </div>
            </div>

            {/* STATUS */}
            <div className='mt-8 rounded-[2rem] bg-yellow-100 p-8 text-yellow-800 shadow-sm'>
              <h2 className='text-2xl font-bold'>
                Status Booking
              </h2>

              <p className='mt-4 leading-relaxed'>
                Booking kamu saat ini masih
                <span className='font-bold'>
                  {' '}
                  PENDING
                </span>
                . Setelah pembayaran diverifikasi
                admin, tiket akan aktif.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}