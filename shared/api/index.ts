import axios from 'axios';

export const ApiInstance = axios.create({
  baseURL: 'http://esoft.api.miv-dev.ru:8000/',
});

const clientBlock = {
  getAllUsers: () => ApiInstance.get('/users/search?role=CLIENT'),
};

const realtorBlock = {
  getAllUsers: () => ApiInstance.get('/users/search?role=REALTOR'),
};

export const API = {
  clientBlock,
  realtorBlock,
};
