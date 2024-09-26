const app = require('../app');
const request = require('supertest');

it('Test delete dish functionality', async () => {
  const response = await request(app).delete('/dishes').send({ id: 1 });
  if (response.statusCode == 200) {
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Successfully deleted dish');
  }

  if (response.statusCode == 404) {
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message', 'No dish with provided id exists');
  }
})