import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export type Schema = z.ZodObject<z.core.$ZodLooseShape, z.core.$strip>;

export type ZodError = z.ZodSafeParseResult<
  z.core.$InferObjectOutput<z.core.$ZodLooseShape, Record<string, unknown>>
>;

export type ValidateReturnType = NextResponse | Response;

export type ValidateWithSchema = {
  schema: Schema;
  errorHandlerCustom?: (
    validationResult: z.ZodSafeParseResult<
      z.core.$InferObjectOutput<z.core.$ZodLooseShape, Record<string, unknown>>
    >
  ) => ValidateReturnType;
  errorHandlerType?: 'fieldErrors' | 'formErrors';
};

export type ValidateWithTransform<T> = {
  value: T;
  transform: (request: NextRequest) => T;
  errorHandlerCustom?: () => ValidateReturnType;
};
