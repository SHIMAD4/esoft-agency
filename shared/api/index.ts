import axios from 'axios';

export const ApiInstance = axios.create({
  baseURL: 'http://esoft.api.miv-dev.ru:8000/',
});

const appBlock = {
  getUserById: (id: string) => ApiInstance.get(`/users/${id}`),
  deleteUserById: (id: string) => ApiInstance.delete(`/users/${id}`),
};

const clientBlock = {
  getAllUsers: () => ApiInstance.get('/users/search?role=CLIENT'),
  addClient: (data: {
    firstName: string;
    lastName: string;
    middleName: string;
    email: string;
    phone: string;
  }) => ApiInstance.post('/users/client', data),
};

const realtorBlock = {
  getAllUsers: () => ApiInstance.get('/users/search?role=REALTOR'),
  addRealtor: (data: {
    firstName: string;
    lastName: string;
    middleName: string;
    dealShare: string;
  }) => ApiInstance.post('/users/realtor', data),
};

export const API = {
  appBlock,
  clientBlock,
  realtorBlock,
};
