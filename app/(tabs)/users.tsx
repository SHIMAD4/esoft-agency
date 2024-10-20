import { SafeAreaView } from 'react-native-safe-area-context';
import { SceneMap } from 'react-native-tab-view';
import { useEffect, useState } from 'react';
import { ClientSlide, RealtorSlide, Header, CustomTabView, Icons } from '@/components';
import { API } from '@/shared/api';
import { Client } from '@/shared/types';

export default function UsersPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [realtors, setRealtors] = useState([]);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Клиент' },
    { key: 'second', title: 'Риэлтор' },
  ]);

  useEffect(() => {
    API.clientBlock.getAllUsers().then(({ data }) => setClients(data));
    API.realtorBlock.getAllUsers().then(({ data }) => setRealtors(data));
  }, []);

  return (
    <>
      <SafeAreaView className="mx-6 mt-6 mb-9">
        <Header
          title="Пользователи"
          icon={<Icons.ArrowIcon rotateToLeft={true} size={16} />}
          link="/(tabs)"
        />
      </SafeAreaView>
      <CustomTabView
        navigationState={{ index, routes }}
        scene={SceneMap({
          first: () => <ClientSlide users={clients} />,
          second: () => <RealtorSlide users={realtors} />,
        })}
        setFunc={setIndex}
      />
    </>
  );
}
