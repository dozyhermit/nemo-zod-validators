# nemo-zod-validators

`@rescale/nemo` and `zod` saved my life when working with Next.js, but writing the same validation functions over and over was driving me crazy.

So, this just makes adding validation even easier.

# Install

```bash
npm i @dozyhermit/nemo-zod-validators
```

# Upgrade

If your project uses older versions of `@rescale/nemo` or `zod`, please upgrade your project schemas and middleware before upgrading `@dozyhermit/nemo-zod-validators`.

See:

- `@rescale/nemo`: https://nemo.zanreal.com/docs
- `zod`: https://zod.dev

_Then_ you can upgrade `@dozyhermit/nemo-zod-validators` to the latest version.

**Note: If you find that your schemas aren't working as robustly as before, double check you have correctly migrated your `zod` schemas.**

# Usage

In your `proxy.ts` or `middleware.ts` Next.js project file:

```typescript
import { createNEMO } from '@rescale/nemo';
import { z } from 'zod';
import { validatePath } from '@dozyhermit/nemo-zod-validators';

const schema = z.object({
  world: z.string().regex(/[0-9]+/, { error: 'Invalid string' }),
});

type SchemaType = z.infer<typeof Schema>;

const middlewares = {
  '/api/hello/:world': [validatePath<SchemaType>({ schema })],
};

// this will be "export const middleware" for middleware.ts files
export const proxy = createNEMO(middlewares);
```

# Functions

## validateGeneric

Validates data against a zod schema using `safeParse`. This is the base for all the schema based validators in this package.

The return type can be either `Response` or `NextResponse.next()`.

### Example

```typescript
const schema = z.object({
  hello: z.string().regex(/[0-9]+/, { error: 'Invalid string' }),
});

type SchemaType = z.infer<typeof Schema>;

validateGeneric<SchemaType>({ data: { hello: 'World' }, schema });
```

### Creating Your Own Validator

This couldn't be simpler, but the only thing you have to remember is how to prevent `validateGeneric` from executing immediately.

For example, let's create a `validateCustom` validator:

```typescript
type ValidateCustom = ValidateSchema;

export const validateCustom = <T>({ schema }: ValidateCustom) => {
  return async (request: NextRequest, _event: NemoEvent) =>
    validateGeneric<T>({
      data: request.body as T,
      schema,
    });
};
```

In the above, we return a function because when we use it like below:

```typescript
const middlewares = {
  '/api/hello/world': [validateCustom<SchemaType>({ schema })],
};
```

it means `validateGeneric` is not immediately executed when the api starts; it will only ever run when we make a request to `/api/hello/world`.

## validateBody

Validates the `request.json()` function inside a `NextRequest` request using `zod.safeParse`.

The return type can be either `Response` or `NextResponse.next()`.

### Example

```typescript
const schema = z.object({
  hello: z.string().regex(/[0-9]+/, { error: 'Invalid string' }),
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
  hello: z.string().regex(/[0-9]+/, { error: 'Invalid string' }),
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
  hello: z.string().regex(/[0-9]+/, { error: 'Invalid string' }),
});

type SchemaType = z.infer<typeof Schema>;

validateHeaders<SchemaType>({ schema });
```

## validateParams

Deprecated. Please use `validatePath` instead.

`validateParams` and `validatePath` are exactly the same function, but it has been renamed to be more appropriate.

Feel free to keep using it, as it likely won't ever be removed.

## validatePath

Validates the `params` object provided by `NemoEvent` using `zod.safeParse`.

The return type can be either `Response` or `NextResponse.next()`.

### Example

```typescript
const schema = z.object({
  hello: z.string().regex(/[0-9]+/, { error: 'Invalid string' }),
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
  hello: z.string().regex(/[0-9]+/, { error: 'Invalid string' }),
});

type SchemaType = z.infer<typeof Schema>;

validateQuery<SchemaType>({ schema });
```
