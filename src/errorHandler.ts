import type { ZodError } from './types';

export const DEFAULT_ERROR_MESSAGE = 'Validation has failed';

export const errorHandlerWithSchema = ({ error }: ZodError) =>
  Response.json(
    {
      message:
        // this seems ridiculous and it is, sorry
        (error?.flatten &&
        error?.flatten()?.fieldErrors &&
        Object.values(error?.flatten()?.fieldErrors).length >= 1
          ? error?.flatten()?.fieldErrors
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
