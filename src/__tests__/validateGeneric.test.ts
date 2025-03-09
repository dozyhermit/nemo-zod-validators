import { validateGeneric } from '../validateGeneric';
import { errorHandler } from './mocks/errorHandler';
import {
  type SchemaType,
  SchemaWithZodEffectsType,
  schema,
  schemaWithIntentionallyBrokenSafeParse,
  schemaWithZodEffects,
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

  describe('with errorHandlerBuiltIn as formErrors', () => {
    test('passes validation with correct data', () => {
      const result = validateGeneric<SchemaType>({
        data: { Number: 123, String: 'Hello', AdvancedString: '123456' },
        schema,
        errorHandlerBuiltIn: 'formErrors',
      });

      expect(result.status).toBe(200);
    });

    test('triggers validation error with incorrect data', async () => {
      const result = validateGeneric<SchemaType>({
        data: { Number: 123, String: 'Hello', AdvancedString: 'World' },
        schema,
        errorHandlerBuiltIn: 'formErrors',
      });

      expect(await result.json()).toMatchSnapshot();
    });

    test('triggers validation error with incorrect data and custom error handler', async () => {
      const result = validateGeneric<SchemaType>({
        data: { Number: 123, String: 'Hello', AdvancedString: 'World' },
        schema,
        errorHandler,
        errorHandlerBuiltIn: 'formErrors',
      });

      expect(await result.json()).toMatchSnapshot();
    });
  });

  // This is just testing that the types definitions work okay with a ZodEffects style schema.
  // We don't really need to test that this works/doesn't work.
  describe('with schema that has one of two required fields', () => {
    test('passes validation with at least one the required fields', async () => {
      const result = validateGeneric<SchemaWithZodEffectsType>({
        data: { String: 'Hello', Number: 12 },
        schema: schemaWithZodEffects,
      });

      expect(result.status).toBe(200);
    });
  });
});
