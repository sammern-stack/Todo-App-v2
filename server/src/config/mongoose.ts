import type { QueryOptions } from "mongoose";

export const queryOptions: QueryOptions = {
  lean: true,
  returnDocument: "after",
  runValidators: true,
};
