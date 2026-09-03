function BrandFilter({
  value,
  onChange,
}) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="
        rounded-lg
        border
        p-3
        bg-white
      "
    >
      <option value="">
        All Brands
      </option>

      <option value="Apple">
        Apple
      </option>

      <option value="Samsung">
        Samsung
      </option>

      <option value="Sony">
        Sony
      </option>

      <option value="Nike">
        Nike
      </option>

      <option value="Ikea">
        Ikea
      </option>
    </select>
  );
}

export default BrandFilter;