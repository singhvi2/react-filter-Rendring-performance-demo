/**
 * Description placeholder
 *
 * @param {*} products : list of all product
 * @param {*} filters :{search :  product.name, category : product.category,brand : .. , price:}
 * @returns {*}
 */
export const filterProducts = (products, filters) => {
  return products.filter((product) => {
    const searchMatch = product.name
      .toLowerCase()
      .includes(filters.search.toLowerCase());

    const categoryMatch =
      !filters.category || product.category === filters.category;

    const brandMatch = !filters.brand || product.brand === filters.brand;

    const priceMatch = product.price <= filters.price;

    return searchMatch && categoryMatch && brandMatch && priceMatch;
  });
};
