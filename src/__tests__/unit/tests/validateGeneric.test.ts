import { validateGeneric } from '../../../validateGeneric';
import { errorHandlerCustom } from '../mocks/errorHandler';
import {
  type SchemaType,
  ZodEffectsSchemaType,
  brokenSafeParseSchema,
  schema,
  zodEffectsSchema,
} from '../mocks/schema';

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
      schema: brokenSafeParseSchema,
    });

    expect(await result.json()).toMatchSnapshot();
  });

  describe('with custom error handler', () => {
    test('passes validation with correct data', () => {
      const result = validateGeneric<SchemaType>({
        data: { Number: 123, String: 'Hello', AdvancedString: '123456' },
        schema,
        errorHandlerCustom,
      });

      expect(result.status).toBe(200);
    });

    test('triggers validation error with incorrect data', async () => {
      const result = validateGeneric<SchemaType>({
        data: { Number: 123, String: 'Hello', AdvancedString: 'World' },
        schema,
        errorHandlerCustom,
      });

      expect(await result.json()).toMatchSnapshot();
    });
  });

  describe('with errorType as formErrors', () => {
    test('passes validation with correct data', () => {
      const result = validateGeneric<SchemaType>({
        data: { Number: 123, String: 'Hello', AdvancedString: '123456' },
        schema,
        errorType: 'formErrors',
      });

      expect(result.status).toBe(200);
    });

    test('triggers validation error with incorrect data', async () => {
      const result = validateGeneric<SchemaType>({
        data: { Number: 123, String: 'Hello', AdvancedString: 'World' },
        schema,
        errorType: 'formErrors',
      });

      expect(await result.json()).toMatchSnapshot();
    });

    // technical debt: this is technically a nothing test because errorType gets ignored
    test('triggers validation error with incorrect data and custom error handler', async () => {
      const result = validateGeneric<SchemaType>({
        data: { Number: 123, String: 'Hello', AdvancedString: 'World' },
        schema,
        errorHandlerCustom,
        errorType: 'formErrors',
      });

      expect(await result.json()).toMatchSnapshot();
    });
  });

  // this is just testing that the types definitions work okay with a ZodEffects style schema.
  describe('with schema that has one of two required fields', () => {
    test('passes validation with at least one the required fields', async () => {
      const result = validateGeneric<ZodEffectsSchemaType>({
        data: { String: 'Hello', Number: 12 },
        schema: zodEffectsSchema,
      });

      expect(result.status).toBe(200);
    });
  });
});
