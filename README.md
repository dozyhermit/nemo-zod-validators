# nemo-zod-validators

`@rescale/nemo` and `zod` saved my life when working with Next.js, but writing the same validation functions over and over was driving me crazy.

So, this just makes adding validation even easier.

# Installation

```bash
npm i @dozyhermit/nemo-zod-validators
```

# Usage

In your `middleware.ts` Next.js project file:

```typescript
import { z } from 'zod';
import { createMiddleware } from '@rescale/nemo';
import { validateParams } from '@dozyhermit/nemo-zod-validators';

const schema = z.object({
  hello: z.string({
    invalid_type_error: 'Invalid hello',
  }),
});

type SchemaType = z.infer<typeof Schema>;

const middlewares = {
  '/api/hello/:world': [validateParams<SchemaType>({ schema })],
};

export const middleware = createMiddleware(middlewares);
```

# Functions

## validateGeneric

Validates data against a zod schema using `safeParse`. This is the base for all the schema based validators in this package.

The return type can be either `Response` or `NextResponse.next()`.

### Example

```typescript
const schema = z.object({
  hello: z.string({
    invalid_type_error: 'Invalid hello',
  }),
});

type SchemaType = z.infer<typeof Schema>;

validateGeneric<SchemaType>({ data: { hello: 'World' }, schema });
```

### Creating Your Own Validator

This couldn't be simpler, but the only thing you have to remember is how to prevent `validateGeneric` from executing immediately.

For example, let's create a `validateCookies` validator:

```typescript
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

In the above, we return an asynchronous function because when we use it like below:

```typescript
const middlewares = {
  '/api/hello/:world': [validateCookies<SchemaType>({ schema })],
};
```

it means `validateGeneric` is not immediately executed when the api starts; it will only ever run when we make a request to `/api/hello/:world`.

_Note: This example validator doesn't work. See `validateCookies` below._

## validateBody

Validates the `request.json()` function inside a `NextRequest` request using `zod.safeParse`.

The return type can be either `Response` or `NextResponse.next()`.

### Example

```typescript
const schema = z.object({
  hello: z.string({
    invalid_type_error: 'Invalid hello',
  }),
});

type SchemaType = z.infer<typeof Schema>;

validateBody<SchemaType>({ schema });
```

## validateCookies

Validates the `request.cookies` object inside a `NextRequest` request using `zod.safeParse`.

The return type can be either `Response` or `NextResponse.next()`.

### Example

```typescript
const schema = z.object({
  hello: z.string({
    invalid_type_error: 'Invalid hello',
  }),
});

type SchemaType = z.infer<typeof Schema>;

validateCookies<SchemaType>({ schema });
```

## validateEquals

Validates a local variable against a variable inside a `NextRequest` request using the `===` operator.

The return type can be either `Response` or `NextResponse.next()`.

### Example

```typescript
const value = process.env.MY_ENV_VAR;
const transform = (request) => request.headers.get('MY_HEADER');

validateEquals<string | null>({ value, transform });
```

## validateHeaders

Validates the `request.headers` tuple inside a `NextRequest` request using `zod.safeParse`.

The return type can be either `Response` or `NextResponse.next()`.

### Example

```typescript
const schema = z.object({
  hello: z.string({
    invalid_type_error: 'Invalid hello',
  }),
});

type SchemaType = z.infer<typeof Schema>;

validateHeaders<SchemaType>({ schema });
```

## validateParams

Deprecated. Please use `validatePath` instead.

`validateParams` and `validatePath` are exactly the same function, but it has been renamed to be more appropriate.

Feel free to keep using it, as it likely won't ever be removed.

## validatePath

Validates the `request.params()` function inside a `NextRequest` request using `zod.safeParse`.

The return type can be either `Response` or `NextResponse.next()`.

### Example

```typescript
const schema = z.object({
  hello: z.string({
    invalid_type_error: 'Invalid hello',
  }),
});

type SchemaType = z.infer<typeof Schema>;

validatePath<SchemaType>({ schema });
```

## validateQuery

Validates `request.nextUrl.searchParams` (URLSearchParams) inside a `NextRequest` request using `zod.safeParse`.

The return type can be either `Response` or `NextResponse.next()`.

### Example

```typescript
const schema = z.object({
  hello: z.string({
    invalid_type_error: 'Invalid hello',
  }),
});

type SchemaType = z.infer<typeof Schema>;

validateQuery<SchemaType>({ schema });
```
