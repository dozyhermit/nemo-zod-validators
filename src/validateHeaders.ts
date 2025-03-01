import { MiddlewareFunctionProps } from '@rescale/nemo';
import type { ValidateWithSchema } from './types';
import { validateGeneric } from './validateGeneric';

type ValidateHeaders<T> = ValidateWithSchema<T>;

/**
 * Validates the header object with a zod schema using safeParse.
 * This function will automatically use the request.headers object in a Next.js NextRequest typed request.
 *
 * @param {z.ZodObject} schema The schema doing the validating
 * @param {Function} errorHandler A custom error function for custom error return results
 */
export const validateHeaders = <T>({
  schema,
  errorHandler,
}: ValidateHeaders<T>) => {
  return async ({ request }: MiddlewareFunctionProps) =>
    validateGeneric({
      data: request.headers as T,
      schema,
      errorHandler,
    });
};
