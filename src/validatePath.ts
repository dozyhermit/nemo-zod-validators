import { NemoEvent } from '@rescale/nemo';
import { NextRequest } from 'next/server';
import type { ValidateWithSchema } from './types';
import { validateGeneric } from './validateGeneric';

type ValidatePath = ValidateWithSchema;

/**
 * Validates the `params` object provided by `NemoEvent` using `zod.safeParse`.
 *
 * @param {T} schema The schema doing the validating
 * @param {Function} errorHandlerCustom A custom error function
 */
export const validatePath = <T>({
  schema,
  errorHandlerCustom,
}: ValidatePath) => {
  return async (_request: NextRequest, event: NemoEvent) =>
    validateGeneric<T>({
      data: event.params as T,
      schema,
      errorHandlerCustom,
    });
};
