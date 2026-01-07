import type { ZodSafeParseResult } from 'zod';

export const errorHandlerCustom = <T>({}: ZodSafeParseResult<T>) =>
  Response.json({ message: 'Invalid validation!' });

export const errorHandlerEquals = () =>
  Response.json({ message: 'Invalid equals!' });
