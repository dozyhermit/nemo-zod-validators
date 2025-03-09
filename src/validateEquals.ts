import { MiddlewareFunctionProps } from '@rescale/nemo';
import { NextResponse } from 'next/server';
import { errorHandlerWithTransform } from './errorHandler';
import type { ValidateWithTransform } from './types';

type ValidateEquals<T> = ValidateWithTransform<T>;

/**
 * Validates a local variable against a variable inside a `NextRequest` request using the `===` operator.
 *
 * @param {T} value The value being verified
 * @param {Function} transform How to retrieve a value out of a request
 * @param {Function} errorHandler A custom error function
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
