import { NemoEvent } from '@rescale/nemo';
import { NextRequest } from 'next/server';
import type { ValidateSchema } from './types';
import { validateGeneric } from './validateGeneric';

type validateQuery = ValidateSchema;

/**
 * Validates `request.nextUrl.searchParams` (URLSearchParams) inside a `NextRequest` request using `zod.safeParse`.
 *
 * @param {T} schema The schema doing the validating
 * @param {Function} errorHandlerCustom A custom error function
 */
export const validateQuery = <T>({
  schema,
  errorHandlerCustom,
}: validateQuery) => {
  return async (request: NextRequest, _event: NemoEvent) =>
    validateGeneric<T>({
      data: Object.fromEntries(
        request?.nextUrl?.searchParams?.entries() || []
      ) as T,
      schema,
      errorHandlerCustom,
    });
};
