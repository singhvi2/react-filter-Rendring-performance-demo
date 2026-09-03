import ProductList from "../components/ProductList.jsx";
import { generateProducts } from "../utils/generateProducts.js";
import { filterProducts } from "../utils/filterProducts.js";
import Staticstics from "../components/Statistics.jsx";
import { useRef, useState } from "react";
import SearchFilter from "../components/filters/SearchFilter.jsx";

const products = generateProducts(10000);
function NaiveFilter() {
  const renderCount = useRef(0);
  const filterCount = useRef(0);
  const filterTime = useRef(0);
  const [search, setSearch] = useState("");

  renderCount.current++;
  const start = performance.now();
  filterCount.current++;

  const filteredProducts = filterProducts(products, {
    search,
    // category: "",
    // brand: "",
    // price: 5000,
  });
  const end = performance.now();
  filterTime.current = end - start;

  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold">Naive Filter Implementation</h1>
      <p className="text-slate-600">
        Baseline implementation without any optimization.
      </p>

      <Staticstics
        renderCount={renderCount.current}
        filterCount={filterCount.current}
        filterTime={filterTime.current}
        totalProducts={products.length}
        filteredProducts={filteredProducts.length}
      />
      <div className="mb-6">
        <SearchFilter search={search} setSearch={setSearch} />
      </div>

      <ProductList products={filteredProducts} />
    </div>
  );
}

export default NaiveFilter;
