import React, { createContext, useContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const useUserContext = () => {
    return useContext(UserContext);
  };

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(() => localStorage.getItem('userId') || null);
  const [username, setUsername] = useState(() => localStorage.getItem('username') || '');
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem('loggedIn') === 'true');

  const updateUser = (id, name, isLoggedIn) => {
    setUserId(id);
    setUsername(name);
    setLoggedIn(isLoggedIn);
    localStorage.setItem('userId', id);
    localStorage.setItem('username', name);
    localStorage.setItem('loggedIn', isLoggedIn ? 'true' : 'false');
  };

  const logoutUser = () => {
    setUserId(null);
    setUsername('');
    setLoggedIn(false);
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('loggedIn');
  };


  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedUsername = localStorage.getItem('username');
    const storedLoggedIn = localStorage.getItem('loggedIn') === 'true';

    if (storedUserId && storedUsername && storedLoggedIn) {
      setUserId(storedUserId);
      setUsername(storedUsername);
      setLoggedIn(storedLoggedIn);
    }
  }, []);


  return (
    <UserContext.Provider value={{ userId, username, loggedIn, updateUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
