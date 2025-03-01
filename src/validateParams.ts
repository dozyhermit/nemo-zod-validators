import { MiddlewareFunctionProps } from '@rescale/nemo';
import type { ValidateWithSchema } from './types';
import { validateGeneric } from './validateGeneric';

type ValidateParams<T> = ValidateWithSchema<T>;

/**
 * Validates query params with a zod schema using safeParse.
 * This function will automatically use the request.params() function in a Next.js NextRequest typed request.
 *
 * @param {z.ZodObject} schema The schema doing the validating
 * @param {Function} errorHandler A custom error function for custom error return results
 */
export const validateParams = <T>({
  schema,
  errorHandler,
}: ValidateParams<T>) => {
  return async ({ params }: MiddlewareFunctionProps) =>
    validateGeneric({ data: params() as T, schema, errorHandler });
};
