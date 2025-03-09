import { validateHeaders } from '../validateHeaders';
import { errorHandler } from './mocks/errorHandler';
import {
  type SchemaType,
  schema,
  schemaWithIntentionallyBrokenSafeParse,
} from './mocks/schema';

describe('validateHeaders', () => {
  test('passes validation with correct data', async () => {
    const action = validateHeaders<SchemaType>({ schema });

    const result = await action({
      request: {
        // @ts-expect-error type inconsistencies due to mocking headers
        headers: Object.entries({
          Number: 123,
          String: 'Hello',
          AdvancedString: '123456',
        }),
      },
    });

    expect(result.status).toBe(200);
  });

  test('triggers validation error with incorrect data', async () => {
    const action = validateHeaders<SchemaType>({ schema });

    const result = await action({
      request: {
        // @ts-expect-error type inconsistencies due to mocking headers
        headers: Object.entries({
          Number: 123,
          String: 'Hello',
          AdvancedString: 'World',
        }),
      },
    });

    expect(await result.json()).toMatchSnapshot();
  });

  test('triggers validation error with incorrect data and uses DEFAULT_ERROR_MESSAGE', async () => {
    const action = validateHeaders<SchemaType>({
      // @ts-expect-error
      schema: schemaWithIntentionallyBrokenSafeParse,
    });

    const result = await action({
      request: {
        // @ts-expect-error type inconsistencies due to mocking body
        body: Object.entries({
          Number: 123,
          String: 'Hello',
          AdvancedString: 'World',
        }),
      },
    });

    expect(await result.json()).toMatchSnapshot();
  });

  describe('with custom error handler', () => {
    test('passes validation with correct data', async () => {
      const action = validateHeaders<SchemaType>({ schema, errorHandler });

      const result = await action({
        request: {
          // @ts-expect-error type inconsistencies due to mocking headers
          headers: Object.entries({
            Number: 123,
            String: 'Hello',
            AdvancedString: '123456',
          }),
        },
      });

      expect(result.status).toBe(200);
    });

    test('triggers validation error with incorrect data', async () => {
      const action = validateHeaders<SchemaType>({ schema, errorHandler });

      const result = await action({
        request: {
          // @ts-expect-error type inconsistencies due to mocking headers
          headers: Object.entries({
            Number: 123,
            String: 'Hello',
            AdvancedString: 'World',
          }),
        },
      });

      expect(await result.json()).toMatchSnapshot();
    });
  });
});
