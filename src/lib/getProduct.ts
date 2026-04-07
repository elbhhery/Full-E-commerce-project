import { shopifyFetch } from "./getProducts";

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: {
    amount: string;
    currencyCode: string;
  };
  compareAtPrice: {
    amount: string;
    currencyCode: string;
  } | null;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  image: {
    url: string;
    altText: string | null;
  } | null;
}

export interface ProductImage {
  url: string;
  altText: string | null;
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  featuredImage: {
    url: string;
  };
  images: {
    nodes: ProductImage[];
  };
  variants: {
    nodes: ProductVariant[];
  };
  options: {
    name: string;
    values: string[];
  }[];
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
}

export async function getProduct(handle: string): Promise<Product | null> {
  const query = `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        descriptionHtml
        featuredImage {
          url
        }
        images(first: 10) {
          nodes {
            url
            altText
          }
        }
        variants(first: 100) {
          nodes {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
            image {
              url
              altText
            }
          }
        }
        options {
          name
          values
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ product: Product | null }>({ 
    query, 
    variables: { handle } 
  });
  
  return data.product;
}

export async function getRelatedProducts(productId: string): Promise<any[]> {
  const query = `
    query getRecommendations($productId: ID!) {
      productRecommendations(productId: $productId) {
        id
        title
        handle
        featuredImage {
          url
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<{ productRecommendations: any[] }>({ 
      query, 
      variables: { productId } 
    });
    return data.productRecommendations || [];
  } catch {
    return [];
  }
}
