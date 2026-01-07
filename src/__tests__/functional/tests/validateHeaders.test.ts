import axios from 'axios';

describe('validateHeaders', () => {
  test('passes validation with correct data', async () => {
    const headers = {
      hello: 'World',
    };

    const result = await axios.get('http://localhost:3000/api/headers', {
      headers,
    });

    expect(result.status).toBe(200);
  });

  test('triggers validation error with incorrect data', async () => {
    const headers = {
      hello: 1234,
    };

    try {
      await axios.get('http://localhost:3000/api/headers', { headers });
    } catch (e: any) {
      expect(e.status).toBe(422);
    }
  });

  test('triggers validation error with empty data', async () => {
    try {
      await axios.get('http://localhost:3000/api/headers', {
        headers: {},
      });
    } catch (e: any) {
      expect(e.status).toBe(422);
    }
  });

  test('triggers error with no data', async () => {
    try {
      await axios.get('http://localhost:3000/api/headers');
    } catch (e: any) {
      expect(e.status).toBe(422);
    }
  });
});
