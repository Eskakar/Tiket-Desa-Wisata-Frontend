import {
  useEffect,
  useState,
} from 'react'

import {
  useNavigate,
  useParams,
} from 'react-router-dom'

import Navbar from '../../components/navbar/Navbar'
import BookingModal from '../../components/models/BookingModal'
import { getWisataDetail } from '../../services/wisataService'

export default function WisataDetailPage() {
    const navigate = useNavigate()
    const [isBookingOpen, setIsBookingOpen] = useState(false)
    const { slug } = useParams()

    const [wisata, setWisata] =
        useState(null)

    const [loading, setLoading] =
        useState(true)

    useEffect(() => {
        fetchWisataDetail()
    }, [slug])

    const fetchWisataDetail =
        async () => {
        try {
            setLoading(true)

            const response =
            await getWisataDetail(slug)

            setWisata(response.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
        }

    if (loading) {
        return (
        <div className='flex min-h-screen items-center justify-center text-lg text-slate-500'>
            Memuat detail wisata...
        </div>
        )
    }

    if (!wisata) {
        return (
        <div className='flex min-h-screen items-center justify-center text-lg text-slate-500'>
            Wisata tidak ditemukan
        </div>
        )
    }

    return (
        <div className='min-h-screen bg-slate-50'>
        <Navbar />

        {/* HERO IMAGE */}
        <section className='relative h-[420px] w-full overflow-hidden'>
            <img
            src={wisata.imageUrl}
            alt={wisata.name}
            className='h-full w-full object-cover'
            />

            <div className='absolute inset-0 bg-black/30' />

            <div className='absolute bottom-10 left-1/2 w-full max-w-7xl -translate-x-1/2 px-6 text-white'>
            <button
                onClick={() =>
                navigate(-1)
                }
                className='mb-5 text-sm font-medium text-white/90 transition hover:text-white'
            >
                ← Kembali
            </button>

            <h1 className='text-5xl font-bold'>
                {wisata.name}
            </h1>

            <p className='mt-3 text-lg text-white/90'>
                📍 {wisata.location}
            </p>
            </div>
        </section>

        {/* CONTENT */}
        <section className='mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 lg:grid-cols-3'>
            {/* LEFT */}
            <div className='lg:col-span-2'>
            {/* INFO */}
            <div className='rounded-3xl bg-white p-8 shadow-sm'>
                <div className='mb-6 flex flex-wrap items-center gap-4'>
                <div className='rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700'>
                    ⭐ {wisata.rating || 0}
                </div>

                <div className='rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700'>
                    Kapasitas {wisata.capacity}
                </div>
                </div>

                <h2 className='mb-4 text-3xl font-bold text-slate-800'>
                Tentang Wisata
                </h2>

                <p className='leading-relaxed text-slate-600'>
                {wisata.description}
                </p>

                {/* FACILITIES */}
                <div className='mt-10 grid grid-cols-1 gap-5 md:grid-cols-2'>
                <div className='rounded-2xl border border-slate-200 p-5'>
                    <h3 className='font-semibold text-slate-800'>
                    Ramah Disabilitas
                    </h3>

                    <p className='mt-2 text-slate-500'>
                    {wisata.isDisabilityFriendly
                        ? 'Ya'
                        : 'Tidak'}
                    </p>
                </div>

                <div className='rounded-2xl border border-slate-200 p-5'>
                    <h3 className='font-semibold text-slate-800'>
                    Anak Dibawah 5 Tahun
                    </h3>

                    <p className='mt-2 text-slate-500'>
                    {wisata.isKidsFree
                        ? 'Gratis'
                        : 'Berbayar'}
                    </p>
                </div>
                </div>

                {/* MAPS */}
                <div className='mt-10'>
                <h2 className='mb-4 text-3xl font-bold text-slate-800'>
                    Lokasi Wisata
                </h2>

                <a
                    href={wisata.mapsUrl}
                    target='_blank'
                    rel='noreferrer'
                    className='inline-flex rounded-2xl bg-emerald-600 px-5 py-3 font-medium text-white transition hover:bg-emerald-700'
                >
                    Buka Google Maps
                </a>
                </div>
            </div>
            </div>

            {/* RIGHT */}
            <div>
            <div className='sticky top-24 rounded-3xl bg-white p-8 shadow-sm'>
                <h2 className='text-3xl font-bold text-slate-800'>
                Harga Tiket
                </h2>

                <div className='mt-5'>
                <h3 className='text-5xl font-bold text-emerald-700'>
                    Rp{' '}
                    {wisata.ticketPrice?.toLocaleString(
                    'id-ID'
                    )}
                </h3>

                <p className='mt-2 text-slate-500'>
                    per orang
                </p>
                </div>

                <button className='mt-8 w-full rounded-2xl bg-emerald-600 py-4 font-semibold text-white transition hover:bg-emerald-700'
                    onClick={() =>
                        setIsBookingOpen(true)
                    }
                >
                Pesan Tiket
                </button>

                <div className='mt-6 rounded-2xl bg-slate-100 p-5'>
                <h4 className='font-semibold text-slate-700'>
                    Informasi
                </h4>

                <ul className='mt-3 space-y-2 text-sm text-slate-500'>
                    <li>
                    • Tiket berlaku sesuai jadwal
                    </li>

                    <li>
                    • Tidak dapat refund
                    </li>

                    <li>
                    • Harap datang tepat waktu
                    </li>
                </ul>
                </div>
            </div>
            </div>
        </section>
        <BookingModal
            wisata={wisata}
            isOpen={isBookingOpen}
            onClose={() =>
                setIsBookingOpen(false)
            }
        />
        </div>
    )
}