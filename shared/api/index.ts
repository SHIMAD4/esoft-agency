import axios from 'axios';

export const ApiInstance = axios.create({
  baseURL: 'http://esoft.api.miv-dev.ru:8000/',
});

const appBlock = {
  getUserById: (id: string) => ApiInstance.get(`/users/${id}`),
  deleteUserById: (id: string) => ApiInstance.delete(`/users/${id}`),
  getEstateById: (id: string) => ApiInstance.get(`/real-state/${id}`),
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

const estateBlock = {
  getAllEstates: () => ApiInstance.get('/real-state/search?'),
  editEstate: (
    id: string,
    data: {
      type: string;
      addressCity: string;
      addressStreet: string;
      addressHouse: string;
      addressNumber: string;
      latitude: number;
      longitude: number;
      floor: number;
      totalFloors: number;
      totalRooms: number;
      totalArea: number;
      dataType: string;
    },
  ) => {
    const formattedData = {
      type: data.dataType,
      addressCity: data.addressCity,
      addressStreet: data.addressStreet,
      addressHouse: data.addressHouse,
      addressNumber: data.addressNumber,
      latitude: data.latitude,
      longitude: data.longitude,
      floor: data.floor,
      totalFloors: data.totalFloors,
      totalRooms: data.totalRooms,
      totalArea: data.totalArea,
    };

    console.log(formattedData);

    return ApiInstance.put(`/real-state/${id}`, formattedData);
  },
};

export const API = {
  appBlock,
  clientBlock,
  realtorBlock,
  estateBlock,
};
