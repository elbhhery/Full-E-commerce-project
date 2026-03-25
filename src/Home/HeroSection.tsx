import hero from "../assets/images/hero-background.jpg";
import heroMobile from "../assets/images/hero-mobile.jpg";

export default function Hero() {
  return (
    <section
      className="relative md:bg-cover md:bg-center min-h-screen flex items-center"
      style={{ backgroundImage: `url(${hero})` }}
    >
      <div className="container mx-auto px-6 grid md:grid-cols-2 items-center">
        {/* LEFT CONTENT */}
        <div className="z-10 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black leading-tight">
            FIND CLOTHES <br />
            THAT MATCHES <br />
            YOUR STYLE
          </h1>

          <p className="text-gray-500 mt-6 max-w-md">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>

          <button className="mt-6 bg-black text-white px-8 py-3 rounded-full hover:bg-[#504d4d] cursor-pointer">
            Shop Now
          </button>

          {/* STATS */}
          <div className="grid grid-cols-2 gap-8 mt-10 sm:flex sm:flex-row">
            <div>
              <h3 className="text-2xl font-bold">200+</h3>
              <p className="text-gray-500 text-sm">International Brands</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold">2,000+</h3>
              <p className="text-gray-500 text-sm">High-Quality Products</p>
            </div>

            <div className="col-span-2 flex justify-center sm:block">
              <div>
                <h3 className="text-2xl font-bold">30,000+</h3>
                <p className="text-gray-500 text-sm">Happy Customers</p>
              </div>
            </div>
          </div>

          {/* MOBILE IMAGE */}
          <img
            src={heroMobile}
            alt=""
            className="mt-10 md:hidden w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
