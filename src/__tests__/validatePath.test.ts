import { validatePath } from '../validatePath';
import { errorHandler } from './mocks/errorHandler';
import {
  type SchemaType,
  schema,
  schemaWithIntentionallyBrokenSafeParse,
} from './mocks/schema';

describe('validatePath', () => {
  test('passes validation with correct data', async () => {
    const action = validatePath<SchemaType>({ schema });

    const result = await action({
      params: () => ({
        // @ts-expect-error type inconsistencies due to mocking params()
        Number: 123,
        String: 'Hello',
        AdvancedString: '123456',
      }),
    });

    expect(result.status).toBe(200);
  });

  test('triggers validation error with incorrect data', async () => {
    const action = validatePath<SchemaType>({ schema });

    const result = await action({
      params: () => ({
        // @ts-expect-error type inconsistencies due to mocking params()
        Number: 123,
        String: 'Hello',
        AdvancedString: 'World',
      }),
    });

    expect(await result.json()).toMatchSnapshot();
  });

  test('triggers validation error with incorrect data and uses DEFAULT_ERROR_MESSAGE', async () => {
    const action = validatePath<SchemaType>({
      // @ts-expect-error intentionally broken schema
      schema: schemaWithIntentionallyBrokenSafeParse,
    });

    const result = await action({
      params: () => ({
        // @ts-expect-error type inconsistencies due to mocking params()
        Number: 123,
        String: 'Hello',
        AdvancedString: 'World',
      }),
    });

    expect(await result.json()).toMatchSnapshot();
  });

  describe('with custom error handler', () => {
    test('passes validation with correct data', async () => {
      const action = validatePath<SchemaType>({ schema, errorHandler });

      const result = await action({
        params: () => ({
          // @ts-expect-error type inconsistencies due to mocking params()
          Number: 123,
          String: 'Hello',
          AdvancedString: '123456',
        }),
      });

      expect(result.status).toBe(200);
    });

    test('triggers validation error with incorrect data', async () => {
      const action = validatePath<SchemaType>({ schema, errorHandler });

      const result = await action({
        params: () => ({
          // @ts-expect-error type inconsistencies due to mocking params()
          Number: 123,
          String: 'Hello',
          AdvancedString: 'World',
        }),
      });

      expect(await result.json()).toMatchSnapshot();
    });
  });
});
