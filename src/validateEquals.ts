import { MiddlewareFunctionProps } from '@rescale/nemo';
import { NextResponse } from 'next/server';
import { errorHandlerWithTransform } from './errorHandler';
import type { ValidateWithTransform } from './types';

type ValidateEquals<T> = ValidateWithTransform<T>;

/**
 * Validates a specific variable against a value inside a Next.js NextRequest typed request.
 * This does not use a zod schema and safeParse and instead perform an exact equal (===)
 * against a value and a value inside of request.
 *
 * _Note: Your generic may need to be the same as the type returned from transform._
 *
 * @param {T} value The value being verified
 * @param {Function} transform The way you retrieve a value from a Next.js NextRequest typed request
 * @param {Function} errorHandler A custom error function for custom error return results
 *
 * @example
 * validateEquals<String | null>(env.process.MY_ENV_VAR, (request) => request.headers['MY_HEADER']));
 */
export const validateEquals = <T>({
  value,
  transform,
  errorHandler,
}: ValidateEquals<T>) => {
  return async ({ request }: MiddlewareFunctionProps) => {
    if (value !== transform(request)) {
      if (errorHandler) {
        return errorHandler();
      }

      return errorHandlerWithTransform();
    }

    return NextResponse.next();
  };
};
