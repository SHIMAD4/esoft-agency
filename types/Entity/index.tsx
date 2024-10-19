type User = {
  id: number;
  fullName: string;
  telephone: string;
  email?: string;
  entity: 'user';
};

type Realtor = {
  id: number;
  fullName: string;
  percent: number;
  entity: 'realtor';
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

export { User, Realtor, Estate };
