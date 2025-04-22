import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import { getProducts } from "../services/products";
export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((res) => {
      setProducts(res);
    });
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {products.map((product, key) => (
            <Product
              key={`${product.id}-${key}`}
              name={product.name}
              images={product.images}
              category={product.category}
              price={product.price}
              slug={product.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
