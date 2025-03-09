import { validateQuery } from '../validateQuery';
import { errorHandler } from './mocks/errorHandler';
import {
  type SchemaType,
  schema,
  schemaWithIntentionallyBrokenSafeParse,
} from './mocks/schema';

describe('validateQuery', () => {
  test('passes validation with correct data', async () => {
    const action = validateQuery<SchemaType>({ schema });

    const result = await action({
      request: {
        nextUrl: {
          searchParams: {
            // @ts-expect-error type inconsistencies due to mocking searchParams
            entries: () => [
              ['Number', 123],
              ['String', 'Hello'],
              ['AdvancedString', '123456'],
            ],
          },
        },
      },
    });

    expect(result.status).toBe(200);
  });

  test('triggers validation error with incorrect data', async () => {
    const action = validateQuery<SchemaType>({ schema });

    const result = await action({
      request: {
        nextUrl: {
          searchParams: {
            // @ts-expect-error type inconsistencies due to mocking searchParams
            entries: () => [
              ['Number', 123],
              ['String', 'Hello'],
              ['AdvancedString', 'World'],
            ],
          },
        },
      },
    });

    expect(await result.json()).toMatchSnapshot();
  });

  test('triggers validation error with incorrect data and uses DEFAULT_ERROR_MESSAGE', async () => {
    const action = validateQuery<SchemaType>({
      // @ts-expect-error intentionally broken schema
      schema: schemaWithIntentionallyBrokenSafeParse,
    });

    const result = await action({
      request: {
        nextUrl: {
          searchParams: {
            // @ts-expect-error type inconsistencies due to mocking searchParams
            entries: () => [
              ['Number', 123],
              ['String', 'Hello'],
              ['AdvancedString', 'World'],
            ],
          },
        },
      },
    });

    expect(await result.json()).toMatchSnapshot();
  });

  describe('with custom error handler', () => {
    test('passes validation with correct data', async () => {
      const action = validateQuery<SchemaType>({ schema, errorHandler });

      const result = await action({
        request: {
          nextUrl: {
            searchParams: {
              // @ts-expect-error type inconsistencies due to mocking searchParams
              entries: () => [
                ['Number', 123],
                ['String', 'Hello'],
                ['AdvancedString', '123456'],
              ],
            },
          },
        },
      });

      expect(result.status).toBe(200);
    });

    test('triggers validation error with incorrect data', async () => {
      const action = validateQuery<SchemaType>({ schema, errorHandler });

      const result = await action({
        request: {
          nextUrl: {
            searchParams: {
              // @ts-expect-error type inconsistencies due to mocking searchParams
              entries: () => [
                ['Number', 123],
                ['String', 'Hello'],
                ['AdvancedString', 'World'],
              ],
            },
          },
        },
      });

      expect(await result.json()).toMatchSnapshot();
    });
  });
});
