import axios from 'axios';

export const ApiInstance = axios.create({
  baseURL: 'http://esoft.api.miv-dev.ru:8000/',
});

const appBlock = {
  getUserById: (id: string) => ApiInstance.get(`/users/${id}`),
  deleteUserById: (id: string) => ApiInstance.delete(`/users/${id}`),
  getEstateById: (id: string) => ApiInstance.get(`/real-state/${id}`),
  deleteEstateById: (id: string) => ApiInstance.delete(`/real-state/${id}`),
};

// === Client ===

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

// === Realtor ===

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

// === Estate ===

type EstateData = {
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
};

const estateBlock = {
  getAllEstates: () => ApiInstance.get('/real-state/search'),
  addEstate: (data: EstateData) => {
    const formattedData: {
      type: string;
      addressCity: string;
      addressStreet: string;
      addressHouse: string;
      addressNumber: string;
      latitude: number;
      longitude: number;
      floor?: number;
      totalFloors?: number;
      totalRooms?: number;
      totalArea?: number;
    } = {
      type: data.dataType,
      addressCity: data.addressCity,
      addressStreet: data.addressStreet,
      addressHouse: data.addressHouse,
      addressNumber: data.addressNumber,
      latitude: Number(data.latitude),
      longitude: Number(data.longitude),
    };

    if (data.floor) formattedData.floor = Number(data.floor);
    if (data.totalFloors) formattedData.totalFloors = Number(data.totalFloors);
    if (data.totalRooms) formattedData.totalRooms = Number(data.totalRooms);
    if (data.totalArea) formattedData.totalArea = Number(data.totalArea);

    return ApiInstance.post('/real-state', formattedData);
  },
  editEstate: (id: string, data: EstateData) => {
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

    return ApiInstance.put(`/real-state/${id}`, formattedData);
  },
  getFilters: () => {
    return ApiInstance.get('/real-state/filters');
  },
};

export const API = {
  appBlock,
  clientBlock,
  realtorBlock,
  estateBlock,
};
