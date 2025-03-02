import { MiddlewareFunctionProps } from '@rescale/nemo';
import type { ValidateWithSchema } from './types';
import { validateGeneric } from './validateGeneric';

type ValidateHeaders<T> = ValidateWithSchema<T>;

/**
 * Validates the `request.headers` object inside a `NextRequest` typed request using `zod.safeParse`.
 *
 * @param {T} schema The schema doing the validating
 * @param {Function} errorHandler A custom error function
 */
export const validateHeaders = <T>({
  schema,
  errorHandler,
}: ValidateHeaders<T>) => {
  return async ({ request }: MiddlewareFunctionProps) =>
    validateGeneric({
      data: Object.fromEntries(request?.headers || []) as T,
      schema,
      errorHandler,
    });
};
