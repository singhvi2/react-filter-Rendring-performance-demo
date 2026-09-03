// function ProductCard() {
function ProductCard({ product }) {
  console.log("ProductCard Render", product.id);
  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <h3 className="font-semibold">{product.name}</h3>

      <p>{product.category}</p>

      <p>{product.brand}</p>

      <p>₹{product.price}</p>
    </div>
  );
}

export default ProductCard;
