export default function CategoryCard({
  category,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className='rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg'
    >
      <p className='font-semibold text-slate-700'>
        {category}
      </p>
    </button>
  )
}