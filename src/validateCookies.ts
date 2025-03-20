import { parse } from 'cookie';
import { NextRequest } from 'next/server';
import { ValidateWithSchema } from './types';
import { validateGeneric } from './validateGeneric';

type ValidateCookies<T> = ValidateWithSchema<T>;

/**
 * Validates the `request.cookies` object inside a `NextRequest` request using `zod.safeParse`.
 *
 * @param {T} schema The schema doing the validating
 * @param {Function} errorHandler A custom error function
 */
export const validateCookies = <T>({
  schema,
  errorHandler,
}: ValidateCookies<T>) => {
  return async (request: NextRequest) =>
    validateGeneric({
      data: parse(request?.cookies?.toString() || '') as T,
      schema,
      errorHandler,
    });
};
