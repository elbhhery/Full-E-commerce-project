import { shopifyFetch } from "./getProducts";

// Types
export interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      title: string;
      handle: string;
      featuredImage: {
        url: string;
      };
    };
    price: {
      amount: string;
      currencyCode: string;
    };
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  lines: {
    nodes: CartLine[];
  };
}

const CART_FRAGMENT = `
  fragment CartFragment on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      nodes {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            product {
              title
              handle
              featuredImage {
                url
              }
            }
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

// Create a new cart
export async function createCart(): Promise<Cart> {
  const query = `
    mutation cartCreate {
      cartCreate {
        cart {
          ...CartFragment
        }
        userErrors {
          field
          message
        }
      }
    }
    ${CART_FRAGMENT}
  `;

  const data = await shopifyFetch<{ cartCreate: { cart: Cart; userErrors: any[] } }>({ query });
  
  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(data.cartCreate.userErrors[0].message);
  }
  
  return data.cartCreate.cart;
}

// Get existing cart
export async function getCart(cartId: string): Promise<Cart | null> {
  const query = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        ...CartFragment
      }
    }
    ${CART_FRAGMENT}
  `;

  const data = await shopifyFetch<{ cart: Cart | null }>({ 
    query, 
    variables: { cartId } 
  });
  
  return data.cart;
}

// Add items to cart
export async function addToCart(
  cartId: string, 
  variantId: string, 
  quantity: number = 1
): Promise<Cart> {
  const query = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFragment
        }
        userErrors {
          field
          message
        }
      }
    }
    ${CART_FRAGMENT}
  `;

  const data = await shopifyFetch<{ cartLinesAdd: { cart: Cart; userErrors: any[] } }>({
    query,
    variables: {
      cartId,
      lines: [{ merchandiseId: variantId, quantity }]
    }
  });

  if (data.cartLinesAdd.userErrors.length > 0) {
    throw new Error(data.cartLinesAdd.userErrors[0].message);
  }

  return data.cartLinesAdd.cart;
}

// Update cart line quantity
export async function updateCartLine(
  cartId: string, 
  lineId: string, 
  quantity: number
): Promise<Cart> {
  const query = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFragment
        }
        userErrors {
          field
          message
        }
      }
    }
    ${CART_FRAGMENT}
  `;

  const data = await shopifyFetch<{ cartLinesUpdate: { cart: Cart; userErrors: any[] } }>({
    query,
    variables: {
      cartId,
      lines: [{ id: lineId, quantity }]
    }
  });

  if (data.cartLinesUpdate.userErrors.length > 0) {
    throw new Error(data.cartLinesUpdate.userErrors[0].message);
  }

  return data.cartLinesUpdate.cart;
}

// Remove items from cart
export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  const query = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ...CartFragment
        }
        userErrors {
          field
          message
        }
      }
    }
    ${CART_FRAGMENT}
  `;

  const data = await shopifyFetch<{ cartLinesRemove: { cart: Cart; userErrors: any[] } }>({
    query,
    variables: { cartId, lineIds }
  });

  if (data.cartLinesRemove.userErrors.length > 0) {
    throw new Error(data.cartLinesRemove.userErrors[0].message);
  }

  return data.cartLinesRemove.cart;
}
