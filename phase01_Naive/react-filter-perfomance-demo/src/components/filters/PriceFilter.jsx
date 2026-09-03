function PriceFilter({
  value,
  onChange,
}) {
  return (
    <div>
      <label className="block mb-2">
        Max Price: ₹{value}
      </label>

      <input
        type="range"
        min="100"
        max="5000"
        value={value}
        onChange={onChange}
        className="w-full"
      />
    </div>
  );
}

export default PriceFilter;