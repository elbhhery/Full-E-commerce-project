const SHOPIFY_STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_TOKEN;
const SHOPIFY_API_VERSION = import.meta.env.VITE_SHOPIFY_API_VERSION;

const SHOPIFY_ENDPOINT = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

type ShopifyFetchParams = {
  query: string;
  variables?: Record<string, unknown>;
};

export async function shopifyFetch<T>({
  query,
  variables = {},
}: ShopifyFetchParams): Promise<T> {
  const res = await fetch(SHOPIFY_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`Shopify request failed: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error("Shopify GraphQL returned errors");
  }

  return json.data;
}
export interface Product {
  id: string;
  title: string;
  handle: string;
  featuredImage: { url: string } | null;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
}
export async function getProductsByCollectionHandle(
  handle: string,
): Promise<Product[]> {
  const query = `
    query GetProductsByCollectionHandle($handle: String!) {
      collection(handle: $handle) {
        title
        products(first: 8) {
          nodes {
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
      }
    }
  `;

  const data = await shopifyFetch<{
    collection: {
      title: string;
      products: {
        nodes: Product[];
      };
    } | null;
  }>({
    query,
    variables: { handle },
  });

  return data.collection?.products.nodes || [];
}
