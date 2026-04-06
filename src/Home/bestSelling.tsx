import {
  getProductsByCollectionHandle,
  type Product,
} from "../lib/getBestSelling";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Mousewheel } from "swiper/modules";
import FlowButton from "@/components/ui/buttons";
import { Link } from "react-router-dom";
export default function BestSelling() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    getProductsByCollectionHandle("best-seller").then((data: any) => {
      setProducts(data);
    });
  }, []);
  return (
    <>
      <div className="container py-14 px-6 overflow-hidden!">
        <h2 className="font-bold text-[rgb(22,33,53)] text-3xl my-4">
          BEST SELLERS HERE
        </h2>
        <Swiper
          modules={[Pagination, A11y, Mousewheel]}
          spaceBetween={24}
          allowTouchMove={true}
          mousewheel={{
            forceToAxis: true,
          }}
          pagination={{ clickable: true }}
          className=" pb-12!"
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
        >
          <div className="w-full py-8 px-4">
            {products.map((product: Product) => {
              return (
                <SwiperSlide className="w-full" key={product.id}>
                  <Link to={`/product/${product.handle}`} className="block group">
                    <img
                      src={product.featuredImage?.url}
                      alt={product.title}
                      className="rounded-2xl group-hover:scale-[1.02] transition-transform duration-300"
                    />
                    <div className="card-details text-left">
                      <h4 className="lg:font-semibold font-medium md:text-xl text-lg my-2 text-[rgb(22,33,53)] group-hover:text-[#354062] transition">
                        {product.title}
                      </h4>
                      <span className="text-[rgb(81,131,57)] font-bold">
                        ${product.priceRange.minVariantPrice.amount}
                      </span>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </div>
        </Swiper>
        <div className="w-full flex justify-center">
          <FlowButton text="View All" />
        </div>
      </div>
    </>
  );
}
