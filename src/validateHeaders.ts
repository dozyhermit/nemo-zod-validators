import { NextRequest } from 'next/server';
import type { ValidateWithSchema } from './types';
import { validateGeneric } from './validateGeneric';

type ValidateHeaders<T> = ValidateWithSchema<T>;

/**
 * Validates the `request.headers` tuple inside a `NextRequest` request using `zod.safeParse`.
 *
 * @param {T} schema The schema doing the validating
 * @param {Function} errorHandler A custom error function
 */
export const validateHeaders = <T>({
  schema,
  errorHandler,
}: ValidateHeaders<T>) => {
  return async (request: NextRequest) =>
    validateGeneric({
      data: Object.fromEntries(request?.headers || []) as T,
      schema,
      errorHandler,
    });
};
