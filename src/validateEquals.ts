import { NemoEvent } from '@rescale/nemo';
import { NextRequest, NextResponse } from 'next/server';
import { errorHandlerTransform } from './errorHandler';
import type { ValidateTransform } from './types';

type ValidateEquals<T> = ValidateTransform<T>;

/**
 * Validates a local variable against a variable inside a `NextRequest` request using the `===` operator.
 *
 * @param {T} value The value being verified
 * @param {Function} transform Retrieve a value out of a request for verification
 * @param {Function} errorHandlerCustom A custom error function
 *
 * @example
 * validateEquals<String | null>(env.process.MY_ENV_VAR, (request) => request.headers.get('MY_HEADER')));
 */
export const validateEquals = <T>({
  value,
  // technical debt: in my opinion, "transform" doesn't make much sense. rename it?
  transform,
  errorHandlerCustom,
}: ValidateEquals<T>) => {
  return async (request: NextRequest, _event: NemoEvent) => {
    if (value === transform(request)) {
      return NextResponse.next();
    }

    if (errorHandlerCustom) {
      return errorHandlerCustom();
    }

    return errorHandlerTransform();
  };
};
