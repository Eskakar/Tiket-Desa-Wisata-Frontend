import { useState } from 'react'

import { createBooking } from '../../services/bookingService'

export default function BookingModal({
  wisata,
  isOpen,
  onClose,
}) {
  const [totalTicket, setTotalTicket] =
    useState(1)

  const [visitDate, setVisitDate] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  if (!isOpen) return null

  const totalPrice =
    wisata.ticketPrice * totalTicket

  const handleBooking = async () => {
    try {
      setLoading(true)

      const payload = {
        wisataId: wisata.id,

        // sementara MVP hardcoded
        scheduleId: 1,

        totalTicket,
      }

      const response =
        await createBooking(payload)

      alert(
        response.message ||
          'Booking berhasil'
      )

      onClose()
      navigate(
        `/payments/${response.data.bookingId}`
      )
    } catch (error) {
      console.error(error)

      alert(
        error?.response?.data?.message ||
          'Booking gagal'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6'>
      <div className='w-full max-w-lg rounded-[2rem] bg-white p-8 shadow-2xl'>
        {/* HEADER */}
        <div className='flex items-start justify-between'>
          <div>
            <h2 className='text-3xl font-bold text-slate-800'>
              Pesan Tiket
            </h2>

            <p className='mt-2 text-slate-500'>
              {wisata.name}
            </p>
          </div>

          <button
            onClick={onClose}
            className='text-2xl text-slate-400 transition hover:text-slate-700'
          >
            ×
          </button>
        </div>

        {/* DATE */}
        <div className='mt-8'>
          <label className='mb-2 block text-sm font-medium text-slate-500'>
            Tanggal Kunjungan
          </label>

          <input
            type='date'
            value={visitDate}
            onChange={(e) =>
              setVisitDate(e.target.value)
            }
            className='w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-emerald-500'
          />
        </div>

        {/* TICKET */}
        <div className='mt-8'>
          <label className='mb-4 block text-sm font-medium text-slate-500'>
            Jumlah Tiket
          </label>

          <div className='flex items-center gap-5'>
            <button
              onClick={() =>
                setTotalTicket(
                  Math.max(
                    1,
                    totalTicket - 1
                  )
                )
              }
              className='flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-2xl font-bold text-slate-700 transition hover:bg-slate-200'
            >
              -
            </button>

            <div className='text-3xl font-bold text-slate-800'>
              {totalTicket}
            </div>

            <button
              onClick={() =>
                setTotalTicket(
                  totalTicket + 1
                )
              }
              className='flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-2xl font-bold text-white transition hover:bg-emerald-700'
            >
              +
            </button>
          </div>
        </div>

        {/* TOTAL */}
        <div className='mt-10 rounded-2xl bg-slate-100 p-6'>
          <div className='flex items-center justify-between'>
            <span className='text-slate-500'>
              Total Harga
            </span>

            <h3 className='text-3xl font-bold text-emerald-700'>
              Rp{' '}
              {totalPrice.toLocaleString(
                'id-ID'
              )}
            </h3>
          </div>
        </div>

        {/* BUTTON */}
        <button
          disabled={
            loading || !visitDate
          }
          onClick={handleBooking}
          className='mt-8 w-full rounded-2xl bg-emerald-600 py-4 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50'
        >
          {loading
            ? 'Memproses...'
            : 'Pesan Sekarang'}
        </button>
      </div>
    </div>
  )
}