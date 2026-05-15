import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import WisataCard from '../../components/cards/WisataCard'
import CategoryCard from '../../components/cards/CategoryCard'

import { getFeaturedWisata } from '../../services/wisataService'

export default function LandingPage() {
  const categories = [
    'Wisata Air',
    'Wisata Sungai',
    'Wisata Alam',
    'Wisata Budaya',
    'Wisata Kuliner',
    'Wisata Keluarga',
  ]

  const [wisataList, setWisataList] = useState([])
  const [loading, setLoading] = useState(true)

  // sementara simulasi auth
  const isLoggedIn = false

  useEffect(() => {
    fetchFeaturedWisata()
  }, [])

  const fetchFeaturedWisata = async () => {
    try {
      const response = await getFeaturedWisata()

      // backend sementara mengirim semua data
      // frontend membatasi hanya 5 wisata
      setWisataList(response.data.slice(0, 5))
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-slate-50'>
      {/* NAVBAR */}
      <Navbar isLoggedIn={isLoggedIn} />

      {/* HERO */}
      <section className='relative overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600'>
        <div className='mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 py-24 md:grid-cols-2'>
          <div className='text-white'>
            <div className='mb-5 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur'>
              Jelajahi Wisata Desa Indonesia
            </div>

            <h1 className='mb-6 text-5xl font-bold leading-tight lg:text-6xl'>
              Temukan Hidden Gem
              <span className='block text-yellow-300'>
                Wisata Desa Favoritmu
              </span>
            </h1>

            <p className='mb-8 max-w-xl text-lg leading-relaxed text-emerald-50'>
              Platform pemesanan tiket wisata desa untuk membantu promosi
              wisata lokal, mengurangi antrean manual, dan memberikan
              pengalaman wisata yang lebih modern.
            </p>

            <div className='flex flex-wrap gap-4'>
              <Link
                to='/home'
                className='rounded-2xl bg-white px-6 py-4 font-semibold text-emerald-700 transition hover:scale-105'
              >
                Pesan Sekarang
              </Link>

              <a
                href='#wisata'
                className='rounded-2xl border border-white/40 px-6 py-4 font-semibold text-white transition hover:bg-white/10'
              >
                Lihat Wisata
              </a>
            </div>
          </div>

          <div className='relative'>
            <img
              src='https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop'
              alt='Wisata Desa'
              className='h-[500px] w-full rounded-[2rem] object-cover shadow-2xl'
            />

            <div className='absolute bottom-6 left-6 rounded-2xl bg-white/90 p-5 shadow-xl backdrop-blur'>
              <p className='text-sm text-slate-500'>Wisata Populer</p>

              <h3 className='text-lg font-bold text-slate-800'>
                Curug Cibaliung
              </h3>

              <p className='text-sm text-slate-500'>
                📍 Bogor • ⭐ 4.7
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section className='mx-auto max-w-7xl px-6 py-16'>
        <div className='rounded-[2rem] bg-white p-8 shadow-sm'>
          <div className='mb-8 text-center'>
            <h2 className='mb-3 text-4xl font-bold text-slate-800'>
              Cari Wisata Favoritmu
            </h2>

            <p className='text-slate-500'>
              Cari wisata berdasarkan nama desa, lokasi, atau kategori.
            </p>
          </div>

          <div className='mx-auto flex max-w-3xl flex-col gap-4 md:flex-row'>
            <input
              type='text'
              placeholder='Cari wisata seperti Jogokaryan, wisata sungai, wisata alam...'
              className='flex-1 rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-emerald-500'
            />

            <button className='rounded-2xl bg-emerald-600 px-7 py-4 font-semibold text-white transition hover:bg-emerald-700'>
              Cari
            </button>
          </div>
        </div>
      </section>

      {/* CATEGORY */}
      <section id='kategori' className='mx-auto max-w-7xl px-6 pb-16'>
        <div className='mb-10'>
          <h2 className='text-4xl font-bold text-slate-800'>
            Kategori Wisata
          </h2>

          <p className='mt-3 text-slate-500'>
            Temukan wisata berdasarkan kategori favoritmu.
          </p>
        </div>

        <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6'>
          {categories.map((category) => (
            <CategoryCard
              key={category}
              category={category}
            />
          ))}
        </div>
      </section>

      {/* WISATA POPULER */}
      <section id='wisata' className='bg-white py-20'>
        <div className='mx-auto max-w-7xl px-6'>
          <div className='mb-12 flex items-center justify-between'>
            <div>
              <h2 className='text-4xl font-bold text-slate-800'>
                Desa Wisata Populer
              </h2>

              <p className='mt-3 text-slate-500'>
                Rekomendasi wisata desa favorit minggu ini.
              </p>
            </div>

            <button className='hidden rounded-xl border border-emerald-600 px-5 py-3 font-medium text-emerald-700 transition hover:bg-emerald-50 md:block'>
              Lihat Semua
            </button>
          </div>

          {loading ? (
            <div className='py-20 text-center text-lg text-slate-500'>
              Memuat wisata populer...
            </div>
          ) : (
            <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
              {wisataList.map((wisata) => (
                <WisataCard key={wisata.id} wisata={wisata} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ABOUT */}
      <section id='tentang' className='mx-auto max-w-7xl px-6 py-20'>
        <div className='grid grid-cols-1 items-center gap-14 md:grid-cols-2'>
          <div>
            <img
              src='https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1200&auto=format&fit=crop'
              alt='Tentang DesaTix'
              className='rounded-[2rem] shadow-xl'
            />
          </div>

          <div>
            <h2 className='mb-6 text-4xl font-bold text-slate-800'>
              Tentang DesaTix
            </h2>

            <p className='mb-5 text-lg leading-relaxed text-slate-600'>
              DesaTix hadir untuk membantu promosi wisata desa lokal melalui
              platform digital pemesanan tiket wisata yang mudah digunakan.
            </p>

            <p className='mb-8 text-lg leading-relaxed text-slate-600'>
              Kami ingin membantu wisatawan menemukan hidden gem terbaik di
              Indonesia sekaligus membantu pengelola desa wisata mengelola
              kapasitas pengunjung secara lebih modern.
            </p>

            <div className='grid grid-cols-2 gap-5'>
              <div className='rounded-2xl bg-white p-6 shadow-sm'>
                <h3 className='text-4xl font-bold text-emerald-600'>50+</h3>
                <p className='mt-2 text-slate-500'>Desa Wisata</p>
              </div>

              <div className='rounded-2xl bg-white p-6 shadow-sm'>
                <h3 className='text-4xl font-bold text-emerald-600'>2K+</h3>
                <p className='mt-2 text-slate-500'>Pengunjung</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className='bg-slate-900 py-10 text-slate-300'>
        <div className='mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row'>
          <div>
            <h2 className='text-3xl font-bold text-white'>DesaTix</h2>

            <p className='mt-2 text-slate-400'>
              Platform Pemesanan Tiket Wisata Desa.
            </p>
          </div>

          <div className='flex gap-6'>
            <a href='#kategori' className='transition hover:text-white'>
              Kategori
            </a>

            <a href='#wisata' className='transition hover:text-white'>
              Wisata
            </a>

            <a href='#tentang' className='transition hover:text-white'>
              Tentang
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
