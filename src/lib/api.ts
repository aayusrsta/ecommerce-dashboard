const BASE_URL = "https://fakestoreapi.com";

async function interceptor<T>(endpoint: string): Promise<{ data: T | null; error: string | null }> {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return { data: null, error: `Request failed with status ${res.status}` };
    }

    const data: T = await res.json();
    return { data, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    return { data: null, error: message };
  }
}

export async function getProducts(sort?: string) {
  const query = sort ? `?sort=${sort}` : "";
  return interceptor<import("@/types").Product[]>(`/products${query}`);
}

export async function getProduct(id: number) {
  return interceptor<import("@/types").Product>(`/products/${id}`);
}

export async function getCategories() {
  return interceptor<string[]>(`/products/categories`);
}

export async function getProductsByCategory(category: string) {
  return interceptor<import("@/types").Product[]>(`/products/category/${category}`);
}

export async function loginUser(username: string, password: string) {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      return { data: null, error: "Invalid credentials" };
    }

    const data = await res.json();
    return { data, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Login failed";
    return { data: null, error: message };
  }
}