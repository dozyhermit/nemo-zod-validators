import { SafeParseReturnType, z } from 'zod';
import { validateGeneric } from '../';

const schema = z.object({
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

type SchemaType = z.infer<typeof schema>;

// Handler required to avoid testing with Next.js responses
const errorHandler = ({
  error,
}: SafeParseReturnType<Record<string, any>, SchemaType>) =>
  error?.flatten()?.fieldErrors;

describe('validateGeneric', () => {
  test('Triggers validation error with incorrectly supplied data', () => {
    expect(
      validateGeneric<SchemaType>({
        // AdvancedString must be a number string
        data: { Number: 123, String: 'Hello', AdvancedString: 'World' },
        schema,
        errorHandler,
      })
    ).toMatchSnapshot();
  });

  test('Passes validation with correctly supplied data', () => {
    expect(
      validateGeneric<SchemaType>({
        data: { Number: 123, String: 'Hello', AdvancedString: '123456' },
        schema,
        errorHandler,
      })
    ).toMatchSnapshot();
  });
});
