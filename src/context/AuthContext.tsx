import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { 
  Customer, 
  CustomerAccessToken,
  customerLogin as loginApi,
  customerRegister as registerApi,
  customerLogout as logoutApi,
  getCustomer
} from "../lib/authOperations";

interface AuthContextType {
  customer: Customer | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  accessToken: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_TOKEN_KEY = "shopify_customer_token";
const AUTH_EXPIRES_KEY = "shopify_customer_token_expires";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    async function checkSession() {
      setIsLoading(true);
      try {
        const savedToken = localStorage.getItem(AUTH_TOKEN_KEY);
        const expiresAt = localStorage.getItem(AUTH_EXPIRES_KEY);

        if (savedToken && expiresAt) {
          // Check if token is expired
          if (new Date(expiresAt) > new Date()) {
            const customerData = await getCustomer(savedToken);
            if (customerData) {
              setCustomer(customerData);
              setAccessToken(savedToken);
            } else {
              // Token is invalid, clear it
              localStorage.removeItem(AUTH_TOKEN_KEY);
              localStorage.removeItem(AUTH_EXPIRES_KEY);
            }
          } else {
            // Token is expired, clear it
            localStorage.removeItem(AUTH_TOKEN_KEY);
            localStorage.removeItem(AUTH_EXPIRES_KEY);
          }
        }
      } catch (error) {
        console.error("Session check failed:", error);
      } finally {
        setIsLoading(false);
      }
    }

    checkSession();
  }, []);

  const saveToken = (token: CustomerAccessToken) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token.accessToken);
    localStorage.setItem(AUTH_EXPIRES_KEY, token.expiresAt);
    setAccessToken(token.accessToken);
  };

  const clearToken = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_EXPIRES_KEY);
    setAccessToken(null);
  };

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await loginApi(email, password);
      
      if (result.success && result.token && result.customer) {
        saveToken(result.token);
        setCustomer(result.customer);
        return { success: true };
      }
      
      return { success: false, error: result.error };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (
    firstName: string, 
    lastName: string, 
    email: string, 
    password: string
  ) => {
    setIsLoading(true);
    try {
      const result = await registerApi(firstName, lastName, email, password);
      
      if (result.success && result.token && result.customer) {
        saveToken(result.token);
        setCustomer(result.customer);
        return { success: true };
      }
      
      return { success: false, error: result.error };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    if (accessToken) {
      await logoutApi(accessToken);
    }
    clearToken();
    setCustomer(null);
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        customer,
        isAuthenticated: !!customer,
        isLoading,
        login,
        register,
        logout,
        accessToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
