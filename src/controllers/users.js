import { executeCqlQuery } from '../cassandraQuery.js';

export const addUser = (req, res) => {
    const { id, name, email } = req.body;
    const query = 'INSERT INTO users (id, name, email) VALUES (?, ?, ?)';
    const errorMessage = 'Failed to upsert user.';
    executeCqlQuery(query, [id, name, email], res, errorMessage);
  };
  
export const getUsers = (req, res) => {
    const query = 'SELECT name, email FROM users';
    const errorMessage = 'Failed to retrieve users.';
    executeCqlQuery(query, [], res, errorMessage);
  };