export default function CategoryCard({
  category,
}) {
  return (
    <button className='rounded-2xl border border-slate-200 bg-white px-4 py-5 font-medium text-slate-700 shadow-sm transition hover:-translate-y-1 hover:border-emerald-500 hover:text-emerald-700 hover:shadow-lg'>
      {category}
    </button>
  )
}