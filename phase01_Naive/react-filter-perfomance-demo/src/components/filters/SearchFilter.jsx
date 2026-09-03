function SearchFilter({
  search,
  setSearch,
}) {
  return (
    <input
      type="text"
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      placeholder="Search products Name ..."
      className="
        w-full
        rounded-lg
        border
        p-3
        bg-white
      "
    />
  );
}

export default SearchFilter;