import { NextResponse } from 'next/server';
import { errorHandlerWithSchema } from './errorHandler';
import { ValidateWithSchema, type ValidateBaseReturnType } from './types';

type ValidateGeneric<T> = { data: T } & ValidateWithSchema<T>;

/**
 * Validates data with a zod schema using safeParse.
 *
 * @param {T} data The data to be validated
 * @param {z.ZodObject} schema The schema doing the validating
 * @param {Function} errorHandler A custom error function for custom error return results
 */
export const validateGeneric = <T>({
  data,
  schema,
  errorHandler,
}: ValidateGeneric<T>): ValidateBaseReturnType => {
  const validationResult = schema.safeParse(data as T);

  if (validationResult.error) {
    if (errorHandler) {
      return errorHandler(validationResult);
    }

    return errorHandlerWithSchema(validationResult);
  }

  return NextResponse.next();
};
