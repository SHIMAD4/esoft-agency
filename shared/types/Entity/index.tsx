type Client = {
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string;
  type: string;
  user: {
    id: string;
    role: string;
  };
};

type Realtor = {
  type: string;
  fullName: string;
  dealShare: number;
  firstName: string;
  lastName: string;
  middleName: string;
  user: {
    id: string;
    role: string;
  };
};

type Estate = {
  id: number;
  type?: string; // Квартира / Дом / Земля
  // Address
  city: string; // Город
  street?: string; // Улица
  house?: string; // Дом
  apartment?: string; // Квартира
  // Coordinates
  latitude: number; // Широта
  longitude: number; // Долгота
  // Apartment property
  floor?: number; // Этаж
  rooms?: number; // Кол-во комнат
  // Area property
  area?: number; // Площадь земли
  entity: 'estate';
};

export { Client, Realtor, Estate };
