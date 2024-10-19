import { FC, useState } from 'react';
import { View } from 'react-native';
import { Realtor, User, Estate } from '@/types';
import { Card } from '../Card';
import { Button } from '../Button';
import { BottomSheet } from '../BottomSheet';
import { router } from 'expo-router';
import { Icons } from '../Icons';
import { SwipeListView } from 'react-native-swipe-list-view';

type Entity = User | Realtor | Estate;

type UserCardProps = {
  data: Entity[];
  entity: 'user' | 'realtor' | 'estate';
};

export const CardList: FC<UserCardProps> = ({ data }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState('');

  const renderItem = ({ item, index }: { item: Entity; index: number }) => {
    switch (item.entity) {
      case 'user':
        return (
          <Card
            entity={item.entity}
            data={{
              ...item,
              fullName: item.fullName || `User#${index + 1}`,
            }}
            onPress={() => setSelectedTitle(item.fullName)}
          />
        );
      case 'realtor':
        return (
          <Card
            entity={item.entity}
            data={{
              ...item,
              percent: item.percent || 0,
            }}
            onPress={() => setSelectedTitle(item.fullName)}
          />
        );
      case 'estate':
        return (
          <Card
            entity={item.entity}
            data={{
              ...item,
              street: item.street || `Недвижимость#${index + 1}`,
            }}
            onPress={() => setSelectedTitle(item.street || `Недвижимость#${index + 1}`)}
          />
        );
    }
  };

  const renderHiddenItem = (item: Entity) => {
    let navigateURL = '';

    switch (item.entity) {
      case 'user':
        navigateURL = '../client/editPage';
        break;
      case 'realtor':
        navigateURL = '../realtor/editPage';
        break;
      case 'estate':
        navigateURL = '../estate/editPage';
        break;
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
        renderHiddenItem={({ item }) => renderHiddenItem(item)}
        keyExtractor={(item: Entity) => item.id.toString()}
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
