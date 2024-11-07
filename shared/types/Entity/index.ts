type Client = {
  type: string;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  phone: string;
  id: string;
};

type Realtor = {
  type: string;
  firstName: string;
  lastName: string;
  middleName: string;
  fullName: string;
  dealShare: string;
  id: string;
};

type Estate = {
  type: string;
  id: string;
  districts: {
    id: number;
    name: string;
  }[];
  latitude: number;
  longitude: number;
  addressCity: string;
  addressHouse: string;
  addressNumber: string;
  addressStreet: string;
  data: {
    floor: number;
    totalFloors: number;
    totalArea: number;
    totalRooms: number;
    type: string;
  };
};

type Deal = {
  type: string;
  id: string;
  name: string;
  estate: {
    price: number;
    type: string;
  };
  buyer: {
    cost: number;
    commission: number;
  };
  seller: {
    cost: number;
    commission: number;
  };
  companyDeduction: number;
};

type Offer = {
  type?: string;
  id: string;
  client: Client;
  realtor: Realtor;
  estate: Estate;
  price: number;
};

type Demand = {
  name: string;
  type?: string;
  id: string;
  client: Client;
  realtor: Realtor;
  estateType: string;
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
  minRooms: number;
  maxRooms: number;
  minFloor: number;
  maxFloor: number;
  minFloors: number;
  maxFloors: number;
};

type EventData = {
  name: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  type: string;
  comment: string;
};

type EventType = {
  type: string;
  id: string;
  name: string;
  startAt: string;
  eventType: 'SHOW' | 'MEETING' | 'CALL';
  endAt: string;
  comment: string;
};

export { Client, Realtor, Estate, Offer, Demand, Deal, EventType, EventData };
