


import { useClerkAuthFetch } from "../lib/clerkAuthFetch";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;


export const getJobById = async (id: string, authFetch: ReturnType<typeof useClerkAuthFetch>) => {
  const res = await authFetch(`${BASE_URL}/api/jobs/${id}`);
  const data = await res.json();
  return data;
};

export const saveJobById = async (id: string, authFetch: ReturnType<typeof useClerkAuthFetch>) => {
  const res = await authFetch(`${BASE_URL}/api/users/save-job/${id}`, {
    method: "POST",
  });
  return res;
};


export const checkIfJobSaved = async (id: string, authFetch: ReturnType<typeof useClerkAuthFetch>) => {
    const res = await authFetch(`${BASE_URL}/api/users/saved-jobs/${id}`);
    const data = await res.json();
    return data.saved; 
  };
  