const url = "https://dummyjson.com/products/category/fragrances";

export async function getProducts() {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error HTTP response: ${response.status}`);
  }
  const data = await response.json();
  console.log(data.products);
  return data.products;
}
