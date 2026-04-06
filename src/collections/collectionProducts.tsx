import MainHeader from "@/Home/headerComponents/mainHeader";
import { getCollectionsByHandle, type products } from "@/lib/getCollections";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import starsIcon from "../assets/images/icon-stars_small.avif";
import QuickViewModal from "@/components/shared/QuickViewModal";
import { FilterButton, MainButton } from "@/components/ui/buttons";
import { motion } from "framer-motion";
import FilterMenu from "@/components/shared/filter";
import SortMenu from "@/components/shared/sort";
import MediaBaner from "@/components/shared/mediaBaner";
import CardSlider from "@/components/shared/cardSlider";
import Footer3 from "@/components/shared/Footer";
export default function CollectionsProducts() {
  const { handle } = useParams();
  // const [fillteredProducts, setFillteredProducts] = useState<any>([]);
  const [filterMenu, setFillterMenu] = useState<any>(false);
  // sort variables
  const [sortMenu, setSortMenu] = useState<any>(false);
  const [currentSort, setCurrentSort] = useState("featured");
  const [sortProducts, setSortProducts] = useState<any>([]);
  //
  const [collection, setCollection] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  //  handle data
  useEffect(() => {
    async function loadData() {
      if (handle) {
        setLoading(true);
        const data = await getCollectionsByHandle(handle);
        setSortProducts(data.products?.nodes);
        setCollection(data);
        setLoading(false);
      }
    }
    loadData();
  }, [handle]);
  // handle loading
  if (loading) return <div>جاري التحميل...</div>;
  if (!collection) return <div>المجموعة غير موجودة!</div>;
  //  handle sort
  const handleSort = (criteria: string) => {
    setCurrentSort(criteria);
    let tempArray = [...sortProducts];

    if (criteria === "price-asc") {
      tempArray.sort(
        (a, b) =>
          parseFloat(a.priceRange.minVariantPrice.amount) -
          parseFloat(b.priceRange.minVariantPrice.amount),
      );
    } else if (criteria === "price-desc") {
      tempArray.sort(
        (a, b) =>
          parseFloat(b.priceRange.minVariantPrice.amount) -
          parseFloat(a.priceRange.minVariantPrice.amount),
      );
    } else if (criteria === "title-asc") {
      tempArray.sort((a, b) => a.title.localeCompare(b.title));
    } else if (criteria === "title-desc") {
      tempArray.sort((a, b) => b.title.localeCompare(a.title));
    } else {
      tempArray = collection.products?.nodes;
    }
    setSortProducts(tempArray);
    setSortMenu(false);
  };
  // handle quick view
  const QuickView = (product: any) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };
  // handle filter slider
  return (
    <>
      <QuickViewModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        product={selectedProduct}
      />
      <FilterMenu isOpen={filterMenu} setIsOpen={setFillterMenu} />
      <SortMenu
        isOpen={sortMenu}
        handleSort={handleSort}
        setIsOpen={setSortMenu}
        currentSort={currentSort}
      />
      <MainHeader />
      <div className="container">
        <Link
          to="/collections"
          className="flex items-center gap-1 w-fit text-gray-500"
        >
          <svg
            className="icon icon-caret rotate-90"
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
          <span>Collections</span>
        </Link>
        <div className="flex flex-col md:flex-row justify-between my-6 max-w-full md:items-center items-start">
          <div className="max-w-90 flex flex-col gap-2">
            <img src={starsIcon} alt="" className="w-12" />
            <h2 className="text-[#162135] text-3xl font-bold">
              {collection.title}
            </h2>
            <p className="text-[rgb(101,107,118)] text-[15px]">
              {collection.description}
            </p>
          </div>
          <div className="lg:w-auto ">
            <img
              src={collection.image?.url}
              alt=""
              className="w-full md:w-90 h-auto md:h-48 object-cover rounded-2xl mt-4"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortProducts.map((item: products) => (
            <div key={item.id}>
              {item.images?.nodes[0] && (
                <div className="relative group">
                  <Link to={`/product/${item.handle}`}>
                    <img
                      src={item.images.nodes[0].url}
                      alt={item.title}
                      className="w-full rounded-2xl mb-4 group-hover:scale-[1.02] transition-transform duration-300"
                    />
                  </Link>
                  <span
                    onClick={() => QuickView(item)}
                    className="absolute right-4 bottom-7 cursor-pointer bg-[#3a466a] p-2 text-white rounded-[5px] inline md:hidden"
                  >
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      role="presentation"
                      className="icon icon-quick-view-mobile"
                      width="17"
                      height="12"
                      viewBox="0 0 17 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.21333 8.96C9.14667 8.96 9.94 8.63333 10.5933 7.98C11.2467 7.32667 11.5733 6.53333 11.5733 5.6C11.5733 4.66667 11.2467 3.87333 10.5933 3.22C9.94 2.56667 9.14667 2.24 8.21333 2.24C7.28 2.24 6.48667 2.56667 5.83333 3.22C5.18 3.87333 4.85333 4.66667 4.85333 5.6C4.85333 6.53333 5.18 7.32667 5.83333 7.98C6.48667 8.63333 7.28 8.96 8.21333 8.96ZM8.21333 7.616C7.65333 7.616 7.17733 7.42 6.78533 7.028C6.39333 6.636 6.19733 6.16 6.19733 5.6C6.19733 5.04 6.39333 4.564 6.78533 4.172C7.17733 3.78 7.65333 3.584 8.21333 3.584C8.77333 3.584 9.24933 3.78 9.64133 4.172C10.0333 4.564 10.2293 5.04 10.2293 5.6C10.2293 6.16 10.0333 6.636 9.64133 7.028C9.24933 7.42 8.77333 7.616 8.21333 7.616ZM8.21333 11.2C6.39644 11.2 4.74133 10.6929 3.248 9.67867C1.75467 8.66444 0.672 7.30489 0 5.6C0.672 3.89511 1.75467 2.53556 3.248 1.52133C4.74133 0.507111 6.39644 0 8.21333 0C10.0302 0 11.6853 0.507111 13.1787 1.52133C14.672 2.53556 15.7547 3.89511 16.4267 5.6C15.7547 7.30489 14.672 8.66444 13.1787 9.67867C11.6853 10.6929 10.0302 11.2 8.21333 11.2ZM8.21333 9.70667C9.61956 9.70667 10.9107 9.33644 12.0867 8.596C13.2627 7.85556 14.1618 6.85689 14.784 5.6C14.1618 4.34311 13.2627 3.34444 12.0867 2.604C10.9107 1.86356 9.61956 1.49333 8.21333 1.49333C6.80711 1.49333 5.516 1.86356 4.34 2.604C3.164 3.34444 2.26489 4.34311 1.64267 5.6C2.26489 6.85689 3.164 7.85556 4.34 8.596C5.516 9.33644 6.80711 9.70667 8.21333 9.70667Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                  <motion.span
                    initial={{ y: "100%", x: "-50%" }}
                    className="absolute w-max left-[50%] bottom-16 hidden md:flex items-center justify-center
                     opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0
                     transition-all duration-300 ease-out z-20"
                  >
                    <MainButton
                      text="Quick View"
                      onClick={() => QuickView(item)}
                    />
                  </motion.span>
                </div>
              )}
              <Link to={`/product/${item.handle}`} className="hover:text-[#354062] transition">
                <h2 className="font-semibold text-[#162135] text-[15px]">
                  {item.title}
                </h2>
              </Link>
              <p className="text-green-800 font-semibold">
                {item.priceRange?.minVariantPrice?.amount}
                {item.priceRange?.minVariantPrice?.currencyCode}
              </p>
            </div>
          ))}
        </div>
        <FilterButton
          onFilterClick={() => setFillterMenu(true)}
          onSortClick={() => setSortMenu(true)}
        />
      </div>
      <MediaBaner />
      <CardSlider />
      <Footer3 />
    </>
  );
}
