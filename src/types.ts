import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export type Schema = z.ZodObject<z.core.$ZodLooseShape, z.core.$strip>;
export type SchemaResult = z.ZodSafeParseResult<
  z.core.$InferObjectOutput<z.core.$ZodLooseShape, Record<string, unknown>>
>;

export type ErrorType = keyof z.core.$ZodFlattenedError<string, unknown>;
export type ValidateResponse = NextResponse | Response;

export type ValidateSchema = {
  schema: Schema;
  errorType?: ErrorType;
  errorHandlerCustom?: (result: SchemaResult) => ValidateResponse;
};

export type ValidateTransform<T> = {
  value: T;
  transform: (request: NextRequest) => T;
  errorHandlerCustom?: () => ValidateResponse;
};
