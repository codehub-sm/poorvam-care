import { QueryClient, QueryFunction } from "@tanstack/react-query";

// Get the API base URL based on environment
const getApiBaseUrl = () => {
  if (import.meta.env.DEV) {
    return 'http://localhost:3001'; // Development
  }
  // Production - use Amplify API endpoint
  return import.meta.env.VITE_API_URL || 'https://gnuk7074fb.execute-api.ap-south-1.amazonaws.com/dev';
};

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // Get token from localStorage
  const token = localStorage.getItem('authToken');
  
  const headers: Record<string, string> = {};
  if (data) {
    headers["Content-Type"] = "application/json";
  }
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Construct full URL
  const fullUrl = url.startsWith('http') ? url : `${getApiBaseUrl()}${url}`;

  try {
    const res = await fetch(fullUrl, {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });

    // Handle unauthorized separately to allow for redirect to login
    if (res.status === 401) {
      console.error("Unauthorized: Token may be invalid or expired");
      // Clear token if it's invalid
      localStorage.removeItem('authToken');
      // We don't throw here to let the component handle the auth state
      return res;
    }

    await throwIfResNotOk(res);
    return res;
  } catch (error) {
    console.error(`API request failed: ${method} ${fullUrl}`, error);
    throw error;
  }
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const token = localStorage.getItem('authToken');
    const headers: Record<string, string> = {};
    
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    // Construct full URL
    const url = queryKey.join("/") as string;
    const fullUrl = url.startsWith('http') ? url : `${getApiBaseUrl()}/${url}`;

    const res = await fetch(fullUrl, {
      headers,
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: 60000, // 1 minute instead of infinity for better reactivity
      retry: 1,
    },
    mutations: {
      retry: 1,
    },
  },
});
