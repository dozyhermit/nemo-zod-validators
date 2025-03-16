import { MiddlewareFunctionProps } from '@rescale/nemo';
import type { ValidateWithSchema } from './types';
import { validateGeneric } from './validateGeneric';

type ValidateBody<T> = ValidateWithSchema<T>;

/**
 * Validates the `request.json()` function inside a `NextRequest` request using `zod.safeParse`.
 *
 * @param {T} schema The schema doing the validating
 * @param {Function} errorHandler A custom error function
 */
export const validateBody = <T>({ schema, errorHandler }: ValidateBody<T>) => {
  return async ({ request }: MiddlewareFunctionProps) =>
    validateGeneric({
      data: (await request.json()) as T,
      schema,
      errorHandler,
    });
};
