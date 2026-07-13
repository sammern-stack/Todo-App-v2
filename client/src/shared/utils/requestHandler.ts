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

export const requestHandler =
  <D, P = void>(request: BaseRequest<D, P>) =>
  async (params?: P): Promise<D> => {
    try {
      const res = await request(params);
      return res.data.data;
    } catch (error) {
      throw (error as AxiosError).response?.data;
    }
  };
