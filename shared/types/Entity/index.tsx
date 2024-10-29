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

type Offer = {
  type?: string;
  id: string;
  client: Client;
  realtor: Realtor;
  estate: Estate;
  price: number;
};

export { Client, Realtor, Estate, Offer };
