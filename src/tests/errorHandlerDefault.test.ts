import { errorHandlerDefault } from '..';

describe('errorHandlerDefault', () => {
  test('uses fieldErrors if in error', async () => {
    const result = errorHandlerDefault({
      // @ts-ignore intentionally fudged, type errors expected
      error: {
        flatten: () => ({
          fieldErrors: { field: ['Field error exists!'] },
          formErrors: [],
        }),
      },
    });

    expect(await result.json()).toMatchSnapshot();
  });

  test('uses DEFAULT_ERROR_MESSAGE if flatten not in error', async () => {
    const result = errorHandlerDefault({
      // @ts-ignore intentionally fudged, type errors expected
      error: {},
    });

    expect(await result.json()).toMatchSnapshot();
  });

  test('uses DEFAULT_ERROR_MESSAGE if fieldErrors not in flatten', async () => {
    const result = errorHandlerDefault({
      error: {
        // @ts-ignore intentionally fudged, type errors expected
        flatten: () => ({}),
      },
    });

    expect(await result.json()).toMatchSnapshot();
  });

  test('uses DEFAULT_ERROR_MESSAGE if fieldErrors is in flatten but undefined', async () => {
    const result = errorHandlerDefault({
      error: {
        // @ts-ignore intentionally fudged, type errors expected
        flatten: () => ({ fieldErrors: undefined }),
      },
    });

    expect(await result.json()).toMatchSnapshot();
  });

  test('uses DEFAULT_ERROR_MESSAGE if fieldErrors is in flatten but empty string', async () => {
    const result = errorHandlerDefault({
      error: {
        // @ts-ignore intentionally fudged, type errors expected
        flatten: () => ({ fieldErrors: '' }),
      },
    });

    expect(await result.json()).toMatchSnapshot();
  });

  test('uses DEFAULT_ERROR_MESSAGE if fieldErrors is in flatten but empty object', async () => {
    const result = errorHandlerDefault({
      error: {
        // @ts-ignore intentionally fudged, type errors expected
        flatten: () => ({ fieldErrors: {} }),
      },
    });

    expect(await result.json()).toMatchSnapshot();
  });
});
