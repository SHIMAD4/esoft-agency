import { FC, useState } from 'react';
import { View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Realtor, User } from '@/types';
import { Card } from '../Card';
import { Button } from '../Button';
import { BottomSheet } from '../BottomSheet';
import { router } from 'expo-router';
import { Icons } from '../Icons';

type UserCardProps = {
  users: User[] | Realtor[];
  entity: 'user' | 'realtor';
};

export const CardList: FC<UserCardProps> = ({ users, entity }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedUserFullName, setSelectedUserFullName] = useState('');

  const renderItem = ({ item: user, index }: { item: User | Realtor; index: number }) => {
    switch (entity) {
      case 'user':
        user = user as User;
        return (
          <Card
            entity={entity}
            user={{
              ...user,
              fullName: user.fullName || `User#${index + 1}`,
            }}
            onPress={() => setSelectedUserFullName(user.fullName)}
          />
        );
      case 'realtor':
        user = user as Realtor;
        return (
          <Card
            entity={entity}
            user={{
              ...user,
              percent: user.percent || 0,
            }}
            onPress={() => setSelectedUserFullName(user.fullName)}
          />
        );
    }
  };

  const renderHiddenItem = () => {
    let navigateURL: string;

    if (entity === 'user') {
      navigateURL = '../client/editPage';
    } else {
      navigateURL = '../realtor/editPage';
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
        data={users}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        keyExtractor={(item: User) => item.id.toString()}
        rightOpenValue={-115}
        disableRightSwipe={true}
        swipeToOpenPercent={1}
        closeOnRowOpen={true}
        closeOnRowPress={true}
      />
      <BottomSheet
        title="Удалить пользователя"
        description="без возможности восстановления?"
        userFullName={selectedUserFullName}
        titleToClose="Отмена"
        titleToDelete="Удалить"
        handleClickToOpen={isSheetOpen}
        setIsSheetOpen={setIsSheetOpen}
      />
    </View>
  );
};
