import { NemoEvent } from '@rescale/nemo';
import { parse } from 'cookie';
import { NextRequest } from 'next/server';
import { ValidateWithSchema } from './types';
import { validateGeneric } from './validateGeneric';

type ValidateCookies = ValidateWithSchema;

/**
 * Validates the `request.cookies` object inside a `NextRequest` request using `zod.safeParse`.
 *
 * @param {T} schema The schema doing the validating
 * @param {Function} errorHandlerCustom A custom error function
 */
export const validateCookies = <T>({
  schema,
  errorHandlerCustom,
}: ValidateCookies) => {
  return async (request: NextRequest, _event: NemoEvent) =>
    validateGeneric<T>({
      data: parse(request?.cookies?.toString() || '') as T,
      schema,
      errorHandlerCustom,
    });
};
