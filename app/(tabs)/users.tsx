import { ClientSlide, CustomTabView, Header, Icons, RealtorSlide } from '@/components';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SceneMap } from 'react-native-tab-view';
import { API } from '@/shared/api';
import { handleSaveClients } from '@/shared/slices/clientSlice';
import { handleSaveRealtors } from '@/shared/slices/realtorSlice';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';

export default function UsersPage() {
  const dispatch = useAppDispatch();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Клиент' },
    { key: 'second', title: 'Риэлтор' },
  ]);

  useEffect(() => {
    // Clients
    API.clientBlock
      .getAllUsers()
      .then(({ data }) => dispatch(handleSaveClients({ clients: data })));

    // Realtors
    API.realtorBlock
      .getAllUsers()
      .then(({ data }) => dispatch(handleSaveRealtors({ realtors: data })));
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
          first: () => <ClientSlide />,
          second: () => <RealtorSlide />,
        })}
        setFunc={setIndex}
      />
    </>
  );
}
