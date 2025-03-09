import { MiddlewareFunctionProps } from '@rescale/nemo';
import type { ValidateWithSchema } from './types';
import { validateGeneric } from './validateGeneric';

type validateQuery<T> = ValidateWithSchema<T>;

/**
 * Validates `request.nextUrl.searchParams` (URLSearchParams) inside a `NextRequest` request using `zod.safeParse`.
 *
 * @param {T} schema The schema doing the validating
 * @param {Function} errorHandler A custom error function
 */
export const validateQuery = <T>({
  schema,
  errorHandler,
}: validateQuery<T>) => {
  return async ({ request }: MiddlewareFunctionProps) =>
    validateGeneric({
      data: Object.fromEntries(
        request?.nextUrl?.searchParams?.entries() || []
      ) as T,
      schema,
      errorHandler,
    });
};
