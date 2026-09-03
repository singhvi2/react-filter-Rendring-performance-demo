import ProductCard from "./ProductCard";

function ProductList({ products }) {
  console.log("ProductList Render");

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
