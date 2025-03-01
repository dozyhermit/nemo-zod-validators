# nemo-zod-validators

`@rescale/nemo` and `zod` saved my life when working with Next.js, but writing the same validation functions over and over was driving me crazy.

So, this just makes adding validation even easier.

# Installation

`npm i @dozyhermit/nemo-zod-validators`

# Usage

In your `middleware.ts` Next.js project file:

```
import { z } from 'zod';
import { createMiddleware } from '@rescale/nemo';
import { validateParams } from '@dozyhermit/nemo-zod-validators';

const schema = z.object({
  world: z
    .string({
      invalid_type_error: 'Invalid world',
    })
});

type SchemaType = z.infer<typeof Schema>;

const middlewares = {
  '/api/hello/:world': [
    validateParams<SchemaType>({ schema }),
  ],
};

export const middleware = createMiddleware(middlewares);
```

# Functions

## validateGeneric

Validates data with a zod schema using `safeParse`. This is the base for all the schema-based validators in this package.

The return type is either `Response` or `NextResponse.next()`.

### Example

```
const schema = z.object({
  world: z
    .string({
      invalid_type_error: 'Invalid world',
    })
});

type SchemaType = z.infer<typeof Schema>;

validateGeneric<SchemaType>({ data: { world: 'Hello' }, schema });
```

### Creating Your Own Validator

This couldn't be simpler, but the only thing you have to remember is how to prevent `validateGeneric` from executing immediately.

As an example, let's create a `validateCookies` validator:

```
type ValidateCookies<T> = ValidateWithSchema<T>;

export const validateCookies = <T>({
  schema,
  errorHandler,
}: ValidateCookies<T>) => {
  return async ({ request }: MiddlewareFunctionProps) =>
    validateGeneric({
      data: request.cookies as T,
      schema,
      errorHandler,
    });
};
```

We return an asynchronous function because when we use it like below:

```
const middlewares = {
  '/api/hello/:world': [
    validateCookies<SchemaType>({ schema }),
  ],
};
```

It means `validateGeneric` is not immediately executed when the api starts. It only ever runs when we make a request to `/api/hello/:world`.

## validateBody

Validates the `request.body` object inside a `NextRequest` typed request using `zod.safeParse`.

The return type is either `Response` or `NextResponse.next()`.

### Example

```
const schema = z.object({
  world: z
    .string({
      invalid_type_error: 'Invalid world',
    })
});

type SchemaType = z.infer<typeof Schema>;

validateBody<SchemaType>({ schema });
```

## validateHeaders

Validates the `request.headers` object inside a `NextRequest` typed request using `zod.safeParse`.

The return type is either `Response` or `NextResponse.next()`.

### Example

```
const schema = z.object({
  world: z
    .string({
      invalid_type_error: 'Invalid world',
    })
});

type SchemaType = z.infer<typeof Schema>;

validateHeaders<SchemaType>({ schema });
```

## validateParams

Validates the `request.params()` function inside a `NextRequest` typed request using `zod.safeParse`.

The return type is either `Response` or `NextResponse.next()`.

### Example

```
const schema = z.object({
  world: z
    .string({
      invalid_type_error: 'Invalid world',
    })
});

type SchemaType = z.infer<typeof Schema>;

validateParams<SchemaType>({ schema });
```

## validateCookies

Validates the `request.cookies` object inside a `NextRequest` typed request using `zod.safeParse`.

The return type is either `Response` or `NextResponse.next()`.

### Example

```
const schema = z.object({
  world: z
    .string({
      invalid_type_error: 'Invalid world',
    })
});

type SchemaType = z.infer<typeof Schema>;

validateCookies<SchemaType>({ schema });
```

## validateEquals

Validates a local variable against a variable inside a `NextRequest` typed request using the `===` operator.

The return type is either `Response` or `NextResponse.next()`.

### Example

```
const value = process.env.MY_ENV_VAR;
const transform = (request) => request.headers.get('MY_HEADER');

validateEquals<SchemaType>({ value, transform });
```
