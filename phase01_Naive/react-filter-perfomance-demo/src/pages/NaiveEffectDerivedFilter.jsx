import ProductList from "../components/ProductList.jsx";
import { generateProducts } from "../utils/generateProducts.js";
// import { filterProducts } from "../utils/filterProducts.js";
import Staticstics from "../components/Statistics.jsx";
import { useEffect, useRef, useState } from "react";
import SearchFilter from "../components/filters/SearchFilter.jsx";

const products = generateProducts(100);
function NaiveEffectDerivedFilter() {
  const renderCount = useRef(0);
  const filterCount = useRef(0);
  filterCount.current++;
  renderCount.current++;

  const [lists, setList] = useState(products);
  const [search, setSearch] = useState("");
  const [filteredProducts, setfilteredProducts] = useState([]);

  useEffect(() => {
    setfilteredProducts(
      lists.filter((list) =>
        list.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
      ),
    );
  }, [lists, search]);
  // const filteredProducts = filterProducts(products, {
  //   search,
  //   category: "",
  //   brand: "",
  //   price: 5000,
  // });

  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold">Naive Filter Implementation</h1>
      <p className="text-slate-600">
        Baseline implementation without any optimization.
      </p>

      <Staticstics
        renderCount={renderCount.current}
        filterCount={filterCount.current}
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
