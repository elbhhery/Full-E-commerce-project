import { shopifyFetch } from "./getProducts";

export interface SearchProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  featuredImage: {
    url: string;
  } | null;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  variants: {
    nodes: {
      id: string;
    }[];
  };
}

export interface SearchResult {
  products: SearchProduct[];
  totalCount: number;
}

export async function searchProducts(
  query: string,
  first: number = 20,
  sortKey: string = "RELEVANCE",
  reverse: boolean = false
): Promise<SearchResult> {
  const gqlQuery = `
    query searchProducts($query: String!, $first: Int!, $sortKey: ProductSortKeys!, $reverse: Boolean!) {
      products(first: $first, query: $query, sortKey: $sortKey, reverse: $reverse) {
        nodes {
          id
          title
          handle
          description
          featuredImage {
            url
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 1) {
            nodes {
              id
            }
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  `;

  const data = await shopifyFetch<{ 
    products: { 
      nodes: SearchProduct[]; 
      pageInfo: { hasNextPage: boolean } 
    } 
  }>({
    query: gqlQuery,
    variables: { query, first, sortKey, reverse }
  });

  return {
    products: data.products.nodes,
    totalCount: data.products.nodes.length
  };
}

export async function getSearchSuggestions(query: string): Promise<string[]> {
  if (!query || query.length < 2) return [];

  const gqlQuery = `
    query searchSuggestions($query: String!) {
      products(first: 5, query: $query) {
        nodes {
          title
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<{ products: { nodes: { title: string }[] } }>({
      query: gqlQuery,
      variables: { query }
    });

    return data.products.nodes.map(p => p.title);
  } catch {
    return [];
  }
}
