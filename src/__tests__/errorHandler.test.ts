import {
  errorHandlerWithSchema,
  errorHandlerWithSchemaFormErrors,
} from '../errorHandler';

describe('errorHandlerWithSchema', () => {
  test('uses fieldErrors if in error', async () => {
    const result = errorHandlerWithSchema({
      // @ts-expect-error intentionally fudged, type errors expected
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
    const result = errorHandlerWithSchema({
      // @ts-expect-error intentionally fudged, type errors expected
      error: {},
    });

    expect(await result.json()).toMatchSnapshot();
  });

  test('uses DEFAULT_ERROR_MESSAGE if fieldErrors not in flatten', async () => {
    const result = errorHandlerWithSchema({
      error: {
        // @ts-expect-error intentionally fudged, type errors expected
        flatten: () => ({}),
      },
    });

    expect(await result.json()).toMatchSnapshot();
  });

  test('uses DEFAULT_ERROR_MESSAGE if fieldErrors is in flatten but undefined', async () => {
    const result = errorHandlerWithSchema({
      error: {
        // @ts-expect-error intentionally fudged, type errors expected
        flatten: () => ({ fieldErrors: undefined }),
      },
    });

    expect(await result.json()).toMatchSnapshot();
  });

  test('uses DEFAULT_ERROR_MESSAGE if fieldErrors is in flatten but empty string', async () => {
    const result = errorHandlerWithSchema({
      error: {
        // @ts-expect-error intentionally fudged, type errors expected
        flatten: () => ({ fieldErrors: '' }),
      },
    });

    expect(await result.json()).toMatchSnapshot();
  });

  test('uses DEFAULT_ERROR_MESSAGE if fieldErrors is in flatten but empty object', async () => {
    const result = errorHandlerWithSchema({
      error: {
        // @ts-expect-error intentionally fudged, type errors expected
        flatten: () => ({ fieldErrors: {} }),
      },
    });

    expect(await result.json()).toMatchSnapshot();
  });
});

describe('errorHandlerWithSchemaFormErrors', () => {
  test('uses formErrors if in error', async () => {
    const result = errorHandlerWithSchemaFormErrors({
      error: {
        // @ts-expect-error intentionally fudged, type errors expected
        flatten: () => ({
          formErrors: ['Form error exists!'],
        }),
      },
    });

    expect(await result.json()).toMatchSnapshot();
  });

  test('uses DEFAULT_ERROR_MESSAGE if flatten not in error', async () => {
    const result = errorHandlerWithSchemaFormErrors({
      // @ts-expect-error intentionally fudged, type errors expected
      error: {},
    });

    expect(await result.json()).toMatchSnapshot();
  });

  test('uses DEFAULT_ERROR_MESSAGE if formErrors not in flatten', async () => {
    const result = errorHandlerWithSchemaFormErrors({
      error: {
        // @ts-expect-error intentionally fudged, type errors expected
        flatten: () => ({}),
      },
    });

    expect(await result.json()).toMatchSnapshot();
  });

  test('uses DEFAULT_ERROR_MESSAGE if formErrors is in flatten but undefined', async () => {
    const result = errorHandlerWithSchemaFormErrors({
      error: {
        // @ts-expect-error intentionally fudged, type errors expected
        flatten: () => ({ formErrors: undefined }),
      },
    });

    expect(await result.json()).toMatchSnapshot();
  });

  test('uses DEFAULT_ERROR_MESSAGE if formErrors is in flatten but empty string', async () => {
    const result = errorHandlerWithSchemaFormErrors({
      error: {
        // @ts-expect-error intentionally fudged, type errors expected
        flatten: () => ({ formErrors: '' }),
      },
    });

    expect(await result.json()).toMatchSnapshot();
  });

  test('uses DEFAULT_ERROR_MESSAGE if formErrors is in flatten but empty object', async () => {
    const result = errorHandlerWithSchemaFormErrors({
      error: {
        // @ts-expect-error intentionally fudged, type errors expected
        flatten: () => ({ formErrors: {} }),
      },
    });

    expect(await result.json()).toMatchSnapshot();
  });
});
