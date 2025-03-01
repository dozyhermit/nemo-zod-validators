import { MiddlewareFunctionProps } from '@rescale/nemo';
import type { ValidateWithSchema } from './types';
import { validateGeneric } from './validateGeneric';

type ValidateBody<T> = ValidateWithSchema<T>;

/**
 * Validates the body object with a zod schema using safeParse.
 * This function will automatically use the request.body object in a Next.js NextRequest typed request.
 *
 * @param {z.ZodObject} schema The schema doing the validating
 * @param {Function} errorHandler A custom error function for custom error return results
 */
export const validateBody = <T>({ schema, errorHandler }: ValidateBody<T>) => {
  return async ({ request }: MiddlewareFunctionProps) =>
    validateGeneric({ data: request.body as T, schema, errorHandler });
};
