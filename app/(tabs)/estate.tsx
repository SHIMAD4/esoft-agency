// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Header, Icons, Input, Button, CardList } from '@/components';
// import { router } from 'expo-router';
// import { Estate } from '@/shared/types';
// import { View } from 'react-native';
//
// export default function EstatePage() {
//   const handleAddClientClick = () => {
//     router.navigate('../estate/addPage');
//   };
//
//   const handleFilterClick = () => {
//     router.navigate('../estate/filterPage');
//   };
//
//   // TODO: Убрать моковые данные
//   const estates: Estate[] = [
//     {
//       id: 1,
//       latitude: 57,
//       longitude: 89,
//       city: 'Тюмень',
//       street: 'Энергостроителей',
//       house: '2',
//       apartment: '43',
//       entity: 'estate',
//     },
//     {
//       id: 2,
//       type: 'Квартира',
//       latitude: 32,
//       longitude: 128,
//       city: 'Тюмень',
//       floor: 12,
//       rooms: 3,
//       area: 92,
//       entity: 'estate',
//     },
//     {
//       id: 3,
//       type: 'Земля',
//       street: 'Алексеевский хутор',
//       latitude: 34,
//       longitude: 176,
//       city: 'Тюмень',
//       area: 92,
//       entity: 'estate',
//     },
//   ];
//
//   // TODO: Нужно брать недвижимость из БД (Жду бэк)
//   return (
//     <>
//       <SafeAreaView className="mx-6 mt-6">
//         <Header
//           title="Недвижимость"
//           icon={<Icons.ArrowIcon rotateToLeft={true} size={16} />}
//           link="/(tabs)"
//         />
//         <Input variant="search" placeholder="Поиск недвижимости" style={{ marginBottom: 24 }} />
//         <View className="flex flex-row justify-between items-center" style={{ marginBottom: 16 }}>
//           <Button variant="add" onPress={handleAddClientClick} />
//           <Button variant="filter" onPress={handleFilterClick} />
//         </View>
//       </SafeAreaView>
//       <View className="flex-1 mx-6">
//         <CardList entity="estate" data={estates} />
//       </View>
//     </>
//   );
// }
