import { SafeAreaView } from 'react-native-safe-area-context';
import { SceneMap } from 'react-native-tab-view';
import { useEffect, useState } from 'react';
import { Header, CustomTabView, Icons, OfferSlide, DemandSlide } from '@/components';
import { useGlobalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';
import { API } from '@/shared/api';
import { Client, Offer, Realtor, Demand } from '@/shared/types';
import { Image } from 'react-native';

export default function UserPage() {
  const [index, setIndex] = useState(0);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [demands, setDemands] = useState<Demand[]>([]);
  const [user, setUser] = useState<Client & Realtor>({
    dealShare: '',
    email: '',
    firstName: '',
    fullName: '',
    id: '',
    lastName: '',
    middleName: '',
    phone: '',
    type: '',
    avatar: '',
  });
  const { id } = useGlobalSearchParams();
  const [routes] = useState([
    { key: 'first', title: 'Предложение' },
    { key: 'second', title: 'Потребность' },
  ]);

  useEffect(() => {
    API.appBlock.getUserById(id as string).then(({ data }) => setUser(data));
    API.offerBlock.getOfferByUserId(id as string).then((data) => setOffers(data));
    API.demandBlock.getDemandByUserId(id as string).then((data) => setDemands(data));
  }, []);

  const Avatar = ({ path }: { path: string }) => {
    const avatarPath = `http://esoft.api.miv-dev.ru:8000/${path}`;
    return (
      <Image source={{ uri: avatarPath }} style={{ width: 100, height: 100, borderRadius: 50 }} />
    );
  };

  return (
    <>
      <SafeAreaView className="mx-6 mt-6 mb-9">
        <Header
          title=""
          icon={<Icons.ArrowIcon rotateToLeft={true} size={16} />}
          link="/(tabs)/users"
        />
      </SafeAreaView>
      <View className="mx-6 mb-9">
        <View className="flex justify-center items-center w-full mb-2">
          {user.avatar ? <Avatar path={user.avatar} /> : <Icons.DefaultAvatar size={100} />}
        </View>
        <Text className="text-[#37464F] text-[24px] font-bold mb-4 text-center">
          {user.firstName} {user.middleName} {user.lastName}
        </Text>
        {user.phone ? (
          <Text className="text-[#37464F] text-[14px] mb-2 text-center">{user.phone}</Text>
        ) : null}
        {user.email ? (
          <Text className="text-[#37464F] text-[14px] mb-2 text-center">{user.email}</Text>
        ) : null}
        {user.dealShare ? (
          <Text className="text-[#37464F] text-[14px] text-center">Процент: {user.dealShare}%</Text>
        ) : null}
      </View>
      <CustomTabView
        navigationState={{ index, routes }}
        scene={SceneMap({
          first: () => {
            return offers.length !== 0 ? (
              <OfferSlide data={offers} />
            ) : (
              <View>
                <Text className="text-[#546E7A] text-[18px] text-center font-bold mt-6">
                  {`Вы еще не участвуете\n ни в одном предложении`}
                </Text>
              </View>
            );
          },
          second: () => {
            return demands.length !== 0 ? (
              <DemandSlide data={demands} />
            ) : (
              <View>
                <Text className="text-[#546E7A] text-[18px] text-center font-bold mt-6">
                  {`Вы еще не участвуете\n ни в одной потребности`}
                </Text>
              </View>
            );
          },
        })}
        setFunc={setIndex}
      />
    </>
  );
}
