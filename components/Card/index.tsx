import { View, Text } from 'react-native';
import { FC } from 'react';
import { Client, Realtor, Estate, Offer, Demand, Deal } from '@/shared/types';
import { EntityType, EstateType } from '@/scripts/constants';

type CardProps = {
  dt: Client | Realtor | Estate | Offer | Demand | Deal;
  onPress: () => void;
  entity: string;
};

type UserCardProps = {
  dt: Client;
  onPress: () => void;
};

type RealtorCardProps = {
  dt: Realtor;
  onPress: () => void;
};

type EstateCardProps = {
  dt: Estate;
  onPress: () => void;
};

type DealCardProps = {
  dt: Deal;
  onPress: () => void;
};

type OfferCardProps = {
  dt: Offer;
  onPress: () => void;
};

type DemandCardProps = {
  dt: Demand;
  onPress: () => void;
};

export const Card: FC<CardProps> = ({ dt, onPress, entity }) => {
  switch (entity) {
    case EntityType.CLIENT:
      return <UserCard dt={dt as Client} onPress={onPress} />;
    case EntityType.REALTOR:
      return <RealtorCard dt={dt as Realtor} onPress={onPress} />;
    case EntityType.ESTATE:
      return <EstateCard dt={dt as Estate} onPress={onPress} />;
    case EntityType.DEAL:
      return <DealCard dt={dt as Deal} onPress={onPress} />;
    case EntityType.OFFER:
      return <OfferCard dt={dt as Offer} onPress={onPress} />;
    case EntityType.DEMAND:
      return <DemandCard dt={dt as Demand} onPress={onPress} />;
  }
};

const UserCard: FC<UserCardProps> = ({ dt, onPress }) => {
  const { firstName, lastName, middleName, phone, email } = dt;
  const fullName = `${firstName} ${middleName} ${lastName}`;

  return (
    <View className="w-full bg-[#f5f4f8] p-4 mb-2 rounded-[3px]" onTouchStart={onPress}>
      <Text className="text-[16px] font-semibold mb-4">{fullName}</Text>
      {phone && <Text className="text-[#546E7A] text-[12px] font-[400]">{phone}</Text>}
      {email && <Text className="text-[#546E7A] text-[12px] font-[400] mt-[8px]">{email}</Text>}
    </View>
  );
};

const RealtorCard: FC<RealtorCardProps> = ({ dt, onPress }) => {
  const { firstName, lastName, middleName, dealShare } = dt;
  const fullName = `${firstName} ${middleName} ${lastName}`;

  return (
    <View className="w-full bg-[#f5f4f8] p-4 mb-2 rounded-[3px]" onTouchStart={onPress}>
      <Text className="text-[16px] font-semibold mb-4">{fullName}</Text>
      <Text className="text-[#546E7A] text-[12px] font-[400]">Комиссия: {dealShare}%</Text>
    </View>
  );
};

const EstateCard: FC<EstateCardProps> = ({ dt, onPress }) => {
  const { id, addressCity, addressHouse, addressNumber, addressStreet, latitude, longitude, data } =
    dt;
  const { floor, totalArea, totalRooms, type } = data;

  return (
    <View className="w-full bg-[#f5f4f8] p-4 mb-2 rounded-[3px]" onTouchStart={onPress}>
      <Text className="text-[16px] font-semibold mb-4">
        {addressStreet ?? `Недвижимость#${id}`}
      </Text>
      {type && (
        <Text className="text-[#546E7A] text-[12px] font-[400]">
          Тип:{' '}
          {(type === EstateType.APARTMENT && 'Квартира') ||
            (type === EstateType.HOUSE && 'Дом') ||
            (type === EstateType.LAND && 'Земля')}
        </Text>
      )}
      <Text className="text-[#546E7A] text-[12px] font-[400]">
        Координаты: {latitude}, {longitude}
      </Text>
      <Text className="text-[#546E7A] text-[12px] font-[400]">
        Адрес: {addressCity}
        {addressStreet && `, ул. ${addressStreet}`}
        {addressHouse && `, дом ${addressHouse}`}
        {addressNumber && `, кв. ${addressNumber}`}
      </Text>
      {floor && <Text className="text-[#546E7A] text-[12px] font-[400]">Этаж: {floor}</Text>}
      {totalRooms && (
        <Text className="text-[#546E7A] text-[12px] font-[400]">
          Количество комнат: {totalRooms}
        </Text>
      )}
      {totalArea && (
        <Text className="text-[#546E7A] text-[12px] font-[400]">Площадь: {totalArea}</Text>
      )}
    </View>
  );
};

