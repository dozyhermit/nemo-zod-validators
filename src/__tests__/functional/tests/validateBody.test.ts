import axios from 'axios';

describe('validateBody', () => {
  test('passes validation with correct data', async () => {
    const body = {
      hello: 'World',
    };

    const result = await axios.post('http://localhost:3000/api/body', body);
    expect(result.status).toBe(200);
  });

  test('triggers validation error with incorrect data', async () => {
    const body = {
      hello: 1234,
    };

    try {
      await axios.post('http://localhost:3000/api/body', body);
    } catch (e: any) {
      expect(e.status).toBe(422);
    }
  });

  test('triggers validation error with empty data', async () => {
    try {
      await axios.post('http://localhost:3000/api/body', {});
    } catch (e: any) {
      expect(e.status).toBe(422);
    }
  });

  // body needs to be an object
  test('triggers validation error with malformed data', async () => {
    try {
      await axios.post('http://localhost:3000/api/body', '');
    } catch (e: any) {
      expect(e.status).toBe(500);
    }
  });

  test('triggers error with no data', async () => {
    try {
      await axios.post('http://localhost:3000/api/body');
    } catch (e: any) {
      expect(e.status).toBe(500);
    }
  });
});
