const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:7001';

let inMemoryToken = '';

export function setAccessToken(token: string) {
  inMemoryToken = token;
}

export function getAccessToken() {
  return inMemoryToken;
}

export interface RequestOptions extends RequestInit {
  skipAuthRefresh?: boolean;
}

export async function apiFetch<T = unknown>(path: string, options: RequestOptions = {}): Promise<T> {
  const url = `${BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
  const headers = new Headers(options.headers || {});

  if (inMemoryToken && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${inMemoryToken}`);
  }

  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000);

  const mergedOptions: RequestInit = {
    ...options,
    headers,
    signal: options.signal || controller.signal,
    credentials: 'include', // Send cookies
  };

  let response: Response;
  try {
    response = await fetch(url, mergedOptions);
  } finally {
    clearTimeout(timeoutId);
  }

  // If unauthorized and we haven't already skipped refresh, attempt token rotation
  if (response.status === 401 && !options.skipAuthRefresh) {
    try {
      const refreshResponse = await fetch(`${BASE_URL}/api/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        setAccessToken(data.accessToken);

        // Re-attempt original request with the new access token
        headers.set('Authorization', `Bearer ${data.accessToken}`);
        response = await fetch(url, { ...mergedOptions, headers });
      } else {
        setAccessToken('');
      }
    } catch (err) {
      console.error('Failed silent refresh:', err);
      setAccessToken('');
    }
  }

  if (!response.ok) {
    let errorMessage = 'An error occurred.';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
      if (Array.isArray(errorMessage)) {
        errorMessage = errorMessage.join(', ');
      }
    } catch {
      // Fallback
    }
    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return null as T;
  }

  try {
    return await response.json();
  } catch {
    return null as T;
  }
}
