import { Link } from 'react-router-dom'

export default function Navbar({ isLoggedIn = false }) {
  return (
    <header className='sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4'>
        {/* LOGO */}
        <Link
          to='/'
          className='text-3xl font-bold text-emerald-700'
        >
          DesaTix
        </Link>

        {/* MENU */}
        <nav className='hidden items-center gap-8 md:flex'>
          <a
            href='#kategori'
            className='font-medium text-slate-600 transition hover:text-emerald-600'
          >
            Kategori
          </a>

          <a
            href='#wisata'
            className='font-medium text-slate-600 transition hover:text-emerald-600'
          >
            Wisata Populer
          </a>

          <a
            href='#tentang'
            className='font-medium text-slate-600 transition hover:text-emerald-600'
          >
            Tentang Kami
          </a>
        </nav>

        {/* RIGHT MENU */}
        <div className='flex items-center gap-3'>
          {isLoggedIn ? (
            <>
              <Link
                to='/my-tickets'
                className='font-medium text-slate-600 transition hover:text-emerald-600'
              >
                Tiket Saya
              </Link>

              <Link
                to='/history'
                className='font-medium text-slate-600 transition hover:text-emerald-600'
              >
                Riwayat Wisata
              </Link>

              <Link
                to='/profile'
                className='rounded-xl bg-emerald-600 px-4 py-2 font-medium text-white transition hover:bg-emerald-700'
              >
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link
                to='/login'
                className='rounded-xl border border-emerald-600 px-4 py-2 font-medium text-emerald-700 transition hover:bg-emerald-50'
              >
                Login
              </Link>

              <Link
                to='/register'
                className='rounded-xl bg-emerald-600 px-4 py-2 font-medium text-white transition hover:bg-emerald-700'
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}