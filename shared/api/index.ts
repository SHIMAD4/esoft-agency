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
  searchClient: (query: string) => ApiInstance.get(`/users/search?query=${query}&role=CLIENT`),
  addClient: (data: {
    firstName: string;
    lastName: string;
    middleName: string;
    email: string;
    phone: string;
  }) => ApiInstance.post('/users/client', data),
  editClient: (
    id: string,
    data: {
      firstName: string;
      lastName: string;
      middleName: string;
      email: string;
      phone: string;
    },
  ) => ApiInstance.put(`/users/client/${id}`, data),
};

const realtorBlock = {
  getAllUsers: () => ApiInstance.get('/users/search?role=REALTOR'),
  searchRealtor: (query: string) => ApiInstance.get(`/users/search?query=${query}&role=REALTOR`),
  addRealtor: (data: {
    firstName: string;
    lastName: string;
    middleName: string;
    dealShare: string;
  }) => ApiInstance.post('/users/realtor', data),
  editRealtor: (
    id: string,
    data: {
      firstName: string;
      lastName: string;
      middleName: string;
      dealShare: string;
    },
  ) => ApiInstance.put(`/users/realtor/${id}`, data),
};

export const API = {
  appBlock,
  clientBlock,
  realtorBlock,
};
