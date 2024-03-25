require('dotenv').config();

const request = require('supertest');
const app = require('../index'); // Adjust the path to where your Express app is exported

describe('User API Endpoints', () => {
  // Tests for GET /users
  it('should return a list of users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should return an empty array when no users exist', async () => {
    const res = await request(app).get('/users');
    // Assuming the database is empty or this is a mocked response
    expect(res.body).toEqual([]);
  });

  // Tests for POST /users
  it('should create a new user', async () => {
    const userData = { name: 'Jane Doe', email: 'jane@example.com' };
    const res = await request(app)
      .post('/users')
      .send(userData);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User added successfully');
  });

  it('should return 400 for invalid user data', async () => {
    const userData = {}; // Missing required fields
    const res = await request(app)
      .post('/users')
      .send(userData);
    expect(res.statusCode).toEqual(400); // Assuming you have validation that returns 400 for bad requests
  });

  // Additional POST /users tests for different validation scenarios
  it('should not allow duplicate emails', async () => {
    const userData = { name: 'Jane Doe', email: 'duplicate@example.com' };
    // First request to create a user
    await request(app).post('/users').send(userData);
    // Second request with the same email
    const res = await request(app).post('/users').send(userData);
    expect(res.statusCode).toEqual(400); // Assuming your application logic prevents duplicate emails
  });

  // Assuming there are validation rules you want to test
  it('should require a name field', async () => {
    const userData = { email: 'noName@example.com' };
    const res = await request(app)
      .post('/users')
      .send(userData);
    expect(res.statusCode).toEqual(400); // Adjust based on your validation logic
  });

  it('should require an email field', async () => {
    const userData = { name: 'No Email' };
    const res = await request(app)
      .post('/users')
      .send(userData);
    expect(res.statusCode).toEqual(400); // Adjust based on your validation logic
  });

  // Testing edge cases or additional scenarios
  it('should handle unexpected fields gracefully', async () => {
    const userData = { name: 'John Doe', email: 'john@example.com', unexpectedField: 'unexpected' };
    const res = await request(app)
      .post('/users')
      .send(userData);
    expect(res.statusCode).toEqual(201); // Assuming unexpected fields are ignored
  });

  it('should not accept users without an email', async () => {
    const userData = { name: 'No Email User' };
    const res = await request(app)
      .post('/users')
      .send(userData);
    expect(res.statusCode).toEqual(400); // Assuming email is required
  });

  it('should return a meaningful error message for invalid requests', async () => {
    const userData = {}; // Invalid user data
    const res = await request(app)
      .post('/users')
      .send(userData);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBeTruthy(); // Adjust based on how your app handles validation errors
  });
});
