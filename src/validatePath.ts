import { NemoEvent } from '@rescale/nemo';
import { NextRequest } from 'next/server';
import type { ValidateSchema } from './types';
import { validateGeneric } from './validateGeneric';

type ValidatePath = ValidateSchema;

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
