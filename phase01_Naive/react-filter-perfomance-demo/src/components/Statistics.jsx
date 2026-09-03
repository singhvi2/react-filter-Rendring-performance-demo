import StatCard from "./StatCard";

function Statistics({
  renderCount,
  filterCount,
  filterTime,
  totalProducts,
  filteredProducts,
}) {
  return (
    <div className="mb-6 grid gap-4 md:grid-cols-4">
      <StatCard title="Render Count" value={renderCount} />

      <StatCard title="Filter Count" value={filterCount} />

      <StatCard title="Filter Time" value={filterTime} />

      <StatCard title="Total Products" value={totalProducts} />

      <StatCard title="Filtered Products" value={filteredProducts} />
    </div>
  );
}

export default Statistics;
