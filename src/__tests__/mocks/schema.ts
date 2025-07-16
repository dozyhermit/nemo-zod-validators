import { z } from 'zod';

export const schema = z.object({
  Number: z.number({
    error: 'Invalid Number type',
  }),
  String: z.string({
    error: 'Invalid String type',
  }),
  AdvancedString: z
    .string({
      error: 'Invalid AdvancedString type',
    })
    .regex(/^[0-9]+$/, 'Invalid AdvancedString regex'),
});

export type SchemaType = z.infer<typeof schema>;

export const cookieSchema = schema.extend({
  Number: z
    .string({
      error: 'Invalid Number type',
    })
    .regex(/^[0-9]+$/, 'Invalid Number regex'),
});

export type CookieSchemaType = z.infer<typeof cookieSchema>;

export const schemaWithIntentionallyBrokenSafeParse = {
  safeParse: (_data: any) => ({ error: true }),
};

// technical debt: upgrade this to v4 example
export const schemaWithZodEffects = schema
  .partial()
  .superRefine((data, ctx) => {
    if (!data.Number && !data.AdvancedString) {
      ctx.addIssue({
        path: ['Number'],
        code: z.ZodIssueCode.custom,
        message: 'Must have at least one of Number or AdvancedString',
      });

      ctx.addIssue({
        path: ['AdvancedString'],
        code: z.ZodIssueCode.custom,
        message: 'Must have at least one of AdvancedString or Number',
      });
    }
  });

export type SchemaWithZodEffectsType = z.infer<typeof schemaWithZodEffects>;
