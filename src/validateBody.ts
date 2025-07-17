import { NemoEvent } from '@rescale/nemo';
import type { NextRequest } from 'next/server';
import type { ValidateSchema } from './types';
import { validateGeneric } from './validateGeneric';

type ValidateBody = ValidateSchema;

/**
 * Validates the `request.json()` function inside a `NextRequest` request using `zod.safeParse`.
 *
 * @param {T} schema The schema doing the validating
 * @param {Function} errorHandlerCustom A custom error function
 */
export const validateBody = <T>({
  schema,
  errorHandlerCustom,
}: ValidateBody) => {
  return async (request: NextRequest, _event: NemoEvent) =>
    validateGeneric<T>({
      data: (await request.json()) as T,
      schema,
      errorHandlerCustom,
    });
};
