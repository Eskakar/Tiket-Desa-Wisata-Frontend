export default function StatusBadge({
  status,
}) {
  const statusConfig = {
    ACTIVE:
      'bg-emerald-100 text-emerald-700',

    PENDING:
      'bg-yellow-100 text-yellow-700',

    COMPLETED:
      'bg-slate-200 text-slate-700',

    CANCELLED:
      'bg-red-100 text-red-700',
  }

  return (
    <div
      className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
        statusConfig[status] ||
        'bg-slate-100 text-slate-700'
      }`}
    >
      {status}
    </div>
  )
}