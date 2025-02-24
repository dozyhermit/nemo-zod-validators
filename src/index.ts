import { MiddlewareFunctionProps } from '@rescale/nemo';
import { NextResponse } from 'next/server';
import { SafeParseReturnType, z } from 'zod';

type ZodError = z.SafeParseError<Record<string, any>>;

const DEFAULT_ERROR_MESSAGE = 'Validation has failed';

const errorHandlerDefault = ({ error }: ZodError) =>
  Response.json(
    { message: error?.flatten()?.fieldErrors ?? DEFAULT_ERROR_MESSAGE },
    { status: 422 }
  );

type Schema<T> = z.ZodObject<
  z.ZodRawShape,
  z.UnknownKeysParam,
  z.ZodTypeAny,
  T
>;

export type ValidateBase<T> = {
  schema: Schema<T>;
  errorHandler?: (
    validationResult: SafeParseReturnType<Record<string, any>, T>
  ) => any;
};

type ValidateGeneric<T> = { data: T } & ValidateBase<T>;

export const validateGeneric = <T>({
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

  return NextResponse.next();
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
