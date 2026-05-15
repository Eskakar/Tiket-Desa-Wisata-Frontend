import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { loginUser } from '../../services/authService'
import { useAuth } from '../../context/AuthContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

    try {
      setLoading(true)

      const response = await loginUser(formData)

      console.log(response)

      // simpan auth
      login(
        response.data.token,
        response.data.user
      )

      // redirect
      navigate('/home')
    } catch (error) {
      console.error(error)

      alert('Login gagal')
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
            Selamat Datang di DesaTix
          </div>

          <h1 className='mb-6 text-6xl font-bold leading-tight'>
            Jelajahi
            <span className='block text-yellow-300'>
              Wisata Desa
            </span>
            Indonesia
          </h1>

          <p className='max-w-xl text-lg leading-relaxed text-emerald-50'>
            Platform pemesanan tiket wisata desa modern untuk membantu
            wisatawan menemukan hidden gem terbaik di Indonesia.
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
              Login
            </h2>

            <p className='mt-2 text-slate-500'>
              Masuk untuk mulai menjelajahi wisata desa.
            </p>
          </div>

          <form className='space-y-5' onSubmit={handleSubmit}>
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

            {/* REMEMBER */}
            <div className='flex items-center justify-between text-sm'>
              <label className='flex items-center gap-2 text-slate-600'>
                <input type='checkbox' />
                Ingat saya
              </label>

              <button
                type='button'
                className='font-medium text-emerald-600 hover:text-emerald-700'
              >
                Lupa password?
              </button>
            </div>

            {/* BUTTON */}
            <button
              type='submit'
              
              className='w-full rounded-2xl bg-emerald-600 py-4 font-semibold text-white transition hover:bg-emerald-700'
            >
               {loading ? 'Loading...' : 'Login'}
            </button>
          </form>

          <p className='mt-8 text-center text-slate-500'>
            Belum punya akun?{' '}
            <Link
              to='/register'
              className='font-semibold text-emerald-600 hover:text-emerald-700'
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}



