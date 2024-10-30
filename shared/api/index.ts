import axios from 'axios';
import { Demand, Offer } from '@/shared/types';

export const ApiInstance = axios.create({
  baseURL: 'http://esoft.api.miv-dev.ru:8000/',
});

const appBlock = {
  // User (Client | Realtor)
  getUserById: (id: string) => ApiInstance.get(`/users/${id}`),
  deleteUserById: (id: string) => ApiInstance.delete(`/users/${id}`),
  // Estate
  getEstateById: (id: string) => ApiInstance.get(`/real-state/${id}`),
  deleteEstateById: (id: string) => ApiInstance.delete(`/real-state/${id}`),
  // Offer
  getOfferById: (id: string) => ApiInstance.get(`/offers/${id}`),
  deleteOfferById: (id: string) => ApiInstance.delete(`/offers/${id}`),
  // Demand
  getDemandById: (id: string) => ApiInstance.get(`/demands/${id}`),
  deleteDemandById: (id: string) => ApiInstance.delete(`/demands/${id}`),
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
  searchEstateByParameters: (parameters: string) =>
    ApiInstance.get(`/real-state/search?${parameters}`),
  searchEstate: (query: string) => ApiInstance.get(`/real-state/search?query=${query}`),
  getFilters: () => ApiInstance.get('/real-state/filters'),
};

// ====== Offer ======

type OfferData = {
  client: string;
  realtor: string;
  realState: string;
  price: string;
};

const offerBlock = {
  getAllOffers: () =>
    ApiInstance.get('/offers').then(({ data }) => {
      return data.map((item: Offer) => {
        return {
          type: 'OFFER',
          ...item,
        };
      });
    }),
  getOfferByUserId: (id: string) => {
    return ApiInstance.get(`/offers?user-id=${id}`).then(({ data }) => {
      return data.map((item: Offer) => {
        return {
          type: 'OFFER',
          ...item,
        };
      });
    });
  },
  addOffer: (data: OfferData) => {
    const formattedData = {
      ...data,
      price: +data.price,
    };

    return ApiInstance.post('/offers', formattedData);
  },
  editOffer: (id: string, data: OfferData) => {
    const formattedData = {
      ...data,
      price: +data.price,
    };

    return ApiInstance.put(`/offers/${id}`, formattedData);
  },
};

// ====== Demand ======

type DemandData = {
  client: string;
  realtor: string;
  estateType: string;
  minPrice: string;
  maxPrice: string;
  minFloor: string;
  maxFloor: string;
  minFloors: string;
  maxFloors: string;
  minRooms: string;
  maxRooms: string;
  minArea: string;
  maxArea: string;
};

const demandBlock = {
  getAllDemands: () =>
    ApiInstance.get('/demands').then(({ data }) => {
      return data.map((item: Demand) => {
        return {
          type: 'DEMAND',
          ...item,
        };
      });
    }),
  getDemandByUserId: (id: string) => {
    return ApiInstance.get(`/demands?user-id=${id}`).then(({ data }) => {
      return data.map((item: Demand) => {
        return {
          type: 'DEMAND',
          ...item,
        };
      });
    });
  },
  addDemand: (data: DemandData) => {
    const formattedData = {
      ...data,
      minPrice: +data.minPrice,
      maxPrice: +data.maxPrice,
      minFloor: +data.minFloor,
      maxFloor: +data.maxFloor,
      minFloors: +data.minFloors,
      maxFloors: +data.maxFloors,
      minRooms: +data.minRooms,
      maxRooms: +data.maxRooms,
      minArea: +data.minArea,
      maxArea: +data.maxArea,
    };

    return ApiInstance.post('/demands', formattedData);
  },
  editDemand: (id: string, data: DemandData) => {
    const formattedData = {
      ...data,
      minPrice: +data.minPrice,
      maxPrice: +data.maxPrice,
      minFloor: +data.minFloor,
      maxFloor: +data.maxFloor,
      minFloors: +data.minFloors,
      maxFloors: +data.maxFloors,
      minRooms: +data.minRooms,
      maxRooms: +data.maxRooms,
      minArea: +data.minArea,
      maxArea: +data.maxArea,
    };

    return ApiInstance.put(`/demands/${id}`, formattedData);
  },
};

export const API = {
  appBlock,
  clientBlock,
  realtorBlock,
  estateBlock,
  offerBlock,
  demandBlock,
};
