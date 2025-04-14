import React from "react";

export default function Product({ name, images, category, price }) {
  return (
    <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
      <a className="block relative h-48 rounded overflow-hidden">
        <img
          alt={name}
          className="object-cover object-center w-full h-full block"
          src={images?.[0] ?? ""}
        />
      </a>
      <div className="mt-4">
        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
          {category?.name ?? ""}
        </h3>
        <h2 className="text-gray-900 title-font text-lg font-medium">{name}</h2>
        <p className="mt-1">{price}</p>
      </div>
    </div>
  );
}
