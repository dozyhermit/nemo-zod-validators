import { z } from 'zod';

export const schema = z.object({
  Number: z.number({
    invalid_type_error: 'Invalid Number type',
  }),
  String: z.string({
    invalid_type_error: 'Invalid String type',
  }),
  AdvancedString: z
    .string({
      invalid_type_error: 'Invalid AdvancedString type',
    })
    .regex(/^[0-9]+$/, 'Invalid AdvancedString regex'),
});

export const schemaWithIntentionallyBrokenSafeParse = {
  safeParse: (_data: any) => ({ error: true }),
};

export type SchemaType = z.infer<typeof schema>;

export const cookieSchema = z.object({
  Number: z
    .string({
      invalid_type_error: 'Invalid Number type',
    })
    .regex(/^[0-9]+$/, 'Invalid Number regex'),
  String: z.string({
    invalid_type_error: 'Invalid String type',
  }),
  AdvancedString: z
    .string({
      invalid_type_error: 'Invalid AdvancedString type',
    })
    .regex(/^[0-9]+$/, 'Invalid AdvancedString regex'),
});

export type CookieSchemaType = z.infer<typeof cookieSchema>;
