import { useState } from 'react'

import Navbar from '../../components/navbar/Navbar'
import { updateProfile } from '../../services/authService'
import { useAuth } from '../../context/AuthContext'

export default function ProfilePage() {
  const { user, logout, updateUser  } = useAuth()

    const [formData, setFormData] =
        useState({
            name: user?.name || '',
            phoneNumber:
            user?.phoneNumber || '',
    })

    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleUpdateProfile = async (e) => {
        e.preventDefault()

        try {
        setLoading(true)

        await updateProfile(formData)

        const updatedUser = {
            ...user,
            name: formData.name,
            phoneNumber:
            formData.phoneNumber,
        }

        updateUser(updatedUser)

        alert(
            'Profile berhasil diperbarui'
        )
        } catch (error) {
        console.error(error)

        alert('Gagal update profile')
        } finally {
        setLoading(false)
        }
    }

    return (
        <div className='min-h-screen bg-slate-50'>
        <Navbar />

        {/* HEADER */}
        <section className='bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600 py-16'>
            <div className='mx-auto max-w-7xl px-6'>
            <div className='flex flex-col items-center text-center text-white'>
                {/* AVATAR */}
                <div className='flex h-32 w-32 items-center justify-center rounded-full bg-white text-5xl font-bold text-emerald-700 shadow-xl'>
                {user?.name?.charAt(0)}
                </div>

                <h1 className='mt-6 text-4xl font-bold'>
                {user?.name}
                </h1>

                <p className='mt-2 text-lg text-emerald-50'>
                {user?.email}
                </p>

                <div className='mt-5 rounded-full bg-white/20 px-5 py-2 text-sm font-semibold backdrop-blur'>
                {user?.role}
                </div>
            </div>
            </div>
        </section>

        {/* CONTENT */}
        <section className='mx-auto max-w-5xl px-6 py-14'>
            <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
            {/* PROFILE INFO */}
            <div className='lg:col-span-2'>
                <div className='rounded-3xl bg-white p-8 shadow-sm'>
                <h2 className='mb-8 text-3xl font-bold text-slate-800'>
                    Informasi Akun
                </h2>

                <div className='space-y-6'>
                    {/* NAME */}
                    <div>
                    <p className='text-sm font-medium text-slate-400'>
                        Nama Lengkap
                    </p>

                    <h3 className='mt-2 text-xl font-semibold text-slate-800'>
                        {user?.name}
                    </h3>
                    </div>

                    {/* EMAIL */}
                    <div>
                    <p className='text-sm font-medium text-slate-400'>
                        Email
                    </p>

                    <h3 className='mt-2 text-xl font-semibold text-slate-800'>
                        {user?.email}
                    </h3>
                    </div>

                    {/* PHONE */}
                    <div>
                    <p className='text-sm font-medium text-slate-400'>
                        Nomor Telepon
                    </p>

                    <h3 className='mt-2 text-xl font-semibold text-slate-800'>
                        {user?.phoneNumber ||
                        '-'}
                    </h3>
                    </div>

                    {/* CREATED */}
                    <div>
                    <p className='text-sm font-medium text-slate-400'>
                        Bergabung Sejak
                    </p>

                    <h3 className='mt-2 text-xl font-semibold text-slate-800'>
                        {new Date(
                        user?.createdAt
                        ).toLocaleDateString(
                        'id-ID',
                        {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                        }
                        )}
                    </h3>
                    </div>
                </div>
                </div>
            </div>

            {/* SIDEBAR */}
            <div>
                <div className='rounded-3xl bg-white p-8 shadow-sm'>
                <h2 className='text-2xl font-bold text-slate-800'>
                    Pengaturan
                </h2>

                <div className='mt-6 space-y-4'>
                    <form
                    onSubmit={handleUpdateProfile}
                    className='mt-6 space-y-5'
                    >
                    {/* NAME */}
                    <div>
                        <label className='mb-2 block text-sm font-medium text-slate-500'>
                        Nama Lengkap
                        </label>

                        <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        className='w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-emerald-500'
                        />
                    </div>

                    {/* PHONE */}
                    <div>
                        <label className='mb-2 block text-sm font-medium text-slate-500'>
                        Nomor Telepon
                        </label>

                        <input
                        type='text'
                        name='phoneNumber'
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className='w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-emerald-500'
                        />
                    </div>

                    {/* BUTTON */}
                    <button
                        type='submit'
                        disabled={loading}
                        className='w-full rounded-2xl bg-emerald-600 py-4 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50'
                    >
                        {loading
                        ? 'Menyimpan...'
                        : 'Simpan Perubahan'}
                    </button>
                    </form>

                </div>
                </div>

                {/* INFO CARD */}
                <div className='mt-8 rounded-3xl bg-emerald-600 p-8 text-white shadow-sm'>
                <h2 className='text-2xl font-bold'>
                    DesaTix
                </h2>

                <p className='mt-4 leading-relaxed text-emerald-50'>
                    Jelajahi hidden gem wisata desa
                    terbaik di Indonesia bersama
                    DesaTix.
                </p>
                </div>
            </div>
            </div>
        </section>
        </div>
    )
}