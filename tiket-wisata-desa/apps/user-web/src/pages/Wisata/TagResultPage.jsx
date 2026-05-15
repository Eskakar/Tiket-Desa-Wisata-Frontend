import {
  useEffect,
  useState,
} from 'react'

import {
  useNavigate,
  useParams,
} from 'react-router-dom'

import Navbar from '../../components/navbar/Navbar'
import WisataCard from '../../components/cards/WisataCard'

import { getWisataByTag } from '../../services/wisataService'

export default function TagResultPage() {
  const navigate = useNavigate()

  const { tag } = useParams()

  const [wisataList, setWisataList] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [currentPage, setCurrentPage] =
    useState(1)

  const [totalPages, setTotalPages] =
    useState(1)

  useEffect(() => {
    fetchWisataByTag()
  }, [tag, currentPage])

  const fetchWisataByTag =
    async () => {
      try {
        setLoading(true)

        const response =
          await getWisataByTag(
            tag,
            currentPage
          )

        setWisataList(
          response.data.items || []
        )

        setTotalPages(
          response.data.totalPages || 1
        )
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

  const formatTagTitle = (tag) => {
    return tag
      .split('-')
      .map(
        (word) =>
          word.charAt(0).toUpperCase() +
          word.slice(1)
      )
      .join(' ')
  }

  return (
    <div className='min-h-screen bg-slate-50'>
      <Navbar />

      {/* HEADER */}
      <section className='border-b border-slate-200 bg-white py-10'>
        <div className='mx-auto max-w-7xl px-6'>
          <button
            onClick={() =>
              navigate('/home')
            }
            className='mb-6 text-sm font-medium text-emerald-600 transition hover:text-emerald-700'
          >
            ← Kembali ke Home
          </button>

          <h1 className='text-4xl font-bold text-slate-800'>
            {formatTagTitle(tag)}
          </h1>

          <p className='mt-3 text-slate-500'>
            Explore wisata berdasarkan
            kategori pilihanmu.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className='mx-auto max-w-7xl px-6 py-14'>
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
              Belum ada wisata untuk
              kategori ini.
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