function CategoryFilter({
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
        All Categories
      </option>

      <option value="Electronics">
        Electronics
      </option>

      <option value="Books">
        Books
      </option>

      <option value="Furniture">
        Furniture
      </option>

      <option value="Clothing">
        Clothing
      </option>
    </select>
  );
}

export default CategoryFilter;