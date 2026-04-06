import { useEffect, useState, useCallback } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { searchProducts, SearchProduct } from "../lib/searchProducts";
import { useCart } from "../context/CartContext";
import MainHeader from "../Home/headerComponents/mainHeader";
import Footer from "../components/shared/Footer";
import { Search, SlidersHorizontal, X, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type SortOption = "RELEVANCE" | "PRICE" | "TITLE" | "CREATED_AT";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialQuery = searchParams.get("q") || "";
  
  const [query, setQuery] = useState(initialQuery);
  const [products, setProducts] = useState<SearchProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortKey, setSortKey] = useState<SortOption>("RELEVANCE");
  const [reverse, setReverse] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart, isLoading: cartLoading } = useCart();
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setProducts([]);
      return;
    }

    setLoading(true);
    try {
      const result = await searchProducts(searchQuery, 24, sortKey, reverse);
      setProducts(result.products);
    } catch (error) {
      console.error("Search failed:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [sortKey, reverse]);

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery, performSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
      performSearch(query.trim());
    }
  };

  const handleSortChange = (newSortKey: SortOption) => {
    setSortKey(newSortKey);
    setShowFilters(false);
  };

  const handleAddToCart = async (product: SearchProduct) => {
    const variantId = product.variants.nodes[0]?.id;
    if (!variantId) return;
    
    setAddingToCart(product.id);
    await addToCart(variantId, 1);
    setAddingToCart(null);
  };

  const formatPrice = (amount: string, currencyCode: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
    }).format(parseFloat(amount));
  };

  const clearSearch = () => {
    setQuery("");
    setProducts([]);
    navigate("/search");
  };

  return (
    <>
      <MainHeader />
      
      <main className="container mx-auto px-4 py-8 min-h-screen">
        {/* Search Header */}
        <div className="max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl font-bold text-center mb-6">Search Products</h1>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products..."
              className="w-full py-4 px-6 pl-14 pr-12 rounded-full border-2 border-gray-200 focus:border-[#354062] outline-none text-lg transition"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
            {query && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-16 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            )}
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#354062] text-white px-5 py-2 rounded-full font-medium hover:bg-[#2a3350] transition"
            >
              Search
            </button>
          </form>
        </div>

        {/* Results Section */}
        {initialQuery && (
          <div className="mb-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <p className="text-gray-600">
                {loading ? (
                  "Searching..."
                ) : (
                  <>
                    {products.length} result{products.length !== 1 ? "s" : ""} for{" "}
                    <span className="font-semibold text-black">{`"${initialQuery}"`}</span>
                  </>
                )}
              </p>

              {/* Sort Button */}
              <div className="relative">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 border rounded-full hover:bg-gray-50 transition"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Sort</span>
                </button>

                {/* Sort Dropdown */}
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg border p-2 z-20 min-w-[180px]"
                    >
                      {[
                        { key: "RELEVANCE", label: "Relevance" },
                        { key: "PRICE", label: "Price: Low to High" },
                        { key: "TITLE", label: "Alphabetically" },
                        { key: "CREATED_AT", label: "Newest" },
                      ].map((option) => (
                        <button
                          key={option.key}
                          onClick={() => {
                            handleSortChange(option.key as SortOption);
                            if (option.key === "PRICE") {
                              setReverse(false);
                            }
                          }}
                          className={`w-full text-left px-4 py-2 rounded-lg transition ${
                            sortKey === option.key
                              ? "bg-[#354062] text-white"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-[#354062] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* No Results */}
        {!loading && initialQuery && products.length === 0 && (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">No products found</h2>
            <p className="text-gray-500 mb-6">
              {`We couldn't find any products matching "${initialQuery}"`}
            </p>
            <Link
              to="/collections"
              className="inline-block bg-[#354062] text-white px-6 py-3 rounded-full font-medium hover:bg-[#2a3350] transition"
            >
              Browse All Products
            </Link>
          </div>
        )}

        {/* Products Grid */}
        {!loading && products.length > 0 && (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <Link to={`/product/${product.handle}`}>
                  <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-3 relative">
                    {product.featuredImage ? (
                      <img
                        src={product.featuredImage.url}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                </Link>
                
                <div className="space-y-2">
                  <Link to={`/product/${product.handle}`}>
                    <h3 className="font-medium text-sm line-clamp-2 group-hover:text-[#354062] transition">
                      {product.title}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-sm">
                      {formatPrice(
                        product.priceRange.minVariantPrice.amount,
                        product.priceRange.minVariantPrice.currencyCode
                      )}
                    </p>
                    
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={cartLoading || addingToCart === product.id}
                      className="p-2 bg-[#354062] text-white rounded-full hover:bg-[#2a3350] transition disabled:opacity-50"
                    >
                      {addingToCart === product.id ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <ShoppingCart className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Initial State */}
        {!initialQuery && !loading && (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Search Our Products</h2>
            <p className="text-gray-500">Enter a search term to find what you are looking for</p>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
