import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
// import { Pagination, A11y, Mousewheel } from "swiper/modules";
import { getCollections, type Collection } from "@/lib/getCollections";
import { Link } from "react-router-dom";
import MainHeader from "@/Home/headerComponents/mainHeader";
import MediaBaner from "@/components/shared/mediaBaner";
import CardSlider from "@/components/shared/cardSlider";
import Footer3 from "@/components/shared/Footer";
import FlowButton from "../components/ui/buttons";
export default function Collections() {
  const [collections, setCollections] = useState<Collection[]>([]);
  useEffect(() => {
    getCollections().then((data) => {
      setCollections(data);
    });
  }, []);
  return (
    <>
      <MainHeader />
      <div className="container mt-6!">
        <Link to="/" className="flex items-center gap-1 w-fit text-gray-500">
          <span className="rotate-90">
            <svg
              className="icon icon-caret"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5 5.25L7 8.75L3.5 5.25"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </span>
          <span>
            <svg
              className="icon icon-home"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.5 13.5V9.5H9.5V13.5H13.5V7.5C13.5001 7.43432 13.4872 7.36927 13.4621 7.30858C13.437 7.24788 13.4002 7.19272 13.3538 7.14625L8.35375 2.14625C8.30731 2.09976 8.25217 2.06288 8.19147 2.03772C8.13077 2.01256 8.06571 1.99961 8 1.99961C7.93429 1.99961 7.86923 2.01256 7.80853 2.03772C7.74783 2.06288 7.69269 2.09976 7.64625 2.14625L2.64625 7.14625C2.59983 7.19272 2.56303 7.24788 2.53793 7.30858C2.51284 7.36927 2.49995 7.43432 2.5 7.5V13.5H6.5Z"
                stroke="currentColor"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </span>
        </Link>
        <h2 className="text-2xl font-bold my-4">Collections</h2>
        <p className="max-w-[24rem] text-[rgb(101,107,118)]">
          All collections in one view. Explore ranges designed for different
          lifestyles and needs.
        </p>

        <div
          // modules={[Pagination, A11y, Mousewheel]}
          // spaceBetween={24}
          // allowTouchMove={true}
          // mousewheel={{
          //   forceToAxis: true,
          // }}
          // pagination={{ clickable: true }}
          className="mt-8 grid grid-cols-3 grid-rows-2 gap-4"
          // breakpoints={{
          //   0: {
          //     slidesPerView: 1,
          //   },
          //   768: {
          //     slidesPerView: 2,
          //   },
          //   1024: {
          //     slidesPerView: 3,
          //   },
          // }}
        >
          {collections.map((item) => (
            <SwiperSlide
              key={item.id}
              className="card rounded-2xl relative bg-[#f2f7fe] flex flex-col h-auto!"
            >
              <div className="h-full grow flex flex-col">
                <div className="img shrink-0">
                  <img
                    src={item.image?.url || "placeholder-url.jpg"}
                    alt={item.title}
                    className="rounded-2xl block w-full aspect-4/3 object-cover"
                  />
                </div>

                <div className="inner-text bg-[#f2f7fe] w-full rounded-2xl p-6 grow flex-col flex">
                  <span className="block text-[18px] sm:text-[20px] font-semibold mb-3">
                    {item.title}
                  </span>

                  <p className="text-[18px] grow leading-8 text-[#656b76] mb-0">
                    {item.description || "no decription avaliable"}
                  </p>

                  <div className="flow-btn-wrap mt-5 w-full">
                    <FlowButton
                      text="View Collection"
                      path={`/collections/${item.handle}`}
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </div>
      </div>
      <MediaBaner />
      <CardSlider />
      <Footer3 />
    </>
  );
}
