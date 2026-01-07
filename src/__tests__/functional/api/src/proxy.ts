import {
  validateBody,
  validateCookies,
  validateEquals,
  validateHeaders,
  validatePath,
  validateQuery,
} from '@dozyhermit/nemo-zod-validators';
import { createNEMO, MiddlewareConfig } from '@rescale/nemo';
import { z } from 'zod';

const VALIDATION_KEY = 'hello';
const VALIDATION_VALUE = 'world';

const schema = z.object({
  [VALIDATION_KEY]: z.string().regex(/^[a-zA-Z]+$/),
});

type SchemaType = z.infer<typeof schema>;

const middlewares: MiddlewareConfig = {
  [`/api/path/:${VALIDATION_KEY}`]: [
    validatePath<SchemaType>({
      schema,
    }),
  ],

  '/api/query': [
    validateQuery<SchemaType>({
      schema,
    }),
  ],

  '/api/body': [
    validateBody<SchemaType>({
      schema,
    }),
  ],

  '/api/headers': [
    validateHeaders<SchemaType>({
      schema,
    }),
  ],

  '/api/cookies': [
    validateCookies<SchemaType>({
      schema,
    }),
  ],

  // using headers here is cheap but is a good example
  '/api/equals': [
    validateEquals<String>({
      value: VALIDATION_VALUE,
      transform: (request) =>
        request?.headers?.get(VALIDATION_KEY)?.toString() || '',
    }),
  ],
};

export const proxy = createNEMO(middlewares);
export const config = {};
