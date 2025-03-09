import { validateGeneric } from '../validateGeneric';
import { errorHandler } from './mocks/errorHandler';
import {
  type SchemaType,
  schema,
  schemaWithIntentionallyBrokenSafeParse,
} from './mocks/schema';

describe('validateGeneric', () => {
  test('passes validation with correct data', () => {
    const result = validateGeneric<SchemaType>({
      data: { Number: 123, String: 'Hello', AdvancedString: '123456' },
      schema,
    });

    expect(result.status).toBe(200);
  });

  test('triggers validation error with incorrect data', async () => {
    const result = validateGeneric<SchemaType>({
      data: { Number: 123, String: 'Hello', AdvancedString: 'World' },
      schema,
    });

    expect(await result.json()).toMatchSnapshot();
  });

  test('triggers validation error with incorrect data and uses DEFAULT_ERROR_MESSAGE', async () => {
    const result = validateGeneric<SchemaType>({
      data: { Number: 123, String: 'Hello', AdvancedString: 'World' },
      // @ts-expect-error intentionally broken schema
      schema: schemaWithIntentionallyBrokenSafeParse,
    });

    expect(await result.json()).toMatchSnapshot();
  });

  describe('with custom error handler', () => {
    test('passes validation with correct data', () => {
      const result = validateGeneric<SchemaType>({
        data: { Number: 123, String: 'Hello', AdvancedString: '123456' },
        schema,
        errorHandler,
      });

      expect(result.status).toBe(200);
    });

    test('triggers validation error with incorrect data', async () => {
      const result = validateGeneric<SchemaType>({
        data: { Number: 123, String: 'Hello', AdvancedString: 'World' },
        schema,
        errorHandler,
      });

      expect(await result.json()).toMatchSnapshot();
    });
  });
});
