import { View, Text } from 'react-native';
import { FC } from 'react';
import { Client, Realtor, Estate } from '@/shared/types';

type CardProps = {
  data: Client | Realtor /*| Estate*/;
  onPress: () => void;
  entity: string;
};

type UserCardProps = {
  data: Client;
  onPress: () => void;
};

type RealtorCardProps = {
  data: Realtor;
  onPress: () => void;
};

// type EstateCardProps = {
//   data: Estate;
//   onPress: () => void;
// };

export const Card: FC<CardProps> = ({ data, onPress, entity }) => {
  switch (entity) {
    case 'Client':
      return <UserCard data={data as Client} onPress={onPress} />;
    case 'Realtor':
      return <RealtorCard data={data as Realtor} onPress={onPress} />;
    // case 'estate':
    //   return <EstateCard data={data as Estate} onPress={onPress} />;
  }
};

const UserCard: FC<UserCardProps> = ({ data, onPress }) => {
  const { firstName, lastName, middleName, phone, email } = data;
  const fullName = `${firstName} ${middleName} ${lastName}`;

  return (
    <View className="w-full bg-[#f5f4f8] p-4 mb-2 rounded-[3px]" onTouchStart={onPress}>
      <Text className="text-[16px] font-semibold mb-4">{fullName}</Text>
      {phone && <Text className="text-[#546E7A] text-[12px] font-[400]">{phone}</Text>}
      {email && <Text className="text-[#546E7A] text-[12px] font-[400] mt-[8px]">{email}</Text>}
    </View>
  );
};

const RealtorCard: FC<RealtorCardProps> = ({ data, onPress }) => {
  const { firstName, lastName, middleName, dealShare } = data;
  const fullName = `${firstName} ${middleName} ${lastName}`;

  return (
    <View className="w-full bg-[#f5f4f8] p-4 mb-2 rounded-[3px]" onTouchStart={onPress}>
      <Text className="text-[16px] font-semibold mb-4">{fullName}</Text>
      <Text className="text-[#546E7A] text-[12px] font-[400]">Комиссия: {dealShare}%</Text>
    </View>
  );
};

// const EstateCard: FC<EstateCardProps> = ({ data, onPress }) => {
//   const { id, type } = data;
//   const { city, street, house, apartment } = data;
//   const { latitude, longitude } = data;
//   const { floor, rooms } = data;
//   const { area } = data;
//
//   return (
//     <View className="w-full bg-[#f5f4f8] p-4 mb-2 rounded-[3px]" onTouchStart={onPress}>
//       <Text className="text-[16px] font-semibold mb-4">{street ?? `Недвижимость#${id}`}</Text>
//       {type && <Text className="text-[#546E7A] text-[12px] font-[400]">Тип: {type}</Text>}
//       <Text className="text-[#546E7A] text-[12px] font-[400]">
//         Координаты: {latitude}, {longitude}
//       </Text>
//       <Text className="text-[#546E7A] text-[12px] font-[400]">
//         Адрес: {city}
//         {street && `, ул. ${street}`}
//         {house && `, дом ${house}`}
//         {apartment && `, кв. ${apartment}`}
//       </Text>
//       {floor && <Text className="text-[#546E7A] text-[12px] font-[400]">Этаж: {floor}</Text>}
//       {rooms && (
//         <Text className="text-[#546E7A] text-[12px] font-[400]">Количество комнат: {rooms}</Text>
//       )}
//       {area && <Text className="text-[#546E7A] text-[12px] font-[400]">Площадь: {area}</Text>}
//     </View>
//   );
// };
