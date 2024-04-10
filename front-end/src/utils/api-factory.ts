const baseUrl = "http://localhost:3000";

interface ExtendedRequestInit extends RequestInit {
  body?: any;
}

type Params = Record<string, string | number>;
type QueryParams = Record<string, string | number>;

interface ApiFactoryArgs {
  body?: any;
  params?: Params;
  query?: QueryParams;
}

export const sensorsApiFactory = (url: string, options?: RequestInit) => {
  return async ({ body, params, query }: ApiFactoryArgs) => {
    const op: ExtendedRequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
      ...options,
    };

    if (body) op.body = JSON.stringify(body);

    let resolvedUrl = url;

    if (params) {
      resolvedUrl = url.replace(/:([^/]+)/g, (_, key) => String(params[key] || `:${key}`));
    }

    const queryString = query
      ? `?${new URLSearchParams(query as Record<string, string>).toString()}`
      : "";

    const response = await fetch(`${baseUrl}${resolvedUrl}${queryString}`, op);

    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  };
};
