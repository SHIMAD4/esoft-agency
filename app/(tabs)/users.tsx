import { SafeAreaView } from 'react-native-safe-area-context';
import { SceneMap } from 'react-native-tab-view';
import { useState } from 'react';
import { ClientSlide, RealtorSlide, Header, CustomTabView, Icons } from '@/components';

export default function UsersPage() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Клиент' },
    { key: 'second', title: 'Риэлтор' },
  ]);

  // TODO: Нужно брать пользователей из БД (Жду бэк)
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
          first: () => (
            <ClientSlide
              users={[
                { id: 1, fullName: 'User#1', telephone: '+ 7 (965) 433 - 55 - 55', entity: 'user' },
                {
                  id: 2,
                  fullName: 'Мелихова Ева-София',
                  telephone: '+ 7 (965) 433 - 55 - 55',
                  email: 'sshuulje@vk.com',
                  entity: 'user',
                },
                {
                  id: 3,
                  fullName: 'Мелихова Ева-София',
                  telephone: '+ 7 (965) 433 - 55 - 55',
                  email: 'sshuulje@vk.com',
                  entity: 'user',
                },
                {
                  id: 4,
                  fullName: 'Мелихова Ева-София',
                  telephone: '+ 7 (965) 433 - 55 - 55',
                  email: 'sshuulje@vk.com',
                  entity: 'user',
                },
              ]}
            />
          ),
          second: () => (
            <RealtorSlide
              users={[
                { id: 1, fullName: 'Максимов Андрей Юрьевич', percent: 30, entity: 'realtor' },
                {
                  id: 2,
                  fullName: 'Каматалина Юлия Сергеевна',
                  percent: 20,
                  entity: 'realtor',
                },
              ]}
            />
          ),
        })}
        setFunc={setIndex}
      />
    </>
  );
}
