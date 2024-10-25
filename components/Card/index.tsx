import { View, Text } from 'react-native';
import { FC } from 'react';
import { Client, Realtor, Estate } from '@/shared/types';
import { EntityType } from '@/scripts/constants';

type CardProps = {
  dt: Client | Realtor | Estate;
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

export const Card: FC<CardProps> = ({ dt, onPress, entity }) => {
  switch (entity) {
    case EntityType.CLIENT:
      return <UserCard dt={dt as Client} onPress={onPress} />;
    case EntityType.REALTOR:
      return <RealtorCard dt={dt as Realtor} onPress={onPress} />;
    case EntityType.ESTATE:
      return <EstateCard dt={dt as Estate} onPress={onPress} />;
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
      {type && <Text className="text-[#546E7A] text-[12px] font-[400]">Тип: {type}</Text>}
      <Text className="text-[#546E7A] text-[12px] font-[400]">
        Координаты: {latitude.toFixed()}, {longitude.toFixed()}
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
