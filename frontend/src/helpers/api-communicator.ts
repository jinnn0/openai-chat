import axios from 'axios';

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post('/user/login', { email, password });

  if (res.status !== 200) {
    throw new Error('Unable to login');
  }
  const data = await res.data;
  return data;
};

export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axios.post('/user/signup', { name, email, password });

  if (res.status !== 201) {
    throw new Error('Unable to Signup');
  }
  const data = await res.data;
  return data;
};

export const checkAuthStatus = async () => {
  const res = await axios.get('/user/auth');

  // const res = await fetch('http://localhost:3000/api/v1/user/auth');
  // .then((res) => {
  //   return res.json(); // return statement
  // })
  // .then((data) => console.log('Data: ', data)); // proper error message

  // console.log('checkAuthStatus res', res);

  if (res.status !== 200) {
    throw new Error('Unable to authenticate');
  }
  const data = await res.data;
  // const data = await res.json();
  return data;
};

export const sendChatRequest = async (message: string) => {
  const res = await axios.post('/chat/new', { message });

  if (res.status !== 200) {
    throw new Error('Unable to send chat');
  }
  const data = await res.data;
  return data;
};

export const getUserChats = async () => {
  const res = await axios.get('/chat/all-chats');

  if (res.status !== 200) {
    throw new Error('Unable to send chat');
  }
  const data = await res.data;
  return data;
};

export const deleteUserChats = async () => {
  const res = await axios.delete('/chat/delete');

  if (res.status !== 200) {
    throw new Error('Unable to delete chats');
  }
  const data = await res.data;
  return data;
};

export const logoutUser = async () => {
  const res = await axios.get('/user/logout');

  if (res.status !== 200) {
    throw new Error('Unable to delete chats');
  }
  const data = await res.data;
  return data;
};
