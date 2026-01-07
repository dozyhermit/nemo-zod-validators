import { errorHandlerSchema } from '../../../errorHandler';

describe('errorHandlerSchema', () => {
  test('uses fieldErrors if in error', async () => {
    const result = errorHandlerSchema({
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
    const result = errorHandlerSchema({
      // @ts-expect-error intentionally fudged, type errors expected
      error: {},
    });

    expect(await result.json()).toMatchSnapshot();
  });

  test('uses DEFAULT_ERROR_MESSAGE if fieldErrors not in flatten', async () => {
    const result = errorHandlerSchema({
      error: {
        // @ts-expect-error intentionally fudged, type errors expected
        flatten: () => ({}),
      },
    });

    expect(await result.json()).toMatchSnapshot();
  });

  test('uses DEFAULT_ERROR_MESSAGE if fieldErrors is in flatten but undefined', async () => {
    const result = errorHandlerSchema({
      error: {
        // @ts-expect-error intentionally fudged, type errors expected
        flatten: () => ({ fieldErrors: undefined }),
      },
    });

    expect(await result.json()).toMatchSnapshot();
  });

  test('uses DEFAULT_ERROR_MESSAGE if fieldErrors is in flatten but empty string', async () => {
    const result = errorHandlerSchema({
      error: {
        // @ts-expect-error intentionally fudged, type errors expected
        flatten: () => ({ fieldErrors: '' }),
      },
    });

    expect(await result.json()).toMatchSnapshot();
  });

  test('uses DEFAULT_ERROR_MESSAGE if fieldErrors is in flatten but empty object', async () => {
    const result = errorHandlerSchema({
      error: {
        // @ts-expect-error intentionally fudged, type errors expected
        flatten: () => ({ fieldErrors: {} }),
      },
    });

    expect(await result.json()).toMatchSnapshot();
  });
});

describe('errorHandler with errorType as formErrors', () => {
  test('uses formErrors if in error', async () => {
    const result = errorHandlerSchema(
      {
        // @ts-expect-error intentionally fudged, type errors expected
        error: {
          flatten: () => ({
            fieldErrors: {},
            formErrors: ['Form error exists!'],
          }),
        },
      },
      'formErrors'
    );

    expect(await result.json()).toMatchSnapshot();
  });

  test('uses DEFAULT_ERROR_MESSAGE if flatten not in error', async () => {
    const result = errorHandlerSchema(
      {
        // @ts-expect-error intentionally fudged, type errors expected
        error: {},
      },
      'formErrors'
    );

    expect(await result.json()).toMatchSnapshot();
  });

  test('uses DEFAULT_ERROR_MESSAGE if formErrors not in flatten', async () => {
    const result = errorHandlerSchema(
      {
        error: {
          // @ts-expect-error intentionally fudged, type errors expected
          flatten: () => ({}),
        },
      },
      'formErrors'
    );

    expect(await result.json()).toMatchSnapshot();
  });

  test('uses DEFAULT_ERROR_MESSAGE if formErrors is in flatten but undefined', async () => {
    const result = errorHandlerSchema(
      {
        error: {
          // @ts-expect-error intentionally fudged, type errors expected
          flatten: () => ({ formErrors: undefined }),
        },
      },
      'formErrors'
    );

    expect(await result.json()).toMatchSnapshot();
  });

  test('uses DEFAULT_ERROR_MESSAGE if formErrors is in flatten but empty string', async () => {
    const result = errorHandlerSchema(
      {
        error: {
          // @ts-expect-error intentionally fudged, type errors expected
          flatten: () => ({ formErrors: '' }),
        },
      },
      'formErrors'
    );

    expect(await result.json()).toMatchSnapshot();
  });

  test('uses DEFAULT_ERROR_MESSAGE if formErrors is in flatten but empty array', async () => {
    const result = errorHandlerSchema(
      {
        error: {
          // @ts-expect-error intentionally fudged, type errors expected
          flatten: () => ({ formErrors: [] }),
        },
      },
      'formErrors'
    );

    expect(await result.json()).toMatchSnapshot();
  });
});
