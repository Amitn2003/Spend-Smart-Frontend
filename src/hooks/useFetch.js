// src/hooks/useFetch.js
export const useFetch = async (url, options = {}) => {
  try {
    const res = await fetch(url, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Something went wrong');
    return data;

  } catch (error) {
    throw error;
  }
};
