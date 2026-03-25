import FlowButton from "../components/ui/buttons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Mousewheel } from "swiper/modules";
import { useEffect, useState } from "react";
import { getCollections, type Collection } from "../lib/getCollections";

export default function Browsing() {
  const [collections, setCollections] = useState<Collection[]>([]);
  useEffect(() => {
    getCollections().then((data: any) => {
      setCollections(data);
    });
  }, []);

  return (
    <>
      <div className="container p-4!">
        <h3 className="lg:text-4xl md:text-3xl text-2xl font-black text-center my-10">
          Browse Our Collections
        </h3>

        <div>
          <Swiper
            modules={[Pagination, A11y, Mousewheel]}
            spaceBetween={24}
            allowTouchMove={true}
            mousewheel={{
              forceToAxis: true,
            }}
            pagination={{ clickable: true }}
            className="pb-18!"
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
            }}
          >
            {collections.map((item, index) => (
              <SwiperSlide
                key={index}
                className="card rounded-2xl relative bg-[#f2f7fe] flex flex-col h-full"
              >
                <div className="h-full flex flex-col">
                  <div className="img">
                    <img
                      src={item.image.url}
                      alt={item.title}
                      className="rounded-2xl block w-full"
                    />
                  </div>

                  <div className="text">
                    <div className="inner-text bg-[#f2f7fe] w-full rounded-2xl p-6">
                      <span className="block text-[18px] sm:text-[20px] font-semibold mb-3">
                        {item.title}
                      </span>

                      <p className="text-[18px] leading-8 text-[#656b76] mb-0">
                        {item.description || "no decription avaliable"}
                      </p>

                      <div className="flow-btn-wrap mt-5 w-full">
                        <FlowButton text="View Collection" />
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
