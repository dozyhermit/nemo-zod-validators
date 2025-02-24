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

// handler required to avoid testing with Response results
const errorHandler = ({
  error,
}: SafeParseReturnType<Record<string, any>, SchemaType>) =>
  error?.flatten()?.fieldErrors;

describe('validateGeneric', () => {
  test('Triggers validation error with incorrectly supplied data', () => {
    const result = validateGeneric<SchemaType>({
      // AdvancedString must be a number string
      data: { Number: 123, String: 'Hello', AdvancedString: 'World' },
      schema,
      errorHandler,
    });

    expect(result).toMatchSnapshot();
  });

  test('Passes validation with correctly supplied data', async () => {
    const result = await validateGeneric<SchemaType>({
      data: { Number: 123, String: 'Hello', AdvancedString: '123456' },
      schema,
      errorHandler,
    });

    // proof that NextResponse.next() is called
    expect(result).toMatchSnapshot();
  });
});
