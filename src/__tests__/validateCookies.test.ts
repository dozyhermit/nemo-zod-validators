import { validateCookies } from '../validateCookies';
import { errorHandlerCustom } from './mocks/errorHandler';
import {
  type CookieSchemaType as SchemaType,
  brokenSafeParseSchema,
  cookieSchema as schema,
} from './mocks/schema';

describe('validateCookies', () => {
  test('passes validation with correct data', async () => {
    const action = validateCookies<SchemaType>({ schema });

    const result = await action(
      {
        // @ts-expect-error type inconsistencies due to mocking function props
        cookies: {
          toString: () => 'Number=123; String=Hello; AdvancedString=123456',
        },
      },
      {}
    );

    expect(result.status).toBe(200);
  });

  test('triggers validation error with incorrect data', async () => {
    const action = validateCookies<SchemaType>({ schema });

    const result = await action(
      {
        // @ts-expect-error type inconsistencies due to mocking function props
        cookies: {
          toString: () => 'Number=123; String=Hello; AdvancedString=World',
        },
      },
      {}
    );

    expect(await result.json()).toMatchSnapshot();
  });

  test('triggers validation error with incorrect data and uses DEFAULT_ERROR_MESSAGE', async () => {
    const action = validateCookies<SchemaType>({
      // @ts-expect-error intentionally broken schema
      schema: brokenSafeParseSchema,
    });

    const result = await action(
      {
        // @ts-expect-error type inconsistencies due to mocking function props
        cookies: {
          toString: () => 'Number=123; String=Hello; AdvancedString=World',
        },
      },
      {}
    );

    expect(await result.json()).toMatchSnapshot();
  });

  describe('with custom error handler', () => {
    test('passes validation with correct data', async () => {
      const action = validateCookies<SchemaType>({
        schema,
        errorHandlerCustom,
      });

      const result = await action(
        {
          // @ts-expect-error type inconsistencies due to mocking function props
          cookies: {
            toString: () => 'Number=123; String=Hello; AdvancedString=123456',
          },
        },
        {}
      );

      expect(result.status).toBe(200);
    });

    test('triggers validation error with incorrect data', async () => {
      const action = validateCookies<SchemaType>({
        schema,
        errorHandlerCustom,
      });

      const result = await action(
        {
          // @ts-expect-error type inconsistencies due to mocking function props
          cookies: {
            toString: () => 'Number=123; String=Hello; AdvancedString=World',
          },
        },
        {}
      );

      expect(await result.json()).toMatchSnapshot();
    });
  });
});
