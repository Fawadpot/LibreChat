import { useState, useEffect } from 'react';
import { useAuthContext } from '~/hooks';

type UseFetchResult<T> = [T | null, boolean, Error | null];

export const usePromptsApi = <T,>(
  url: string,
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH',
  body?: object,
): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { token } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify(body),
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, method, body, token]);

  return [data, isLoading, error];
};
