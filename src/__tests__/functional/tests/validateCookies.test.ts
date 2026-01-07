import axios from 'axios';

describe('validateCookies', () => {
  test('passes validation with correct data', async () => {
    const result = await axios.get('http://localhost:3000/api/cookies', {
      headers: { cookie: 'hello=world' },
    });

    expect(result.status).toBe(200);
  });

  test('triggers validation error with incorrect data', async () => {
    try {
      await axios.get('http://localhost:3000/api/cookies', {
        headers: { cookie: 'hello=1234' },
      });
    } catch (e: any) {
      expect(e.status).toBe(422);
    }
  });

  test('triggers validation error with empty data', async () => {
    try {
      await axios.get('http://localhost:3000/api/cookies', {
        headers: { cookie: '' },
      });
    } catch (e: any) {
      expect(e.status).toBe(422);
    }
  });

  // cookies are not objects
  test('triggers validation error with malformed data', async () => {
    try {
      await axios.get('http://localhost:3000/api/cookies', {
        // @ts-ignore
        headers: { cookie: { hello: 'world' } },
      });
    } catch (e: any) {
      expect(e.status).toBe(422);
    }
  });

  test('triggers error with no data', async () => {
    try {
      await axios.get('http://localhost:3000/api/cookies');
    } catch (e: any) {
      expect(e.status).toBe(422);
    }
  });
});
