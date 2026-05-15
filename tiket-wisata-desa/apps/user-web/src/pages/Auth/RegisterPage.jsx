import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { registerUser } from '../../services/authService'

export default function RegisterPage() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
    
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      alert('Password tidak sama')
      return
    }

    try {
      setLoading(true)

      await registerUser(formData)

      alert('Register berhasil')

      navigate('/login')
    } catch (error) {
      console.error(error)

      alert('Register gagal')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600'>
      <div className='mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-10 px-6 py-10 lg:grid-cols-2'>
        {/* LEFT */}
        <div className='hidden text-white lg:block'>
          <div className='mb-5 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur'>
            Bergabung Bersama DesaTix
          </div>

          <h1 className='mb-6 text-6xl font-bold leading-tight'>
            Temukan
            <span className='block text-yellow-300'>
              Hidden Gem
            </span>
            Favoritmu
          </h1>

          <p className='max-w-xl text-lg leading-relaxed text-emerald-50'>
            Daftar sekarang dan nikmati pengalaman wisata desa yang lebih
            modern, mudah, dan menyenangkan.
          </p>
        </div>

        {/* RIGHT */}
        <div className='mx-auto w-full max-w-md rounded-[2rem] bg-white p-8 shadow-2xl'>
          <div className='mb-8 text-center'>
            <Link
              to='/'
              className='text-4xl font-bold text-emerald-700'
            >
              DesaTix
            </Link>

            <h2 className='mt-6 text-3xl font-bold text-slate-800'>
              Register
            </h2>

            <p className='mt-2 text-slate-500'>
              Buat akun untuk mulai memesan wisata desa.
            </p>
          </div>

          <form className='space-y-5'   onSubmit={handleSubmit}>
            {/* NAME */}
            <div>
              <label className='mb-2 block text-sm font-semibold text-slate-700'>
                Nama Lengkap
              </label>

              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                placeholder='Masukkan nama lengkap'
                className='w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-emerald-500'
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className='mb-2 block text-sm font-semibold text-slate-700'>
                Email
              </label>

              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Masukkan email'
                className='w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-emerald-500'
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className='mb-2 block text-sm font-semibold text-slate-700'>
                Password
              </label>

              <input
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='Masukkan password'
                className='w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-emerald-500'
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className='mb-2 block text-sm font-semibold text-slate-700'>
                Konfirmasi Password
              </label>

              <input
                type='password'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder='Konfirmasi password'
                className='w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-emerald-500'
              />
            </div>

            {/* BUTTON */}
            <button
              type='submit'
              className='w-full rounded-2xl bg-emerald-600 py-4 font-semibold text-white transition hover:bg-emerald-700'
            >
              {loading ? 'Loading...' : 'Register'}
            </button>
          </form>

          <p className='mt-8 text-center text-slate-500'>
            Sudah punya akun?{' '}
            <Link
              to='/login'
              className='font-semibold text-emerald-600 hover:text-emerald-700'
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}