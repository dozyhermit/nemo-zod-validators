import { validateBody } from '../validateBody';
import { errorHandler } from './mocks/errorHandler';
import {
  type SchemaType,
  schema,
  schemaWithIntentionallyBrokenSafeParse,
} from './mocks/schema';

describe('validateBody', () => {
  test('passes validation with correct data', async () => {
    const action = validateBody<SchemaType>({ schema });

    const result = await action({
      request: {
        // @ts-ignore type inconsistencies due to mocking body
        body: { Number: 123, String: 'Hello', AdvancedString: '123456' },
      },
    });

    expect(result.status).toBe(200);
  });

  test('triggers validation error with incorrect data', async () => {
    const action = validateBody<SchemaType>({ schema });

    const result = await action({
      request: {
        // @ts-ignore type inconsistencies due to mocking body
        body: { Number: 123, String: 'Hello', AdvancedString: 'World' },
      },
    });

    expect(await result.json()).toMatchSnapshot();
  });

  test('triggers validation error with incorrect data and uses DEFAULT_ERROR_MESSAGE', async () => {
    const action = validateBody<SchemaType>({
      // @ts-ignore
      schema: schemaWithIntentionallyBrokenSafeParse,
    });

    const result = await action({
      request: {
        // @ts-ignore type inconsistencies due to mocking body
        body: { Number: 123, String: 'Hello', AdvancedString: 'World' },
      },
    });

    expect(await result.json()).toMatchSnapshot();
  });

  describe('with custom error handler', () => {
    test('passes validation with correct data', async () => {
      const action = validateBody<SchemaType>({ schema, errorHandler });

      const result = await action({
        request: {
          // @ts-ignore type inconsistencies due to mocking body
          body: { Number: 123, String: 'Hello', AdvancedString: '123456' },
        },
      });

      expect(result.status).toBe(200);
    });

    test('triggers validation error with incorrect data', async () => {
      const action = validateBody<SchemaType>({ schema, errorHandler });

      const result = await action({
        request: {
          // @ts-ignore type inconsistencies due to mocking body
          body: { Number: 123, String: 'Hello', AdvancedString: 'World' },
        },
      });

      expect(await result.json()).toMatchSnapshot();
    });
  });
});
