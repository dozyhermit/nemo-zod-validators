import { validateCookies } from '../validateCookies';
import { errorHandler } from './mocks/errorHandler';
import {
  type CookieSchemaType as SchemaType,
  cookieSchema as schema,
  schemaWithIntentionallyBrokenSafeParse,
} from './mocks/schema';

describe('validateCookies', () => {
  test('passes validation with correct data', async () => {
    const action = validateCookies<SchemaType>({ schema });

    const result = await action({
      request: {
        // @ts-expect-error type inconsistencies due to mocking body
        cookies: {
          toString: () => 'Number=123; String=Hello; AdvancedString=123456',
        },
      },
    });

    expect(result.status).toBe(200);
  });

  test('triggers validation error with incorrect data', async () => {
    const action = validateCookies<SchemaType>({ schema });

    const result = await action({
      request: {
        // @ts-expect-error type inconsistencies due to mocking body
        cookies: {
          toString: () => 'Number=123; String=Hello; AdvancedString=World',
        },
      },
    });

    expect(await result.json()).toMatchSnapshot();
  });

  test('triggers validation error with incorrect data and uses DEFAULT_ERROR_MESSAGE', async () => {
    const action = validateCookies<SchemaType>({
      // @ts-expect-error intentionally broken schema
      schema: schemaWithIntentionallyBrokenSafeParse,
    });

    const result = await action({
      request: {
        // @ts-expect-error type inconsistencies due to mocking body
        cookies: {
          toString: () => 'Number=123; String=Hello; AdvancedString=World',
        },
      },
    });

    expect(await result.json()).toMatchSnapshot();
  });

  describe('with custom error handler', () => {
    test('passes validation with correct data', async () => {
      const action = validateCookies<SchemaType>({ schema, errorHandler });

      const result = await action({
        request: {
          // @ts-expect-error type inconsistencies due to mocking body
          cookies: {
            toString: () => 'Number=123; String=Hello; AdvancedString=123456',
          },
        },
      });

      expect(result.status).toBe(200);
    });

    test('triggers validation error with incorrect data', async () => {
      const action = validateCookies<SchemaType>({ schema, errorHandler });

      const result = await action({
        request: {
          // @ts-expect-error type inconsistencies due to mocking body
          cookies: {
            toString: () => 'Number=123; String=Hello; AdvancedString=World',
          },
        },
      });

      expect(await result.json()).toMatchSnapshot();
    });
  });
});
