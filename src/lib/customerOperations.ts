import { shopifyFetch } from "./getProducts";

export interface Order {
  id: string;
  orderNumber: number;
  processedAt: string;
  fulfillmentStatus: string;
  financialStatus: string;
  totalPrice: {
    amount: string;
    currencyCode: string;
  };
  lineItems: {
    nodes: {
      title: string;
      quantity: number;
      variant: {
        image: {
          url: string;
        } | null;
        price: {
          amount: string;
          currencyCode: string;
        };
      } | null;
    }[];
  };
}

export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string | null;
  city: string;
  province: string;
  country: string;
  zip: string;
  phone: string | null;
}

export interface CustomerDetails {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  orders: {
    nodes: Order[];
  };
  addresses: {
    nodes: Address[];
  };
  defaultAddress: Address | null;
}

// Get customer with orders and addresses
export async function getCustomerDetails(accessToken: string): Promise<CustomerDetails | null> {
  const query = `
    query getCustomerDetails($accessToken: String!) {
      customer(customerAccessToken: $accessToken) {
        id
        firstName
        lastName
        email
        phone
        orders(first: 10, sortKey: PROCESSED_AT, reverse: true) {
          nodes {
            id
            orderNumber
            processedAt
            fulfillmentStatus
            financialStatus
            totalPrice {
              amount
              currencyCode
            }
            lineItems(first: 5) {
              nodes {
                title
                quantity
                variant {
                  image {
                    url
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
        addresses(first: 10) {
          nodes {
            id
            firstName
            lastName
            address1
            address2
            city
            province
            country
            zip
            phone
          }
        }
        defaultAddress {
          id
          firstName
          lastName
          address1
          address2
          city
          province
          country
          zip
          phone
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<{ customer: CustomerDetails | null }>({
      query,
      variables: { accessToken }
    });
    return data.customer;
  } catch {
    return null;
  }
}

// Update customer info
export async function updateCustomer(
  accessToken: string,
  firstName: string,
  lastName: string,
  email: string,
  phone?: string
): Promise<{ success: boolean; error?: string }> {
  const query = `
    mutation customerUpdate($accessToken: String!, $customer: CustomerUpdateInput!) {
      customerUpdate(customerAccessToken: $accessToken, customer: $customer) {
        customer {
          id
        }
        customerUserErrors {
          message
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<{
      customerUpdate: {
        customer: { id: string } | null;
        customerUserErrors: { message: string }[];
      };
    }>({
      query,
      variables: {
        accessToken,
        customer: { firstName, lastName, email, phone: phone || null }
      }
    });

    if (data.customerUpdate.customerUserErrors.length > 0) {
      return { success: false, error: data.customerUpdate.customerUserErrors[0].message };
    }

    return { success: true };
  } catch {
    return { success: false, error: "Update failed" };
  }
}

// Create address
export async function createAddress(
  accessToken: string,
  address: Omit<Address, "id">
): Promise<{ success: boolean; address?: Address; error?: string }> {
  const query = `
    mutation customerAddressCreate($accessToken: String!, $address: MailingAddressInput!) {
      customerAddressCreate(customerAccessToken: $accessToken, address: $address) {
        customerAddress {
          id
          firstName
          lastName
          address1
          address2
          city
          province
          country
          zip
          phone
        }
        customerUserErrors {
          message
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<{
      customerAddressCreate: {
        customerAddress: Address | null;
        customerUserErrors: { message: string }[];
      };
    }>({
      query,
      variables: { accessToken, address }
    });

    if (data.customerAddressCreate.customerUserErrors.length > 0) {
      return { success: false, error: data.customerAddressCreate.customerUserErrors[0].message };
    }

    return { success: true, address: data.customerAddressCreate.customerAddress || undefined };
  } catch {
    return { success: false, error: "Failed to create address" };
  }
}

// Update address
export async function updateAddress(
  accessToken: string,
  addressId: string,
  address: Omit<Address, "id">
): Promise<{ success: boolean; error?: string }> {
  const query = `
    mutation customerAddressUpdate($accessToken: String!, $id: ID!, $address: MailingAddressInput!) {
      customerAddressUpdate(customerAccessToken: $accessToken, id: $id, address: $address) {
        customerAddress {
          id
        }
        customerUserErrors {
          message
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<{
      customerAddressUpdate: {
        customerAddress: { id: string } | null;
        customerUserErrors: { message: string }[];
      };
    }>({
      query,
      variables: { accessToken, id: addressId, address }
    });

    if (data.customerAddressUpdate.customerUserErrors.length > 0) {
      return { success: false, error: data.customerAddressUpdate.customerUserErrors[0].message };
    }

    return { success: true };
  } catch {
    return { success: false, error: "Failed to update address" };
  }
}

// Delete address
export async function deleteAddress(
  accessToken: string,
  addressId: string
): Promise<{ success: boolean; error?: string }> {
  const query = `
    mutation customerAddressDelete($accessToken: String!, $id: ID!) {
      customerAddressDelete(customerAccessToken: $accessToken, id: $id) {
        deletedCustomerAddressId
        customerUserErrors {
          message
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<{
      customerAddressDelete: {
        deletedCustomerAddressId: string | null;
        customerUserErrors: { message: string }[];
      };
    }>({
      query,
      variables: { accessToken, id: addressId }
    });

    if (data.customerAddressDelete.customerUserErrors.length > 0) {
      return { success: false, error: data.customerAddressDelete.customerUserErrors[0].message };
    }

    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete address" };
  }
}
