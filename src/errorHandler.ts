import type { ZodError } from './types';

export const DEFAULT_ERROR_MESSAGE = 'Validation has failed';

export const errorHandlerWithSchema = ({ error }: ZodError) =>
  Response.json(
    {
      message:
        (error?.flatten &&
        Object.values(error?.flatten()?.fieldErrors || {}).length >= 1
          ? error?.flatten()?.fieldErrors
          : DEFAULT_ERROR_MESSAGE) || DEFAULT_ERROR_MESSAGE,
    },
    { status: 422 }
  );

export const errorHandlerWithSchemaFormErrors = ({ error }: ZodError) =>
  Response.json(
    {
      message:
        (error?.flatten && (error?.flatten()?.formErrors || []).length >= 1
          ? error?.flatten()?.formErrors
          : DEFAULT_ERROR_MESSAGE) || DEFAULT_ERROR_MESSAGE,
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
