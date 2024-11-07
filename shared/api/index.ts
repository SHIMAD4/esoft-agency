import axios from 'axios';
import { Demand, Offer } from '@/shared/types';
import {
  ClientData,
  DealData,
  DemandData,
  EstateData,
  EstateFormattedData,
  EventData,
  OfferData,
  RealtorData,
} from '@/shared/types/Api';

export const ApiInstance = axios.create({
  baseURL: 'http://esoft.api.miv-dev.ru:8000/',
});

const appBlock = {
  // User (Client | Realtor)
  getUserById: (id: string) => ApiInstance.get(`/users/${id}`),
  deleteUserById: (id: string) => ApiInstance.delete(`/users/${id}`),
};

// ====== Client ======

const clientBlock = {
  getAllUsers: () => ApiInstance.get('/users/search?role=CLIENT'),
  searchClient: (query: string) => ApiInstance.get(`/users/search?query=${query}&role=CLIENT`),
  addClient: (data: ClientData) => ApiInstance.post('/users/client', data),
  editClient: (id: string, data: ClientData) => ApiInstance.put(`/users/client/${id}`, data),
};

// ====== Realtor ======

const realtorBlock = {
  getAllUsers: () => ApiInstance.get('/users/search?role=REALTOR'),
  searchRealtor: (query: string) => ApiInstance.get(`/users/search?query=${query}&role=REALTOR`),
  addRealtor: (data: RealtorData) => ApiInstance.post('/users/realtor', data),
  editRealtor: (id: string, data: RealtorData) => ApiInstance.put(`/users/realtor/${id}`, data),
};

// ====== Estate ======

const estateBlock = {
  getAllEstates: () => ApiInstance.get('/real-state/search'),
  getEstateById: (id: string) => ApiInstance.get(`/real-state/${id}`),
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
  deleteEstateById: (id: string) => ApiInstance.delete(`/real-state/${id}`),
  searchEstateByParameters: (parameters: string) =>
    ApiInstance.get(`/real-state/search?${parameters}`),
  searchEstate: (query: string) => ApiInstance.get(`/real-state/search?query=${query}`),
  getFilters: () => ApiInstance.get('/real-state/filters'),
};

// ====== Deal ======

const dealBlock = {
  getAllDeals: () => ApiInstance.get('/deals'),
  addDeal: (data: DealData) => ApiInstance.post('/deals', data),
  editDeal: (id: string, data: DealData) => ApiInstance.put(`/deals/${id}`, data),
  getDealById: (id: string) => ApiInstance.get(`/deals/${id}`),
  deleteDealById: (id: string) => ApiInstance.delete(`/deals/${id}`),
};

// ====== Offer ======

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
  getOfferById: (id: string) => ApiInstance.get(`/offers/${id}`),
  getAllOffersWithoutDeals: () => ApiInstance.get('/offers?without-deals=true'),
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
  getOffersByDemandId: (id: string) =>
    ApiInstance.get(`/offers?without-deals=true&demand-id=${id}`),
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
  deleteOfferById: (id: string) => ApiInstance.delete(`/offers/${id}`),
};

// ====== Demand ======

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
  getDemandById: (id: string) => ApiInstance.get(`/demands/${id}`),
  getAllDemandsWithoutDeals: () => ApiInstance.get('/demands?without-deals=true'),
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
  getDemandsByOfferId: (id: string) =>
    ApiInstance.get(`/demands?without-deals=true&offer-id=${id}`),
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
  deleteDemandById: (id: string) => ApiInstance.delete(`/demands/${id}`),
};

// ====== Event ======

const eventBlock = {
  getAllEvents: () => ApiInstance.get('/events/grouped'),
  getAllUpcomingEvents: () => ApiInstance.get('/events?upcoming=true'),
  getEventById: (id: string) => ApiInstance.get(`/events/${id}`),
  addEvent: (data: EventData) => ApiInstance.post('/events', data),
  editEvent: (id: string, data: EventData) => ApiInstance.put(`/events/${id}`, data),
  deleteEventById: (id: string) => ApiInstance.delete(`/events/${id}`),
};

export const API = {
  appBlock,
  clientBlock,
  realtorBlock,
  estateBlock,
  dealBlock,
  offerBlock,
  demandBlock,
  eventBlock,
};
