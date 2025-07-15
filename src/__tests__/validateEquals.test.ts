import { validateEquals } from '../validateEquals';
import { errorHandlerEquals } from './mocks/errorHandler';

describe('validateEquals', () => {
  test('passes validation when two values equal', async () => {
    const action = validateEquals<String | null>({
      value: 'Hello World',
      transform: (request) => request.headers.get('HELLO_WORLD'),
    });

    const result = await action(
      {
        // @ts-expect-error type inconsistencies due to mocking function props
        headers: { get: () => 'Hello World' },
      },
      {}
    );

    expect(result.status).toBe(200);
  });

  test('fails validation when two values do not equal', async () => {
    const action = validateEquals<String | null>({
      value: 'Hello World',
      transform: (request) => request.headers.get('HELLO_WORLD'),
    });

    const result = await action(
      {
        // @ts-expect-error type inconsistencies due to mocking function props
        headers: { get: () => 'Invalid' },
      },
      {}
    );

    expect(result.status).toBe(400);
  });

  describe('with custom error handler', () => {
    test('passes validation when two values equal', async () => {
      const action = validateEquals<String | null>({
        value: 'Hello World',
        transform: (request) => request.headers.get('HELLO_WORLD'),
        errorHandlerCustom: errorHandlerEquals,
      });

      const result = await action(
        {
          // @ts-expect-error type inconsistencies due to mocking function props
          headers: { get: () => 'Hello World' },
        },
        {}
      );

      expect(result.status).toBe(200);
    });

    test('fails validation when two values do not equal', async () => {
      const action = validateEquals<String | null>({
        value: 'Hello World',
        transform: (request) => request.headers.get('HELLO_WORLD'),
        errorHandlerCustom: errorHandlerEquals,
      });

      const result = await action(
        {
          // @ts-expect-error type inconsistencies due to mocking function props
          headers: { get: () => 'Invalid' },
        },
        {}
      );

      expect(await result.json()).toMatchSnapshot();
    });
  });
});
