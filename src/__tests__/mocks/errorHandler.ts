import type { SafeParseReturnType } from 'zod';

export const errorHandler = <T>({}: SafeParseReturnType<
  Record<string, any>,
  T
>) => Response.json({ message: 'Invalid validation!' });

export const errorHandlerEquals = () =>
  Response.json({ message: 'Invalid equals!' });
