import StatusBadge from '../ui/StatusBadge'

export default function TicketCard({
  ticket,
}) {
  return (
    <div className='overflow-hidden rounded-[2rem] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg'>
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
            <span>Tanggal Kunjungan</span>

            <span className='font-semibold text-slate-800'>
              {new Date(
                ticket.visitDate
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
        <div className='mt-8 rounded-2xl bg-slate-100 p-5 text-center'>
          <p className='mb-3 text-sm text-slate-500'>
            QR Code Tiket
          </p>

          <div className='mx-auto flex h-32 w-32 items-center justify-center rounded-2xl bg-white font-bold text-slate-400 shadow-inner'>
            {ticket.qrCode}
          </div>
        </div>
      </div>
    </div>
  )
}