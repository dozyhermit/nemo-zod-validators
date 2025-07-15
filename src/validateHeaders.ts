import { NemoEvent } from '@rescale/nemo';
import { NextRequest } from 'next/server';
import type { ValidateWithSchema } from './types';
import { validateGeneric } from './validateGeneric';

type ValidateHeaders = ValidateWithSchema;

/**
 * Validates the `request.headers` tuple inside a `NextRequest` request using `zod.safeParse`.
 *
 * @param {T} schema The schema doing the validating
 * @param {Function} errorHandlerCustom A custom error function
 */
export const validateHeaders = <T>({
  schema,
  errorHandlerCustom,
}: ValidateHeaders) => {
  return async (request: NextRequest, _event: NemoEvent) =>
    validateGeneric<T>({
      data: Object.fromEntries(request?.headers || []) as T,
      schema,
      errorHandlerCustom,
    });
};
