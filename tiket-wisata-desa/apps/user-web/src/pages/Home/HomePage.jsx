import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Navbar from '../../components/navbar/Navbar'
import WisataCard from '../../components/cards/WisataCard'
import CategoryCard from '../../components/cards/CategoryCard'


import {
  getFeaturedWisata,
} from '../../services/wisataService'

export default function HomePage() {
  const navigate = useNavigate()

  const categories = [
    {
      label: 'Wisata Air',
      slug: 'wisata-air',
    },
    {
      label: 'Wisata Sungai',
      slug: 'wisata-sungai',
    },
    {
      label: 'Wisata Alam',
      slug: 'wisata-alam',
    },
    {
      label: 'Wisata Budaya',
      slug: 'wisata-budaya',
    },
    {
      label: 'Wisata Kuliner',
      slug: 'wisata-kuliner',
    },
    {
      label: 'Wisata Keluarga',
      slug: 'wisata-keluarga',
    },
  ]

  const [featuredWisata, setFeaturedWisata] =
    useState([])

  const [loadingFeatured, setLoadingFeatured] =
    useState(true)

  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchFeaturedWisata()
  }, [])

  const fetchFeaturedWisata = async () => {
    try {
      const response =
        await getFeaturedWisata()

      setFeaturedWisata(
        response.data.slice(0, 5)
      )
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingFeatured(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()

    if (!search.trim()) return

    navigate(
      `/wisata/search?q=${search}`
    )
  }

  const handleCategoryClick = (slug) => {
    navigate(`/wisata/tag/${slug}`)
  }

  return (
    <div className='min-h-screen bg-slate-50'>
      <Navbar />

      {/* HERO */}
      <section className='bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600 py-14'>
        <div className='mx-auto max-w-7xl px-6 text-white'>
          <h1 className='max-w-3xl text-5xl font-bold leading-tight'>
            Jelajahi Hidden Gem Wisata Desa
            Indonesia
          </h1>

          <p className='mt-4 max-w-2xl text-lg text-emerald-50'>
            Temukan wisata alam, budaya, sungai,
            dan kuliner terbaik dari berbagai
            desa wisata Indonesia.
          </p>

          {/* SEARCH */}
          <form
            onSubmit={handleSearch}
            className='mt-8 flex max-w-3xl flex-col gap-4 md:flex-row'
          >
            <input
              type='text'
              placeholder='Cari wisata seperti curug, sungai, budaya...'
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className='flex-1 rounded-2xl bg-white px-5 py-4 text-slate-800 outline-none'
            />

            <button className='rounded-2xl bg-yellow-400 px-6 py-4 font-semibold text-slate-800 transition hover:bg-yellow-300'>
              Cari
            </button>
          </form>
        </div>
      </section>

      {/* CATEGORY */}
      <section id='kategori' className='mx-auto max-w-7xl px-6 py-16'>
        <div className='mb-10'>
          <h2 className='text-4xl font-bold text-slate-800'>
            Kategori Wisata
          </h2>

          <p className='mt-3 text-slate-500'>
            Temukan wisata berdasarkan kategori
            favoritmu.
          </p>
        </div>

        <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6'>
          {categories.map((category) => (
            <CategoryCard
              key={category.slug}
              category={category.label}
              onClick={() =>
                handleCategoryClick(
                  category.slug
                )
              }
            />
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section id='wisata' className='bg-white py-20'>
        <div className='mx-auto max-w-7xl px-6'>
          <div className='mb-12 flex items-center justify-between'>
            <div>
              <h2 className='text-4xl font-bold text-slate-800'>
                Wisata Populer
              </h2>

              <p className='mt-3 text-slate-500'>
                Rekomendasi wisata favorit minggu
                ini.
              </p>
            </div>

            <button
              onClick={() =>
                navigate('/wisata/search')
              }
              className='hidden rounded-xl border border-emerald-600 px-5 py-3 font-medium text-emerald-700 transition hover:bg-emerald-50 md:block'
            >
              Lihat Semua
            </button>
          </div>

          {loadingFeatured ? (
            <div className='py-20 text-center text-lg text-slate-500'>
              Memuat wisata populer...
            </div>
          ) : (
            <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
              {featuredWisata.map(
                (wisata) => (
                  <WisataCard
                    key={wisata.id}
                    wisata={wisata}
                  />
                )
              )}
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className='bg-slate-900 py-10 text-slate-300'>
        <div className='mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row'>
          <div>
            <h2 className='text-3xl font-bold text-white'>
              DesaTix
            </h2>

            <p className='mt-2 text-slate-400'>
              Platform Pemesanan Tiket Wisata
              Desa.
            </p>
          </div>

          <div className='flex gap-6'>
            <button
              onClick={() =>
                navigate('/wisata/search')
              }
              className='transition hover:text-white'
            >
              Explore
            </button>

            <button
              onClick={() =>
                navigate('/profile')
              }
              className='transition hover:text-white'
            >
              Profile
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}