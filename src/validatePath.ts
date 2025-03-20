import { NextRequest } from 'next/server';
import type { ValidateWithSchema } from './types';
import { validateGeneric } from './validateGeneric';

type ValidatePath<T> = ValidateWithSchema<T>;

/**
 * Validates a `params` object provided by a route handler using `zod.safeParse`.
 *
 * @param {T} schema The schema doing the validating
 * @param {Function} errorHandler A custom error function
 */
export const validatePath = <T>({ schema, errorHandler }: ValidatePath<T>) => {
  return async (_request: NextRequest, { params }: { params: Promise<T> }) =>
    validateGeneric({
      data: (await params) as T,
      schema,
      errorHandler,
    });
};
