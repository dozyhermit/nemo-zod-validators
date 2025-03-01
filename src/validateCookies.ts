import { MiddlewareFunctionProps } from '@rescale/nemo';
import { ValidateWithSchema } from './types';
import { validateGeneric } from './validateGeneric';

type ValidateCookies<T> = ValidateWithSchema<T>;

/**
 * Validates the `request.cookies` object inside a `NextRequest` typed request using `zod.safeParse`.
 *
 * @param {T} schema The schema doing the validating
 * @param {Function} errorHandler A custom error function
 */
export const validateCookies = <T>({
  schema,
  errorHandler,
}: ValidateCookies<T>) => {
  return async ({ request }: MiddlewareFunctionProps) =>
    validateGeneric({
      data: request.cookies as T,
      schema,
      errorHandler,
    });
};
