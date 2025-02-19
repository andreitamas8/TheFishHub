const productsUrl =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:3000/api/products" // Localhost (for your machine)
    : `http://${window.location.hostname}:3000/api/products`; // For mobile device on the same network

export const getUrl = ({
  category = "",
  subcategory = "",
  discount = "",
  discountValue = "",
  id = "",
  search = false,
  query = "",
} = {}) => {
  let url = `${productsUrl}`;
  if (discount) url += `/discount`;
  if (discountValue) url += `/${encodeURIComponent(discountValue)}`;
  if (category) url += `/${encodeURIComponent(category)}`;
  if (subcategory) url += `/${encodeURIComponent(subcategory)}`;
  if (id) url += `/${id}`;
  if (search && query) url += `/search?q=${query}`;

  return url;
};
