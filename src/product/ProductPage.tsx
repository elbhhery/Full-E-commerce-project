import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProduct, getRelatedProducts, type Product, type ProductVariant } from "../lib/getProduct";
import { useCart } from "../context/CartContext";
import MainHeader from "../Home/headerComponents/mainHeader";
import Footer from "../components/shared/Footer";
import { ChevronRight, Minus, Plus, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductPage() {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart, isLoading: cartLoading } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      if (!handle) return;
      setLoading(true);
      try {
        const productData = await getProduct(handle);
        setProduct(productData);

        // Set default options
        if (productData?.options) {
          const defaults: Record<string, string> = {};
          productData.options.forEach(option => {
            defaults[option.name] = option.values[0];
          });
          setSelectedOptions(defaults);
        }

        // Fetch related products
        if (productData?.id) {
          const related = await getRelatedProducts(productData.id);
          setRelatedProducts(related.slice(0, 4));
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
    setSelectedImage(0);
    setQuantity(1);
    setAddedToCart(false);
  }, [handle]);

  // Find the selected variant based on selected options
  const findSelectedVariant = (): ProductVariant | undefined => {
    if (!product) return undefined;

    return product.variants.nodes.find(variant => {
      return variant.selectedOptions.every(
        option => selectedOptions[option.name] === option.value
      );
    });
  };

  const selectedVariant = findSelectedVariant();

  const formatPrice = (amount: string, currencyCode: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
    }).format(parseFloat(amount));
  };

  const handleAddToCart = async () => {
    if (!selectedVariant || !selectedVariant.availableForSale) return;

    await addToCart(selectedVariant.id, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (loading) {
    return (
      <>
        <MainHeader />
        <div className="container mx-auto px-4 py-20">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="w-10 h-10 border-4 border-[#354062] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <MainHeader />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-500 mb-6">The product you are looking for does not exist.</p>
          <Link to="/collections" className="bg-[#354062] text-white px-6 py-3 rounded-full">
            Browse Products
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const images = product.images.nodes;

  return (
    <>
      <MainHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-black transition">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/collections" className="hover:text-black transition">Shop</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-black truncate">{product.title}</span>
        </nav>

        {/* Product Section */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div className="flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-2 overflow-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition flex-shrink-0 ${selectedImage === index ? "border-[#354062]" : "border-transparent"
                    }`}
                >
                  <img
                    src={image.url}
                    alt={image.altText || `${product.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <motion.div
              className="flex-1 aspect-square bg-gray-100 rounded-2xl overflow-hidden"
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={images[selectedImage]?.url || product.featuredImage.url}
                alt={images[selectedImage]?.altText || product.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">{product.title}</h1>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl font-bold">
                {selectedVariant
                  ? formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)
                  : formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)
                }
              </span>
              {selectedVariant?.compareAtPrice && (
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(selectedVariant.compareAtPrice.amount, selectedVariant.compareAtPrice.currencyCode)}
                </span>
              )}
            </div>

            {/* Options */}
            {product.options.map(option => (
              option.values.length > 1 && (
                <div key={option.name} className="mb-6">
                  <p className="font-medium mb-3">{option.name}</p>
                  <div className="flex flex-wrap gap-2">
                    {option.values.map(value => {
                      const isSelected = selectedOptions[option.name] === value;
                      return (
                        <button
                          key={value}
                          onClick={() => setSelectedOptions(prev => ({ ...prev, [option.name]: value }))}
                          className={`px-4 py-2 rounded-full border transition ${isSelected
                              ? "bg-[#354062] text-white border-[#354062]"
                              : "border-gray-300 hover:border-[#354062]"
                            }`}
                        >
                          {value}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )
            ))}

            {/* Quantity */}
            <div className="mb-6">
              <p className="font-medium mb-3">Quantity</p>
              <div className="flex items-center gap-4 bg-gray-100 rounded-full w-fit px-4 py-2">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-1 hover:bg-gray-200 rounded-full transition"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="font-medium w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="p-1 hover:bg-gray-200 rounded-full transition"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedVariant?.availableForSale || cartLoading}
              className={`w-full py-4 rounded-full font-semibold transition flex items-center justify-center gap-2 ${!selectedVariant?.availableForSale
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : addedToCart
                    ? "bg-green-500 text-white"
                    : "bg-[#354062] text-white hover:bg-[#2a3350]"
                }`}
            >
              {cartLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : addedToCart ? (
                <>
                  <Check className="w-5 h-5" />
                  Added to Cart
                </>
              ) : !selectedVariant?.availableForSale ? (
                "Out of Stock"
              ) : (
                "Add to Cart"
              )}
            </button>

            {/* Description */}
            <div className="mt-8 pt-8 border-t">
              <h2 className="font-bold text-lg mb-4">Product Description</h2>
              {product.descriptionHtml ? (
                <div
                  className="text-gray-600 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />
              ) : (
                <p className="text-gray-600">{product.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-8 text-center">You Might Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map(relProduct => (
                <Link
                  key={relProduct.id}
                  to={`/product/${relProduct.handle}`}
                  className="group"
                >
                  <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-3">
                    <img
                      src={relProduct.featuredImage?.url}
                      alt={relProduct.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <h3 className="font-medium text-sm line-clamp-2 group-hover:text-[#354062] transition">
                    {relProduct.title}
                  </h3>
                  <p className="font-bold text-sm mt-1">
                    {formatPrice(
                      relProduct.priceRange.minVariantPrice.amount,
                      relProduct.priceRange.minVariantPrice.currencyCode
                    )}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
