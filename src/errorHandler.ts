import { z } from 'zod';
import type { ZodError } from './types';

export const DEFAULT_ERROR_MESSAGE = 'Validation has failed';

// TECHNICAL DEBT: remove .flatten(), use z.flattenError instead
const getErrors = (
  error: ZodError['error'],
  key: keyof z.core.$ZodFlattenedError<string, unknown>
) => {
  if (typeof error?.flatten !== 'function') {
    return undefined;
  }

  if (Object.values(error?.flatten()?.[key] || {}).length <= 0) {
    return undefined;
  }

  return error.flatten()[key];
};

export const errorHandlerWithSchema = ({ error }: ZodError) =>
  Response.json(
    {
      message: getErrors(error, 'fieldErrors') || DEFAULT_ERROR_MESSAGE,
    },
    { status: 422 }
  );

export const errorHandlerWithSchemaFormErrors = ({ error }: ZodError) =>
  Response.json(
    {
      message: getErrors(error, 'formErrors') || DEFAULT_ERROR_MESSAGE,
    },
    { status: 422 }
  );

export const errorHandlerWithTransform = () =>
  Response.json(
    { message: 'Invalid request', success: false },
    {
      status: 400,
    }
  );
