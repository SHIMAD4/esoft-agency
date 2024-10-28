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

// ====== Client ======

type ClientData = {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  phone: string;
};

const clientBlock = {
  getAllUsers: () => ApiInstance.get('/users/search?role=CLIENT'),
  searchClient: (query: string) => ApiInstance.get(`/users/search?query=${query}&role=CLIENT`),
  addClient: (data: ClientData) => ApiInstance.post('/users/client', data),
  editClient: (id: string, data: ClientData) => ApiInstance.put(`/users/client/${id}`, data),
};

// ====== Realtor ======

type RealtorData = {
  firstName: string;
  lastName: string;
  middleName: string;
  dealShare: string;
};

const realtorBlock = {
  getAllUsers: () => ApiInstance.get('/users/search?role=REALTOR'),
  searchRealtor: (query: string) => ApiInstance.get(`/users/search?query=${query}&role=REALTOR`),
  addRealtor: (data: RealtorData) => ApiInstance.post('/users/realtor', data),
  editRealtor: (id: string, data: RealtorData) => ApiInstance.put(`/users/realtor/${id}`, data),
};

// ====== Estate ======

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

type EstateFormattedData = {
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
};

const estateBlock = {
  getAllEstates: () => ApiInstance.get('/real-state/search'),
  addEstate: (data: EstateData) => {
    const formattedData: EstateFormattedData = {
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
    const formattedData: EstateFormattedData = {
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
  searchEstate: (query: string) => ApiInstance.get(`/real-state/search?${query}`),
  getFilters: () => ApiInstance.get('/real-state/filters'),
};

export const API = {
  appBlock,
  clientBlock,
  realtorBlock,
  estateBlock,
};
