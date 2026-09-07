const categories = ["Electronics", "Books", "Furniture", "Clothing"];

const brands = ["Apple", "Samsung", "Sony", "Nike", "Ikea"];

export const generateProducts = (count = 10000) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    brand: brands[Math.floor(Math.random() * brands.length)],
    price: Math.floor(Math.random() * 5000) + 100,
  }));
};
