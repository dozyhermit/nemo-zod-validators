import { MiddlewareFunctionProps } from '@rescale/nemo';
import { z } from 'zod';

type Schema<T> = z.ZodObject<
  z.ZodRawShape,
  z.UnknownKeysParam,
  z.ZodTypeAny,
  T
>;

type ZodError = z.SafeParseError<Record<string, any>>;

const errorHandlerDefault = ({ error }: ZodError) =>
  Response.json({ message: error?.flatten()?.fieldErrors }, { status: 422 });

type ValidateBase<T> = {
  schema: Schema<T>;
  errorHandler?: (validationResult: ZodError) => any;
};

type ValidateGeneric<T> = { data: T } & ValidateBase<T>;

const validateGeneric = <T>({
  data,
  schema,
  errorHandler,
}: ValidateGeneric<T>) => {
  const validationResult = schema.safeParse(data as T);

  if (validationResult.error) {
    if (errorHandler) {
      return errorHandler(validationResult);
    }

    return errorHandlerDefault(validationResult);
  }
};

type ValidateParams<T> = ValidateBase<T>;

export const validateParams = <T>({
  schema,
  errorHandler,
}: ValidateParams<T>) => {
  return async ({ params }: MiddlewareFunctionProps) =>
    validateGeneric({ data: params() as T, schema, errorHandler });
};

type ValidateHeaders<T> = ValidateBase<T>;

export const validateHeaders = <T>({
  schema,
  errorHandler,
}: ValidateHeaders<T>) => {
  return async ({ request }: MiddlewareFunctionProps) =>
    validateGeneric({
      data: request.headers as T,
      schema,
      errorHandler,
    });
};

type ValidateBody<T> = ValidateBase<T>;

export const validateBody = <T>({ schema, errorHandler }: ValidateBody<T>) => {
  return async ({ request }: MiddlewareFunctionProps) =>
    validateGeneric({ data: request.body as T, schema, errorHandler });
};
