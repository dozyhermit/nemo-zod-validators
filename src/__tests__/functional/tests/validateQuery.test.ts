import axios from 'axios';

describe('validateQuery', () => {
  test('passes validation with correct data', async () => {
    const result = await axios.get(
      'http://localhost:3000/api/query?hello=world'
    );

    expect(result.status).toBe(200);
  });

  test('triggers validation error with incorrect data', async () => {
    try {
      await axios.get('http://localhost:3000/api/query?hello=1234');
    } catch (e: any) {
      expect(e.status).toBe(422);
    }
  });

  test('triggers validation error with empty data', async () => {
    try {
      await axios.get('http://localhost:3000/api/query?');
    } catch (e: any) {
      expect(e.status).toBe(422);
    }
  });

  test('triggers validation error with no data', async () => {
    try {
      await axios.get('http://localhost:3000/api/query');
    } catch (e: any) {
      expect(e.status).toBe(422);
    }
  });
});
