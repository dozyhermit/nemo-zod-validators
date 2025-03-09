import { MiddlewareFunctionProps } from '@rescale/nemo';
import { NextResponse } from 'next/server';
import { SafeParseReturnType, z } from 'zod';

export type ZodError = z.SafeParseError<Record<string, z.ZodTypeAny>>;

export type Schema<T> =
  | z.ZodObject<z.ZodRawShape, z.UnknownKeysParam, z.ZodTypeAny, T>
  | z.ZodEffects<z.ZodTypeAny, T>;

export type ValidateReturnType = NextResponse | Response;

export type ValidateWithSchema<T> = {
  schema: Schema<T>;
  errorHandler?: (
    validationResult: SafeParseReturnType<Record<string, z.ZodTypeAny>, T>
  ) => ValidateReturnType;
  errorHandlerBuiltIn?: 'fieldErrors' | 'formErrors';
};

export type ValidateWithTransform<T> = {
  value: T;
  transform: (request: MiddlewareFunctionProps['request']) => T;
  errorHandler?: () => ValidateReturnType;
};
