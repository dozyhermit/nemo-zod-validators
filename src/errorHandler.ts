import type { ErrorType, SchemaResult } from './types';

export const DEFAULT_ERROR_MESSAGE = 'Validation has failed';

// technical debt: remove .flatten(), use z.flattenError instead
const getSchemaErrors = (
  error: SchemaResult['error'],
  errorType: ErrorType
) => {
  if (typeof error?.flatten !== 'function') {
    return DEFAULT_ERROR_MESSAGE;
  }

  if (Object.values(error?.flatten()?.[errorType] || {}).length <= 0) {
    return DEFAULT_ERROR_MESSAGE;
  }

  return error.flatten()[errorType];
};

export const errorHandlerSchema = (
  { error }: SchemaResult,
  errorType?: ErrorType
) =>
  Response.json(
    {
      message: getSchemaErrors(error, errorType ?? 'fieldErrors'),
    },
    { status: 422 }
  );

export const errorHandlerTransform = () =>
  Response.json(
    { message: 'Invalid request', success: false },
    {
      status: 422,
    }
  );
