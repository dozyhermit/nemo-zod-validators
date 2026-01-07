import axios from 'axios';

describe('validatePath', () => {
  test('passes validation with correct data', async () => {
    const result = await axios.get('http://localhost:3000/api/path/hello');
    expect(result.status).toBe(200);
  });

  test('triggers validation error with incorrect data', async () => {
    try {
      await axios.get('http://localhost:3000/api/path/1234');
    } catch (e: any) {
      expect(e.status).toBe(422);
    }
  });

  // 404 because /api/path doesn't exist by itself
  test('triggers validation error with no data', async () => {
    try {
      await axios.get('http://localhost:3000/api/path');
    } catch (e: any) {
      expect(e.status).toBe(404);
    }
  });
});
