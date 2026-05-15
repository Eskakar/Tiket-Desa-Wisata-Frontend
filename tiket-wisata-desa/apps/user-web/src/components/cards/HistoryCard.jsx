import StatusBadge from '../ui/StatusBadge'
import { useState } from 'react'

import ReviewModal from '../modals/ReviewModal'

export default function HistoryCard({
  item,
}) {
    const [isReviewOpen, setIsReviewOpen] = useState(false)

    return (
        <div className='overflow-hidden rounded-[2rem] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg'>
        {/* IMAGE */}
        <div className='relative h-56 overflow-hidden'>
            <img
            src={item.wisata.imageUrl}
            alt={item.wisata.name}
            className='h-full w-full object-cover'
            />

            <div className='absolute right-5 top-5'>
            <StatusBadge
                status={item.status}
            />
            </div>
        </div>

        {/* CONTENT */}
        <div className='p-6'>
            <h2 className='text-2xl font-bold text-slate-800'>
            {item.wisata.name}
            </h2>

            <div className='mt-5 space-y-3 text-slate-600'>
            <div className='flex items-center justify-between'>
                <span>Booking ID</span>

                <span className='font-semibold text-slate-800'>
                #{item.bookingId}
                </span>
            </div>

            <div className='flex items-center justify-between'>
                <span>Tanggal Kunjungan</span>

                <span className='font-semibold text-slate-800'>
                {new Date(
                    item.visitDate
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
            </div>

            {/* REVIEW */}
            <div className='mt-8'>
            {item.hasReviewed ? (
                <button
                disabled
                className='w-full rounded-2xl bg-slate-200 py-4 font-semibold text-slate-500'
                >
                Sudah Direview
                </button>
            ) : (
                <button 
                className='w-full rounded-2xl bg-emerald-600 py-4 font-semibold text-white transition hover:bg-emerald-700'
                onClick={() =>
                    setIsReviewOpen(true)
                }
                >
                Beri Review
                </button>
            )}
            </div>
        </div>
        <ReviewModal
        bookingId={item.bookingId}
        isOpen={isReviewOpen}
        onClose={() =>
            setIsReviewOpen(false)
        }
        />
        </div>
    )
}