import { Product } from "./types/index";
import ProductCard from "./components/ProductCard";

async function getProducts(){
  const res = await fetch("https://dummyjson.com/products");

  if(!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}


export default async function Home() {
  const data = await getProducts();

  const products: Product[] = data.products;

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8 text-slate-800">Каталог товаров</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}