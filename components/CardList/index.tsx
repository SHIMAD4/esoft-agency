import { FC, useState } from 'react';
import { ListRenderItemInfo, View } from 'react-native';
import { Realtor, Client /*Estate*/ } from '@/shared/types';
import { Card } from '../Card';
import { Button } from '../Button';
import { BottomSheet } from '../BottomSheet';
import { router } from 'expo-router';
import { Icons } from '../Icons';
import { SwipeListView } from 'react-native-swipe-list-view';

type Entity = Client | Realtor /*| Estate */;

type UserCardProps = {
  data: Entity[];
};

export const CardList: FC<UserCardProps> = ({ data }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState('');

  const renderItem = ({ item }: ListRenderItemInfo<Entity>) => {
    let fullName = '';

    switch (item.type) {
      case 'Client':
        item = item as Client;
        fullName = `${item.firstName} ${item.lastName} ${item.middleName}`;

        return (
          <Card
            entity={item.type}
            data={{
              ...item,
              firstName: item.firstName,
              lastName: item.lastName,
              middleName: item.middleName,
            }}
            onPress={() => setSelectedTitle(fullName)}
          />
        );
      case 'Realtor':
        item = item as Realtor;
        fullName = `${item.firstName} ${item.lastName} ${item.middleName}`;

        return (
          <Card
            entity={item.type}
            data={{
              ...item,
              firstName: item.firstName,
              lastName: item.lastName,
              middleName: item.middleName,
              dealShare: item.dealShare,
            }}
            onPress={() => setSelectedTitle(fullName)}
          />
        );
      default:
        return null;
    }
  };

  const renderHiddenItem = (rowData: ListRenderItemInfo<Entity>) => {
    const { item } = rowData;
    let navigateURL = '';

    switch (item.type) {
      case 'Client':
        navigateURL = '../client/editPage';
        break;
      case 'Realtor':
        navigateURL = '../realtor/editPage';
        break;
      // case 'estate':
      //   navigateURL = '../estate/editPage';
      //   break;
      default:
        return null; // Ensure we return null if no case matches
    }

    return (
      <View className="flex w-full h-full flex-row-reverse items-center pb-[8px]">
        <Button
          variant="delete"
          onPress={() => setIsSheetOpen(true)}
          className="flex justify-center items-center bg-[#FE4A6D] rounded-r-[3px]"
        >
          <Icons.DeleteIcon />
        </Button>
        <Button
          variant="edit"
          onPress={() => router.navigate(navigateURL)}
          className="flex justify-center items-center bg-[#01A0FF]"
        >
          <Icons.EditIcon />
        </Button>
      </View>
    );
  };

  return (
    <View className="flex flex-col">
      <SwipeListView
        data={data}
        renderItem={renderItem}
        renderHiddenItem={(rowData) => renderHiddenItem(rowData)}
        keyExtractor={(item: Entity) => item.user.id}
        rightOpenValue={-115}
        disableRightSwipe={true}
        swipeToOpenPercent={1}
        closeOnRowOpen={true}
        closeOnRowPress={true}
      />
      <BottomSheet
        title="Удалить пользователя"
        description="без возможности восстановления?"
        userFullName={selectedTitle}
        titleToClose="Отмена"
        titleToDelete="Удалить"
        handleClickToOpen={isSheetOpen}
        setIsSheetOpen={setIsSheetOpen}
      />
    </View>
  );
};
