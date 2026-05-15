import {
  useEffect,
  useState,
} from 'react'

import {
  useNavigate,
  useSearchParams,
} from 'react-router-dom'

import Navbar from '../../components/navbar/Navbar'
import WisataCard from '../../components/cards/WisataCard'

import {
  getAllWisata,
  searchWisata,
} from '../../services/wisataService'

export default function SearchResultPage() {
  const navigate = useNavigate()

  const [searchParams, setSearchParams] =
    useSearchParams()

  const query =
    searchParams.get('q') || ''

  const [search, setSearch] =
    useState(query)

  const [wisataList, setWisataList] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [currentPage, setCurrentPage] =
    useState(1)

  const [totalPages, setTotalPages] =
    useState(1)

  useEffect(() => {
    fetchWisata()
  }, [query, currentPage])

  const fetchWisata = async () => {
    try {
        setLoading(true)

        let response

        if (query) {
            response = await searchWisata(
            query,
            currentPage
            )
        } else {
            response = await getAllWisata(
            currentPage
            )
        }
        setWisataList(
            response.data.items || []
        )
        console.log(response)
        setTotalPages(
            response.data.totalPages || 1
        )
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()

    setCurrentPage(1)

    if (!search.trim()) {
      navigate('/wisata/search')
      return
    }

    navigate(
      `/wisata/search?q=${search}`
    )
  }

  return (
    <div className='min-h-screen bg-slate-50'>
      <Navbar />

      {/* HEADER */}
      <section className='bg-white border-b border-slate-200 py-10'>
        <div className='mx-auto max-w-7xl px-6'>
          <h1 className='text-4xl font-bold text-slate-800'>
            Explore Wisata
          </h1>

          <p className='mt-3 text-slate-500'>
            Temukan berbagai wisata desa
            terbaik di Indonesia.
          </p>

          {/* SEARCH */}
          <form
            onSubmit={handleSearch}
            className='mt-8 flex max-w-3xl flex-col gap-4 md:flex-row'
          >
            <input
              type='text'
              placeholder='Cari wisata...'
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className='flex-1 rounded-2xl border border-slate-200 bg-white px-5 py-4 outline-none transition focus:border-emerald-500'
            />

            <button className='rounded-2xl bg-emerald-600 px-6 py-4 font-semibold text-white transition hover:bg-emerald-700'>
              Cari
            </button>
          </form>
        </div>
      </section>

      {/* RESULT */}
      <section className='mx-auto max-w-7xl px-6 py-14'>
        <div className='mb-10'>
          <h2 className='text-3xl font-bold text-slate-800'>
            {query
              ? `Hasil pencarian: "${query}"`
              : 'Semua Wisata'}
          </h2>

          <p className='mt-2 text-slate-500'>
            {wisataList.length } wisata
            ditemukan
          </p>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className='py-20 text-center text-lg text-slate-500'>
            Memuat wisata...
          </div>
        ) : wisataList.length === 0 ? (
          <div className='py-20 text-center'>
            <h3 className='text-2xl font-bold text-slate-700'>
              Wisata tidak ditemukan
            </h3>

            <p className='mt-3 text-slate-500'>
              Coba gunakan kata kunci lain.
            </p>
          </div>
        ) : (
          <>
            {/* GRID */}
            <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
              {wisataList.map((wisata) => (
                <WisataCard
                  key={wisata.id}
                  wisata={wisata}
                />
              ))}
            </div>

            {/* PAGINATION */}
            <div className='mt-14 flex items-center justify-center gap-3'>
              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage(
                    currentPage - 1
                  )
                }
                className='rounded-xl border border-slate-300 px-4 py-2 disabled:opacity-50'
              >
                Prev
              </button>

              <span className='font-medium text-slate-600'>
                Page {currentPage} /{' '}
                {totalPages}
              </span>

              <button
                disabled={
                  currentPage === totalPages
                }
                onClick={() =>
                  setCurrentPage(
                    currentPage + 1
                  )
                }
                className='rounded-xl border border-slate-300 px-4 py-2 disabled:opacity-50'
              >
                Next
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  )
}