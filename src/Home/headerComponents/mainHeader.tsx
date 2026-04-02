import Profile from "../../assets/icons/profile.svg";
import cart from "../../assets/icons/cart.svg";
import { useState } from "react";
import MobileMenu from "./sideBar";
import { Link } from "react-router-dom";
export default function MainHeader() {
  const [hidden, setHidden] = useState(false);
  return (
    <header className="py-6">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* LOGO */}
        <Link
          to={"/"}
          className="font-black text-2xl md:text-3xl cursor-pointer"
        >
          SHOP.CO
        </Link>

        {/* NAV LINKS */}
        <ul className="hidden md:flex gap-6 lg:gap-10 font-medium">
          <li className="hover:opacity-70 cursor-pointer">Shop</li>
          <li className="hover:opacity-70 cursor-pointer">On Sale</li>
          <li className="hover:opacity-70 cursor-pointer">New Arrivals</li>
          <li className="hover:opacity-70 cursor-pointer">Brand</li>
        </ul>

        {/* SEARCH */}
        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <div className="group w-full">
            {/* <input
              type="search"
              placeholder="Search..."
              className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 outline-none"
            /> */}
            <input
              id="query"
              className="input w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 outline-none"
              type="search"
              placeholder="Search..."
              name="searchbar"
            />
            <svg viewBox="0 0 24 24" aria-hidden="true" className="search-icon">
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>{" "}
              </g>
            </svg>
          </div>
        </div>

        {/* ICONS */}
        <div className="flex items-center gap-6">
          <img src={cart} alt="" className="w-6 cursor-pointer" />
          <img src={Profile} alt="" className="w-6 cursor-pointer" />

          {/* MOBILE MENU ICON */}
          <div
            className="md:hidden cursor-pointer"
            onClick={() => setHidden(!hidden)}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </div>

          {hidden && <MobileMenu setIsOpen={setHidden} isOpen={hidden} />}
        </div>
      </div>
    </header>
  );
}
