import { useEffect, useState } from "react";
import { getCollections, type Collection } from "../lib/getCollections";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Mousewheel } from "swiper/modules";
import FlowButton from "../components/ui/buttons";

export default function Browsing() {
  const [collections, setCollections] = useState<Collection[]>([]);
  useEffect(() => {
    getCollections().then((data: any) => {
      setCollections(data);
    });
  }, []);

  return (
    <>
      <div className="container p-4! overflow-hidden!">
        <h3 className="lg:text-4xl md:text-3xl text-2xl font-black text-center my-10">
          Browse Our Collections
        </h3>

        <Swiper
          modules={[Pagination, A11y, Mousewheel]}
          spaceBetween={24}
          allowTouchMove={true}
          mousewheel={{
            forceToAxis: true,
          }}
          pagination={{ clickable: true }}
          className="pb-18! flex items-stretch"
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
        </Swiper>
      </div>
    </>
  );
}
