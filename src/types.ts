import { MiddlewareFunctionProps } from '@rescale/nemo';
import { NextResponse } from 'next/server';
import { SafeParseReturnType, z } from 'zod';

export type ZodError = z.SafeParseError<Record<string, any>>;

export type Schema<T> = z.ZodObject<
  z.ZodRawShape,
  z.UnknownKeysParam,
  z.ZodTypeAny,
  T
>;

export type ValidateBaseReturnType = NextResponse | Response;

export type ValidateWithSchema<T> = {
  schema: Schema<T>;
  errorHandler?: (
    validationResult: SafeParseReturnType<Record<string, any>, T>
  ) => ValidateBaseReturnType;
};

export type ValidateWithTransform<T> = {
  value: T;
  transform: (request: MiddlewareFunctionProps['request']) => T;
  errorHandler?: () => ValidateBaseReturnType;
};
