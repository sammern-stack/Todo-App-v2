export type Meta = Record<string, unknown>;

export type ApiResponse<T> =
  | { ok: true; data: T; meta?: Meta; message?: string }
  | { ok: false; message: string };

export type RequestFn<T> = Promise<ApiResponse<T>>;
export type AxiosFn<T> = () => Promise<{ data: ApiResponse<T> }>;
