import { NextResponse } from 'next/server';
import {
  errorHandlerWithSchema,
  errorHandlerWithSchemaFormErrors,
} from './errorHandler';
import { ValidateWithSchema, ZodError, type ValidateReturnType } from './types';

const errorHandlers: Record<string, ({ error }: ZodError) => Response> = {
  formErrors: errorHandlerWithSchemaFormErrors,
  default: errorHandlerWithSchema,
};

type ValidateGeneric<T> = { data: T } & ValidateWithSchema;

/**
 * Validates `data` with `zod.safeParse`.
 *
 * @param {T} data The data to be validated
 * @param {z.ZodObject} schema The schema doing the validating
 * @param {string} errorHandlerType There are two error handler types, `fieldErrors` and `formErrors`, with `fieldErrors` being the default
 * @param {Function} errorHandlerCustom A custom error handler; gives you the full error to handle however you wish
 *
 */
export const validateGeneric = <T>({
  data,
  schema,
  errorHandlerType = 'fieldErrors',
  errorHandlerCustom,
}: ValidateGeneric<T>): ValidateReturnType => {
  const validationResult = schema.safeParse(data as T);

  if (!validationResult.error) {
    return NextResponse.next();
  }

  if (errorHandlerCustom) {
    return errorHandlerCustom(validationResult);
  }

  if (errorHandlers?.[errorHandlerType]) {
    return errorHandlers[errorHandlerType](validationResult);
  }

  return errorHandlers.default(validationResult);
};
