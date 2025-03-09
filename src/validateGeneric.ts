import { NextResponse } from 'next/server';
import {
  errorHandlerWithSchema,
  errorHandlerWithSchemaFormErrors,
} from './errorHandler';
import { ValidateWithSchema, type ValidateReturnType } from './types';

type ValidateGeneric<T> = { data: T } & ValidateWithSchema<T>;

/**
 * Validates `data` with `zod.safeParse`.
 *
 * @param {T} data The data to be validated
 * @param {z.ZodObject} schema The schema doing the validating
 * @param {Function} errorHandler A custom error function for custom error return results
 * @param {string} errorHandlerBuiltIn There are two built-in error handlers for validateGeneric and you can use this to switch between them. The options are `fieldErrors` and `formErrors`, with `fieldErrors` being the default
 */
export const validateGeneric = <T>({
  data,
  schema,
  errorHandler,
  errorHandlerBuiltIn = 'fieldErrors',
}: ValidateGeneric<T>): ValidateReturnType => {
  const validationResult = schema.safeParse(data as T);

  if (validationResult.error) {
    if (errorHandler) {
      return errorHandler(validationResult);
    }

    if (errorHandlerBuiltIn === 'formErrors') {
      return errorHandlerWithSchemaFormErrors(validationResult);
    }

    return errorHandlerWithSchema(validationResult);
  }

  return NextResponse.next();
};
