import { getProducts } from "../lib/getProducts";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
interface Products {
  id: number;
  title: string;
  handle: string;
  priceRange: {
    minVariantPrice: { amount: string };
  };
  oldPrice: number;
  hasDiscount: boolean;
  discountPercent: number;
  rating: number;
  slug: string;
  description: string;
  featuredImage: { url: string };
}

export default function NewArrivals() {
  const [products, setProducts] = useState<Products[]>([]);
  useEffect(() => {
    getProducts()
      .then((data: any) => {
        const updatedProducts = data.map((item: any, index: number) => {
          const hasDiscount = index % 2 === 0;
          const discountPercent = hasDiscount ? 20 : 0;
          const oldPrice = hasDiscount
            ? Math.round(
                item.priceRange.minVariantPrice.amount /
                  (1 - discountPercent / 100),
              )
            : item.price;
          const ratingOptions = [3.5, 4, 4.5, 5];
          const rating = ratingOptions[index % ratingOptions.length];
          return {
            ...item,
            hasDiscount,
            discountPercent,
            oldPrice,
            rating,
          };
        });
        setProducts(updatedProducts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <div className="container py-14 text-center">
        <h2 className="mt-8 text-2xl font-black md:text-3xl lg:text-4xl">
          NEW ARRIVALS
        </h2>
        <div className=" grid w-full grid-cols-2 gap-8 py-8 md:grid-cols-3 lg:grid-cols-4 px-4">
          {products.map((product: Products) => {
            return (
              <Link to={`/product/${product.handle}`} className="w-full group" key={product.id}>
                <img
                  src={product.featuredImage.url}
                  alt={product.title}
                  className="w-full aspect-square object-cover rounded-2xl group-hover:scale-[1.02] transition-transform duration-300"
                />
                <div className="card-details text-left">
                  <h4 className="font-semibold text-xl my-2 group-hover:text-[#354062] transition">
                    {product.title}
                  </h4>
                  {product.hasDiscount ? (
                    <>
                      <span className="lg:font-bold font-medium text-xl">
                        ${product.priceRange.minVariantPrice.amount}
                      </span>
                      <span className="text-gray-400 line-through text-[18px] mx-2">
                        ${product.oldPrice}
                      </span>
                      <span className="text-red-500 text-sm font-semibold bg-[#ff333325] p-2 rounded-2xl">
                        -{product.discountPercent}%
                      </span>
                    </>
                  ) : (
                    <span className="lg:font-bold font-medium text-xl">
                      ${product.priceRange.minVariantPrice.amount}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        <button className="border py-2 mt-4 px-12 rounded-4xl cursor-pointer hover:bg-black hover:text-white">
          View All
        </button>
      </div>
    </>
  );
}
