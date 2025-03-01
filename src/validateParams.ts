import { MiddlewareFunctionProps } from '@rescale/nemo';
import type { ValidateWithSchema } from './types';
import { validateGeneric } from './validateGeneric';

type ValidateParams<T> = ValidateWithSchema<T>;

/**
 * Validates the `request.params()` function inside a `NextRequest` typed request using `zod.safeParse`.
 *
 * @param {T} schema The schema doing the validating
 * @param {Function} errorHandler A custom error function
 */
export const validateParams = <T>({
  schema,
  errorHandler,
}: ValidateParams<T>) => {
  return async ({ params }: MiddlewareFunctionProps) =>
    validateGeneric({ data: params() as T, schema, errorHandler });
};
