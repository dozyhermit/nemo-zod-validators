import type { SafeParseReturnType } from 'zod';
import { SchemaType } from './schema';

export const errorHandler = ({}: SafeParseReturnType<
  Record<string, any>,
  SchemaType
>) => Response.json({ message: 'Invalid validation!' });

export const errorHandlerEquals = () =>
  Response.json({ message: 'Invalid equals!' });
