export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export type SortOrder = "asc" | "desc";

export interface ProductFilters {
  category: string;
  minPrice: number;
  maxPrice: number;
  search: string;
  sort: SortOrder;
}

export interface User {
  id: number;
  username: string;
  email: string;
  name: {
    firstname: string;
    lastname: string;
  };
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}