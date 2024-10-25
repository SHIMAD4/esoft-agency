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
  districts: [];
  latitude: number;
  longitude: number;
  addressCity: string;
  addressHouse: string;
  addressNumber: string;
  addressStreet: string;
  data: {
    floor: number;
    totalArea: number;
    totalRooms: number;
    type: string;
  };
};

export { Client, Realtor, Estate };
