import { useAuth } from "@clerk/clerk-react";

export const useClerkAuthFetch = () => {
  const { getToken } = useAuth();

  const authFetch = async (url: string, options: RequestInit = {}) => {
    const token = await getToken();
    return fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  };

  return authFetch;
};
