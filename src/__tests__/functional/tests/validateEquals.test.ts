import axios from 'axios';

describe('validateEquals', () => {
  test('passes validation with correct data', async () => {
    const headers = {
      hello: 'world',
    };

    const result = await axios.get('http://localhost:3000/api/equals', {
      headers,
    });

    expect(result.status).toBe(200);
  });

  test('triggers validation error with incorrect data', async () => {
    const headers = {
      hello: 1234,
    };

    try {
      await axios.get('http://localhost:3000/api/equals', { headers });
    } catch (e: any) {
      expect(e.status).toBe(422);
    }
  });

  test('triggers validation error with empty data', async () => {
    try {
      await axios.get('http://localhost:3000/api/equals', {
        headers: {},
      });
    } catch (e: any) {
      expect(e.status).toBe(422);
    }
  });

  // hello is not an object
  test('triggers validation error with malformed data', async () => {
    try {
      await axios.get('http://localhost:3000/api/equals', {
        // @ts-ignore
        headers: { hello: {} },
      });
    } catch (e: any) {
      expect(e.status).toBe(422);
    }
  });

  test('triggers error with no data', async () => {
    try {
      await axios.post('http://localhost:3000/api/equals');
    } catch (e: any) {
      expect(e.status).toBe(422);
    }
  });
});
