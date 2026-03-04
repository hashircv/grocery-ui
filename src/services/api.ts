const baseUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;

if (!baseUrl) {
  // eslint-disable-next-line no-console
  console.warn("VITE_API_BASE_URL is not set");
}

export const API_BASE_URL = baseUrl ?? "";

export async function fetchJson<T>(path: string): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return (await response.json()) as T;
}
