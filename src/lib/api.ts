const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestOptions = {
  method?: ApiMethod;
  headers?: HeadersInit;
  body?: unknown;
  signal?: AbortSignal;
};

async function request<TResponse>(
  path: string,
  { method = "GET", headers, body, signal }: RequestOptions = {},
): Promise<TResponse> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as TResponse;
  }

  return (await response.json()) as TResponse;
}

export const api = {
  get: <TResponse>(
    path: string,
    options?: Omit<RequestOptions, "method" | "body">,
  ) => request<TResponse>(path, { ...options, method: "GET" }),
  post: <TResponse>(
    path: string,
    body?: unknown,
    options?: Omit<RequestOptions, "method" | "body">,
  ) => request<TResponse>(path, { ...options, method: "POST", body }),
  put: <TResponse>(
    path: string,
    body?: unknown,
    options?: Omit<RequestOptions, "method" | "body">,
  ) => request<TResponse>(path, { ...options, method: "PUT", body }),
  patch: <TResponse>(
    path: string,
    body?: unknown,
    options?: Omit<RequestOptions, "method" | "body">,
  ) => request<TResponse>(path, { ...options, method: "PATCH", body }),
  delete: <TResponse>(
    path: string,
    options?: Omit<RequestOptions, "method" | "body">,
  ) => request<TResponse>(path, { ...options, method: "DELETE" }),
};