const DealCard: FC<DealCardProps> = ({ dt, onPress }) => {
  const { estate, name, seller, companyDeduction, buyer } = dt;

  return (
    <View className="w-full bg-[#f5f4f8] p-4 mb-2 rounded-[3px]" onTouchStart={onPress}>
      <Text className="text-[16px] font-semibold mb-4">{name}</Text>
      <Text className="text-[#546E7A] text-[12px] font-[400] mb-2">
        Стоимость объекта: {estate.price}
      </Text>
      {estate.type && (
        <Text className="text-[#546E7A] text-[12px] font-[400] mb-2">
          Тип:{' '}
          {(estate.type === EstateType.APARTMENT && 'Квартира') ||
            (estate.type === EstateType.HOUSE && 'Дом') ||
            (estate.type === EstateType.LAND && 'Земля')}
        </Text>
      )}
      <Text className="text-[#546E7A] text-[12px] font-[400] mb-2">
        Стоимость клиента-продавца: {seller.cost}
      </Text>
      <Text className="text-[#546E7A] text-[12px] font-[400] mb-2">
        Стоимость клиента-покупателя: {buyer.cost}
      </Text>
      <Text className="text-[#546E7A] text-[12px] font-[400] mb-2">
        Комиссия риэлтора клиента-продавца: {seller.commission}
      </Text>
      <Text className="text-[#546E7A] text-[12px] font-[400] mb-2">
        Комиссия риэлтора клиента-покупателя: {buyer.commission}
      </Text>
      <Text className="text-[#546E7A] text-[12px] font-[400] mb-2">
        Отчисление компании: {companyDeduction}
      </Text>
    </View>
  );
};

const OfferCard: FC<OfferCardProps> = ({ dt, onPress }) => {
  const { client, realtor, estate, price } = dt;
  const label = estate.addressStreet;
  const clientFullName = `${client.firstName} ${client.middleName}`;
  const realtorFullName = `${realtor.firstName} ${realtor.middleName}`;

  return (
    <View className="w-full bg-[#f5f4f8] p-4 mb-2 rounded-[3px]" onTouchStart={onPress}>
      <Text className="text-[16px] font-semibold mb-4">{label}</Text>
      <Text className="text-[#546E7A] text-[12px] font-[400] mb-2">Клиент: {clientFullName}</Text>
      <Text className="text-[#546E7A] text-[12px] font-[400] mb-2">Риэлтор: {realtorFullName}</Text>
      <Text className="text-[#546E7A] text-[12px] font-[400]">Цена: {price} рублей</Text>
    </View>
  );
};

const DemandCard: FC<DemandCardProps> = ({ dt, onPress }) => {
  const {
    name,
    client,
    realtor,
    estateType,
    minPrice,
    maxPrice,
    minRooms,
    maxRooms,
    minArea,
    maxArea,
    minFloors,
    maxFloors,
    minFloor,
    maxFloor,
  } = dt;
  let clientFullName = `${client.firstName} ${client.middleName}`;
  let realtorFullName = `${realtor.firstName} ${realtor.middleName}`;
  let estate =
    (estateType === EstateType.APARTMENT && 'Квартира') ||
    (estateType === EstateType.HOUSE && 'Дом') ||
    (estateType === EstateType.LAND && 'Земля');

  return (
    <View className="w-full bg-[#f5f4f8] p-4 mb-2 rounded-[3px]" onTouchStart={onPress}>
      <Text className="text-[16px] font-semibold mb-4">{name}</Text>
      <Text className="text-[#546E7A] text-[12px] font-[400] mb-2">Клиент: {clientFullName}</Text>
      <Text className="text-[#546E7A] text-[12px] font-[400] mb-2">Риэлтор: {realtorFullName}</Text>
      <Text className="text-[#546E7A] text-[12px] font-[400] mb-2">Тип объекта: {estate}</Text>
      {minPrice ? (
        <Text className="text-[#546E7A] text-[12px] font-[400] mb-2">
          Мин. цена: {minPrice} рублей
        </Text>
      ) : null}
      {maxPrice ? (
        <Text className="text-[#546E7A] text-[12px] font-[400] mb-2">
          Макс. цена: {maxPrice} рублей
        </Text>
      ) : null}
      {minFloor ? (
        <Text className="text-[#546E7A] text-[12px] font-[400] mb-2">Мин. этаж: {minFloor}</Text>
      ) : null}
      {maxFloor ? (
        <Text className="text-[#546E7A] text-[12px] font-[400] mb-2">Макс. этаж: {maxFloor}</Text>
      ) : null}
      {minRooms ? (
        <Text className="text-[#546E7A] text-[12px] font-[400] mb-2">
          Мин. кол-во комнат: {minRooms}
        </Text>
      ) : null}
      {maxRooms ? (
        <Text className="text-[#546E7A] text-[12px] font-[400] mb-2">
          Макс. кол-во комнат: {maxRooms}
        </Text>
      ) : null}
      {minFloors ? (
        <Text className="text-[#546E7A] text-[12px] font-[400] mb-2">
          Мин. этажность: {minFloors}
        </Text>
      ) : null}
      {maxFloors ? (
        <Text className="text-[#546E7A] text-[12px] font-[400] mb-2">
          Макс. этажность: {maxFloors}
        </Text>
      ) : null}
      {minArea ? (
        <Text className="text-[#546E7A] text-[12px] font-[400] mb-2">Мин. площадь: {minArea}</Text>
      ) : null}
      {maxArea ? (
        <Text className="text-[#546E7A] text-[12px] font-[400]">Макс. площадь: {maxArea}</Text>
      ) : null}
    </View>
  );
};
