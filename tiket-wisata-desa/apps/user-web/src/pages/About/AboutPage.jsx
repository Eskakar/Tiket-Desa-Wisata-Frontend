import Navbar from '../../components/navbar/Navbar'

export default function AboutPage() {
  return (
    <div className='min-h-screen bg-slate-50'>
      <Navbar />

      {/* HERO */}
      <section className='bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600 py-20'>
        <div className='mx-auto max-w-7xl px-6 text-center text-white'>
          <div className='mb-5 inline-flex rounded-full bg-white/15 px-5 py-2 text-sm backdrop-blur'>
            Tentang DesaTix
          </div>

          <h1 className='mx-auto max-w-4xl text-5xl font-bold leading-tight'>
            Platform Pemesanan Tiket Wisata
            Desa Modern Indonesia
          </h1>

          <p className='mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-emerald-50'>
            DesaTix hadir untuk membantu
            wisatawan menemukan hidden gem
            wisata desa terbaik sekaligus
            membantu pengelola wisata desa
            mengelola tiket dan kapasitas
            pengunjung secara modern.
          </p>
        </div>
      </section>

      {/* ABOUT */}
      <section className='mx-auto max-w-7xl px-6 py-20'>
        <div className='grid grid-cols-1 items-center gap-14 lg:grid-cols-2'>
          {/* IMAGE */}
          <div>
            <img
              src='https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop'
              alt='Desa Wisata'
              className='rounded-[2rem] shadow-xl'
            />
          </div>

          {/* CONTENT */}
          <div>
            <h2 className='text-4xl font-bold text-slate-800'>
              Menghubungkan Wisatawan dan
              Wisata Desa
            </h2>

            <p className='mt-6 text-lg leading-relaxed text-slate-600'>
              Banyak wisata desa di Indonesia
              memiliki potensi luar biasa,
              namun masih kurang dikenal oleh
              wisatawan karena keterbatasan
              promosi dan sistem pemesanan
              yang masih manual.
            </p>

            <p className='mt-5 text-lg leading-relaxed text-slate-600'>
              DesaTix hadir sebagai solusi
              digital untuk membantu promosi,
              pemesanan tiket, pengelolaan
              kapasitas wisata, hingga review
              wisatawan dalam satu platform
              modern.
            </p>
          </div>
        </div>
      </section>

      {/* VISI MISI */}
      <section className='bg-white py-20'>
        <div className='mx-auto max-w-7xl px-6'>
          <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
            {/* VISI */}
            <div className='rounded-3xl border border-slate-200 p-8 shadow-sm'>
              <div className='mb-5 inline-flex rounded-2xl bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700'>
                Visi
              </div>

              <h2 className='text-3xl font-bold text-slate-800'>
                Mendorong Digitalisasi Wisata
                Desa Indonesia
              </h2>

              <p className='mt-5 leading-relaxed text-slate-600'>
                Menjadi platform wisata desa
                modern yang membantu promosi
                dan pengelolaan wisata lokal
                agar lebih mudah diakses oleh
                masyarakat luas.
              </p>
            </div>

            {/* MISI */}
            <div className='rounded-3xl border border-slate-200 p-8 shadow-sm'>
              <div className='mb-5 inline-flex rounded-2xl bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700'>
                Misi
              </div>

              <ul className='space-y-4 text-slate-600'>
                <li>
                  • Membantu promosi wisata
                  desa lokal.
                </li>

                <li>
                  • Menyediakan sistem
                  pemesanan tiket digital.
                </li>

                <li>
                  • Membantu pengelolaan
                  kapasitas pengunjung.
                </li>

                <li>
                  • Memberikan pengalaman
                  wisata yang lebih modern dan
                  nyaman.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className='mx-auto max-w-7xl px-6 py-20'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          <div className='rounded-3xl bg-white p-10 text-center shadow-sm'>
            <h2 className='text-5xl font-bold text-emerald-600'>
              50+
            </h2>

            <p className='mt-4 text-lg text-slate-500'>
              Desa Wisata
            </p>
          </div>

          <div className='rounded-3xl bg-white p-10 text-center shadow-sm'>
            <h2 className='text-5xl font-bold text-emerald-600'>
              2K+
            </h2>

            <p className='mt-4 text-lg text-slate-500'>
              Pengunjung
            </p>
          </div>

          <div className='rounded-3xl bg-white p-10 text-center shadow-sm'>
            <h2 className='text-5xl font-bold text-emerald-600'>
              100+
            </h2>

            <p className='mt-4 text-lg text-slate-500'>
              Tiket Terjual
            </p>
          </div>
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

          <p className='text-slate-400'>
            © 2026 DesaTix. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}