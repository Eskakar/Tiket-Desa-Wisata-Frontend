import { useNavigate } from 'react-router-dom'

export default function WisataCard({ wisata }) {
  const navigate = useNavigate()
  return (
    <div className='overflow-hidden rounded-3xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl'>
      {/* IMAGE */}
      <img
        src={wisata.imageUrl}
        alt={wisata.name}
        className='h-60 w-full object-cover'
      />

      <div className='p-5'>
        {/* HEADER */}
        <div className='mb-4 flex items-center justify-between'>
          <span className='rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700'>
            Wisata Desa
          </span>

          <span className='text-sm font-semibold text-yellow-500'>
            ⭐ {wisata.rating || 0}
          </span>
        </div>

        {/* TITLE */}
        <h3 className='mb-2 text-2xl font-bold text-slate-800'>
          {wisata.name}
        </h3>

        {/* LOCATION */}
        <p className='mb-5 text-slate-500'>
          📍 {wisata.location}
        </p>

        {/* DESCRIPTION */}
        <p className='mb-5 line-clamp-2 text-sm leading-relaxed text-slate-500'>
          {wisata.description}
        </p>

        {/* FOOTER */}
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-sm text-slate-400'>
              Mulai dari
            </p>

            <h4 className='text-xl font-bold text-emerald-700'>
              Rp{' '}
              {wisata.ticketPrice?.toLocaleString('id-ID')}
            </h4>
          </div>

          <button className='rounded-xl bg-emerald-600 px-4 py-2 font-medium text-white transition hover:bg-emerald-700'
            onClick={() =>
              navigate(`/wisata/${wisata.slug}`)
            }
          >
            Detail
          </button>
        </div>
      </div>
    </div>
  )
}