import { useState } from 'react'

import { createReview } from '../../services/reviewService'

export default function ReviewModal({
  bookingId,
  isOpen,
  onClose,
  onSuccess,
}) {
  const [rating, setRating] =
    useState(5)

  const [comment, setComment] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const payload = {
        bookingId,
        rating,
        comment,
      }

      const response =
        await createReview(payload)

      alert(
        response.message ||
          'Review berhasil ditambahkan'
      )

      onSuccess?.()

      onClose()
    } catch (error) {
      console.error(error)

      alert(
        error?.response?.data?.message ||
          'Gagal menambahkan review'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6'>
      <div className='w-full max-w-xl rounded-[2rem] bg-white p-8 shadow-2xl'>
        {/* HEADER */}
        <div className='flex items-start justify-between'>
          <div>
            <h2 className='text-3xl font-bold text-slate-800'>
              Beri Review
            </h2>

            <p className='mt-2 text-slate-500'>
              Bagikan pengalaman wisatamu.
            </p>
          </div>

          <button
            onClick={onClose}
            className='text-2xl text-slate-400 transition hover:text-slate-700'
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className='mt-8'
        >
          {/* RATING */}
          <div>
            <label className='mb-3 block text-sm font-medium text-slate-500'>
              Rating
            </label>

            <div className='flex gap-3'>
              {[1, 2, 3, 4, 5].map(
                (star) => (
                  <button
                    key={star}
                    type='button'
                    onClick={() =>
                      setRating(star)
                    }
                    className={`text-4xl transition ${
                      rating >= star
                        ? 'text-yellow-400'
                        : 'text-slate-300'
                    }`}
                  >
                    ★
                  </button>
                )
              )}
            </div>
          </div>

          {/* COMMENT */}
          <div className='mt-8'>
            <label className='mb-3 block text-sm font-medium text-slate-500'>
              Komentar
            </label>

            <textarea
              rows='5'
              placeholder='Ceritakan pengalaman wisatamu...'
              value={comment}
              onChange={(e) =>
                setComment(
                  e.target.value
                )
              }
              className='w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-emerald-500'
            />
          </div>

          {/* BUTTON */}
          <button
            type='submit'
            disabled={loading || !comment}
            className='mt-8 w-full rounded-2xl bg-emerald-600 py-4 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50'
          >
            {loading
              ? 'Mengirim Review...'
              : 'Kirim Review'}
          </button>
        </form>
      </div>
    </div>
  )
}