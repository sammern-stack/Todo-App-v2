import { isMongooseId } from "./validators.js";
import type { Model, QueryFilter } from "mongoose";

export const searchDocument = async <T>(
  documentIdOrQuery: string | QueryFilter<T>,
  model: Model<T>,
) => {
  const isId =
    typeof documentIdOrQuery === "string" && isMongooseId(documentIdOrQuery);

  if (!isId && typeof documentIdOrQuery !== "object")
    throw new Error("Invalid search parameter");

  const document = isId
    ? await model.findById(documentIdOrQuery)
    : await model.findOne(documentIdOrQuery as QueryFilter<T>);

  return !document ? null : document;
};
