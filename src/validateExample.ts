import { NemoEvent } from '@rescale/nemo';
import type { NextRequest } from 'next/server';
import type { ValidateSchema } from './types';
import { validateGeneric } from './validateGeneric';

type ValidateExample = ValidateSchema;

/**
 * Example
 */
export const validateExample =
  <T>({ schema, errorHandlerCustom }: ValidateExample) =>
  async (request: NextRequest, _event: NemoEvent) =>
    validateGeneric<T>({
      data: (await request.json()) as T,
      schema,
      errorHandlerCustom,
    });
