import ProductList from "../components/ProductList.jsx";
import { generateProducts } from "../utils/generateProducts.js";
// import { filterProducts } from "../utils/filterProducts.js";
import Staticstics from "../components/Statistics.jsx";
import { useEffect, useRef, useState } from "react";
import SearchFilter from "../components/filters/SearchFilter.jsx";

const products = generateProducts(10000);
function NaiveEffectDerivedFilter() {
  const renderCount = useRef(0);
  const filterCount = useRef(0);
  const filterTime = useRef(0);
  const [lists, setList] = useState(products);
  const [search, setSearch] = useState("");
  const [filteredProducts, setfilteredProducts] = useState([]);

  renderCount.current++;
  const start = performance.now();

  useEffect(() => {
    const start = performance.now();
    filterCount.current++;
    const result = lists.filter((list) =>
      list.name.toLowerCase().includes(search.toLowerCase()),
    );
    const end = performance.now();
    filterTime.current = end - start;
    setfilteredProducts(result);

    // setfilteredProducts(
    //   lists.filter((list) =>
    //     list.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
    //   ),
    // );
  }, [lists, search]);

  // const filteredProducts = filterProducts(products, {
  //   search,
  //   category: "",
  //   brand: "",
  //   price: 5000,
  // });

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
        totalProducts={lists.length}
        filteredProducts={filteredProducts.length}
      />
      <div className="mb-6">
        <SearchFilter search={search} setSearch={setSearch} />
      </div>

      <ProductList products={filteredProducts.slice(0, 50)} />
    </div>
  );
}

export default NaiveEffectDerivedFilter;
