import { EventType } from '@/shared/types';

type ClientData = {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  phone: string;
};

type RealtorData = {
  firstName: string;
  lastName: string;
  middleName: string;
  dealShare: string;
};

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

type DealData = {
  demandId: string;
  offerId: string;
};

type OfferData = {
  client: string;
  realtor: string;
  realState: string;
  price: string;
};

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

type EventData = {
  name: string | null;
  startDate: string;
  startTime: string;
  endDate: string | null;
  endTime: string | null;
  type: string;
  comment: string | null;
};

type GroupedEvents = Record<string, EventType[]>;

export {
  ClientData,
  RealtorData,
  EstateData,
  EstateFormattedData,
  DealData,
  OfferData,
  DemandData,
  EventData,
  GroupedEvents,
};
