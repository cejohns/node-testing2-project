const express = require('express');
const { getUsers, addUser } = require('./db'); // Importing database functions

const app = express();
const port = 3000;

app.use(express.json());

// Route to get all users
app.get('/users', async (req, res) => {
    try {
      const users = await getUsers();
      res.json(users);
    } catch (error) {
      console.error(error); // Make sure this line is there to log the error
      res.status(400).json({ error: 'Internal server error' });
    }
  });
  

// Route to add a new user
app.post('/users', async (req, res) => {
    try {
      const user = req.body;
      await addUser(user);
      res.status(201).json({ message: 'User added successfully' });
    } catch (error) {
      console.error(error); // Ensure this line is there for logging
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



module.exports = app;