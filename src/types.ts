import { MiddlewareFunctionProps } from '@rescale/nemo';
import { NextResponse } from 'next/server';
import { SafeParseReturnType, z } from 'zod';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ZodError = z.SafeParseError<Record<string, any>>;

export type Schema<T> = z.ZodObject<
  z.ZodRawShape,
  z.UnknownKeysParam,
  z.ZodTypeAny,
  T
>;

export type ValidateReturnType = NextResponse | Response;

export type ValidateWithSchema<T> = {
  schema: Schema<T>;
  errorHandler?: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validationResult: SafeParseReturnType<Record<string, any>, T>
  ) => ValidateReturnType;
};

export type ValidateWithTransform<T> = {
  value: T;
  transform: (request: MiddlewareFunctionProps['request']) => T;
  errorHandler?: () => ValidateReturnType;
};
