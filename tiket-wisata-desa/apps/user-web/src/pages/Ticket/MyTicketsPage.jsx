import {
  useEffect,
  useState,
} from 'react'

import Navbar from '../../components/navbar/Navbar'

import TicketCard from '../../components/cards/TicketCard'

import { getMyTickets } from '../../services/ticketService'

export default function MyTicketsPage() {
  const [tickets, setTickets] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    try {
      setLoading(true)

      const response =
        await getMyTickets()

      setTickets(
        response.data || []
      )
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-slate-50'>
      <Navbar />

      {/* HERO */}
      <section className='bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600 py-16'>
        <div className='mx-auto max-w-7xl px-6 text-white'>
          <div className='inline-flex rounded-full bg-white/15 px-5 py-2 text-sm backdrop-blur'>
            Tiket Saya
          </div>

          <h1 className='mt-5 text-5xl font-bold'>
            Tiket Wisata Aktif
          </h1>

          <p className='mt-4 text-lg text-emerald-50'>
            Kelola dan lihat tiket wisata
            aktif milikmu.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className='mx-auto max-w-7xl px-6 py-14'>
        {loading ? (
          <div className='py-20 text-center text-lg text-slate-500'>
            Memuat tiket...
          </div>
        ) : tickets.length === 0 ? (
          <div className='rounded-[2rem] bg-white py-20 text-center shadow-sm'>
            <h2 className='text-3xl font-bold text-slate-800'>
              Belum Ada Tiket
            </h2>

            <p className='mt-4 text-slate-500'>
              Kamu belum memiliki tiket
              wisata aktif.
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
            {tickets.map((ticket) => (
              <TicketCard
                key={ticket.bookingId}
                ticket={ticket}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}