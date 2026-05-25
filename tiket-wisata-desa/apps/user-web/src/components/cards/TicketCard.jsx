import StatusBadge from '../ui/StatusBadge'
import {QRCode} from 'react-qr-code'
import { useNavigate } from 'react-router-dom'

export default function TicketCard({
  ticket,
}) {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => {
        if (ticket.status === 'PENDING') {
          navigate(
            `/payments/${ticket.bookingId}`
          )
        }
      }}
      className={`overflow-hidden rounded-[2rem] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
        ticket.status === 'PENDING'
          ? 'cursor-pointer ring-2 ring-yellow-200'
          : ''
      }`}
    >
      {/* IMAGE */}
      <div className='relative h-56 overflow-hidden'>
        <img
          src={ticket.wisata.imageUrl}
          alt={ticket.wisata.name}
          className='h-full w-full object-cover'
        />

        <div className='absolute right-5 top-5'>
          <StatusBadge
            status={ticket.status}
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className='p-6'>
        <h2 className='text-2xl font-bold text-slate-800'>
          {ticket.wisata.name}
        </h2>

        <div className='mt-5 space-y-3 text-slate-600'>
          <div className='flex items-center justify-between'>
            <span>Booking Code</span>

            <span className='font-semibold text-slate-800'>
              {ticket.bookingCode}
            </span>
          </div>

          <div className='flex items-center justify-between'>
            <span>Berlaku Sampai</span>

            <span className='font-semibold text-slate-800'>
              {new Date(
                ticket.validUntil
              ).toLocaleDateString(
                'id-ID',
                {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                }
              )}
            </span>
          </div>

          <div className='flex items-center justify-between'>
            <span>Total Tiket</span>

            <span className='font-semibold text-slate-800'>
              {ticket.totalTicket}
            </span>
          </div>
        </div>

        {/* QR */}
        {ticket.status !== 'PENDING' && (
          <div className='mt-8 rounded-2xl bg-slate-100 p-5 text-center'>
            <p className='mb-4 text-sm text-slate-500'>
              QR Code Tiket
            </p>

            <div className='flex justify-center'>
              <div className='w-fit rounded-2xl bg-white p-4 shadow-inner'>
                <QRCode
                  value={ticket.qrCode}
                  size={140}
                />
              </div>
            </div>

            <p className='mt-4 text-xs text-slate-500'>
              {ticket.bookingCode}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}