import { MiddlewareFunctionProps } from '@rescale/nemo';
import type { ValidateWithSchema } from './types';
import { validateGeneric } from './validateGeneric';

type ValidatePath<T> = ValidateWithSchema<T>;

/**
 * Validates the `request.params()` function inside a `NextRequest` request using `zod.safeParse`.
 *
 * @param {T} schema The schema doing the validating
 * @param {Function} errorHandler A custom error function
 */
export const validatePath = <T>({ schema, errorHandler }: ValidatePath<T>) => {
  return async ({ params }: MiddlewareFunctionProps) =>
    validateGeneric({ data: params() as T, schema, errorHandler });
};
