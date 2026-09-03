function StatCard({ title, value }) {
  return (
    <div className="rounded-xl bg-white p-4 shadow">
      <h3 className="text-sm text-slate-500">{title}</h3>

      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}

export default StatCard;
