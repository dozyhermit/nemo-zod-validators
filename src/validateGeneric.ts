import { NextResponse } from 'next/server';
import { errorHandlerSchema } from './errorHandler';
import { ValidateSchema, type ValidateResponse } from './types';

type ValidateGeneric<T> = { data: T } & ValidateSchema;

/**
 * Validates `data` with `zod.safeParse`.
 *
 * @param {T} data The data to be validated
 * @param {z.ZodObject} schema The schema doing the validating
 * @param {string} errorType There are two error handler types, `fieldErrors` and `formErrors`, with `fieldErrors` being the default
 * @param {Function} errorHandlerCustom A custom error handler; gives you the full error to handle however you wish
 *
 */
export const validateGeneric = <T>({
  data,
  schema,
  errorType = 'fieldErrors',
  errorHandlerCustom,
}: ValidateGeneric<T>): ValidateResponse => {
  const result = schema.safeParse(data as T);

  if (!result.error) {
    return NextResponse.next();
  }

  if (errorHandlerCustom) {
    return errorHandlerCustom(result);
  }

  if (errorType) {
    return errorHandlerSchema(result, errorType);
  }

  return errorHandlerSchema(result);
};
