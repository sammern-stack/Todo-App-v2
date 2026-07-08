import type { AxiosError, AxiosResponse } from "axios";

type BaseRequest<D, P = void> = (
  params?: P,
) => Promise<AxiosResponse<SuccessResponse<D>>>;

type SuccessResponse<D> = {
  ok: true;
  message: string;
  data: D;
  meta: Record<string, unknown>;
};

type ErrorResponse<E = AxiosError> = {
  ok: false;
  error?: E;
};

type BaseResponse<D, E> = Promise<SuccessResponse<D> | ErrorResponse<E>>;

export const requestHandler =
  <D, P = void, E = AxiosError>(request: BaseRequest<D, P>) =>
  async (params?: P): BaseResponse<D, E> => {
    try {
      const res = await request(params);
      return res.data;
    } catch (error) {
      return { ok: false, error: error as E };
    }
  };
