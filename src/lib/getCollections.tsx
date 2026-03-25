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

export type Collection = {
  id: string;
  title: string;
  handle: string;
  description: string;
  updatedAt: string;
  image: {
    url: string;
  };
  seo: {
    title: string | null;
    description: string | null;
  };
};
export async function getCollections(): Promise<Collection[]> {
  const query = `
    {
      collections(first: 4) {
        nodes {
          id
          title
          handle
          description
          image {
            url
          }
          seo {
            title
            description
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    collections: {
      nodes: Collection[];
      pageInfo: {
        hasNextPage: boolean;
        endCursor: string | null;
      };
    };
  }>({ query });

  console.log(data.collections.pageInfo);
  return data.collections.nodes.filter((item) => item.handle !== "best-seller");
}
