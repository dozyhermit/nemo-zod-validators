# nemo-zod-validators

This is a personal project, but is worth being open source because it's pretty handy;

`@rescale/nemo` and `zod` saved my life when working with Next.js app router api endpoints, but writing the same validation functions over and over was driving me crazy.

And so this makes writing validation functions even easier.

# Installation

`npm i @dozyhermit/nemo-zod-validators`

# Usage

In your `middleware.js` file, inside your Next.js project

```
import { validateParams } from '@dozyhermit/nemo-zod-validators';

export const middleware = createMiddleware({
  '/api/hello/:world': [
    validateParams<z.infer<typeof schema>>(schema),
  ],
});
```

# Full example

A full file example of the above in a Next.js project.

```
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
    validateParams<SchemaType>(schema),
  ],
};

export const middleware = createMiddleware(middlewares);
```
