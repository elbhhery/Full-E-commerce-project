import { shopifyFetch } from "./getProducts";

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
}

export interface CustomerAccessToken {
  accessToken: string;
  expiresAt: string;
}

export interface AuthResult {
  success: boolean;
  customer?: Customer;
  token?: CustomerAccessToken;
  error?: string;
}

// Login
export async function customerLogin(email: string, password: string): Promise<AuthResult> {
  const query = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<{
      customerAccessTokenCreate: {
        customerAccessToken: CustomerAccessToken | null;
        customerUserErrors: { code: string; field: string[]; message: string }[];
      };
    }>({
      query,
      variables: { input: { email, password } }
    });

    const { customerAccessToken, customerUserErrors } = data.customerAccessTokenCreate;

    if (customerUserErrors.length > 0) {
      return { success: false, error: customerUserErrors[0].message };
    }

    if (!customerAccessToken) {
      return { success: false, error: "Failed to create access token" };
    }

    // Fetch customer details
    const customer = await getCustomer(customerAccessToken.accessToken);
    
    return { 
      success: true, 
      token: customerAccessToken,
      customer: customer || undefined
    };
  } catch (error) {
    return { success: false, error: "Login failed. Please try again." };
  }
}

// Register
export async function customerRegister(
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<AuthResult> {
  const query = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          firstName
          lastName
          email
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<{
      customerCreate: {
        customer: Customer | null;
        customerUserErrors: { code: string; field: string[]; message: string }[];
      };
    }>({
      query,
      variables: { 
        input: { 
          firstName, 
          lastName, 
          email, 
          password,
          acceptsMarketing: false
        } 
      }
    });

    const { customer, customerUserErrors } = data.customerCreate;

    if (customerUserErrors.length > 0) {
      return { success: false, error: customerUserErrors[0].message };
    }

    if (!customer) {
      return { success: false, error: "Failed to create account" };
    }

    // Auto-login after registration
    const loginResult = await customerLogin(email, password);
    return loginResult;
  } catch (error) {
    return { success: false, error: "Registration failed. Please try again." };
  }
}

// Get customer details
export async function getCustomer(accessToken: string): Promise<Customer | null> {
  const query = `
    query getCustomer($accessToken: String!) {
      customer(customerAccessToken: $accessToken) {
        id
        firstName
        lastName
        email
        phone
      }
    }
  `;

  try {
    const data = await shopifyFetch<{ customer: Customer | null }>({
      query,
      variables: { accessToken }
    });

    return data.customer;
  } catch {
    return null;
  }
}

// Logout (delete access token)
export async function customerLogout(accessToken: string): Promise<boolean> {
  const query = `
    mutation customerAccessTokenDelete($accessToken: String!) {
      customerAccessTokenDelete(customerAccessToken: $accessToken) {
        deletedAccessToken
        userErrors {
          field
          message
        }
      }
    }
  `;

  try {
    await shopifyFetch({
      query,
      variables: { accessToken }
    });
    return true;
  } catch {
    return false;
  }
}

// Password recovery
export async function customerRecover(email: string): Promise<{ success: boolean; error?: string }> {
  const query = `
    mutation customerRecover($email: String!) {
      customerRecover(email: $email) {
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<{
      customerRecover: {
        customerUserErrors: { code: string; field: string[]; message: string }[];
      };
    }>({
      query,
      variables: { email }
    });

    const { customerUserErrors } = data.customerRecover;

    if (customerUserErrors.length > 0) {
      return { success: false, error: customerUserErrors[0].message };
    }

    return { success: true };
  } catch {
    return { success: false, error: "Recovery failed. Please try again." };
  }
}
