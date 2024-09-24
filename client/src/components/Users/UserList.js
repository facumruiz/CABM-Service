// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../../api';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetchUsers();
        setUsers(response.data);
  
      } catch (error) {
        console.log("error");
      
      }
    };
    getUsers();
  }, []);

  return (
    <div className="container">
      <h2>Users</h2>
      <ul className="list-group">
        {users.map(user => (
          <li key={user.id} className="list-group-item">{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
