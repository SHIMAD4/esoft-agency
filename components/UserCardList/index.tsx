import { FC, useState } from 'react';
import { View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { User } from '@/types';
import { UserCard } from '../UserCard';
import { Button } from '../Button';
import { BottomSheet } from '../BottomSheet';
import { DeleteIcon, EditIcon } from '../Icons';

type UserCardProps = {
  users: User[];
};

export const UserCardList: FC<UserCardProps> = ({ users }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedUserFullName, setSelectedUserFullName] = useState('');

  const renderItem = ({ item: user, index }: { item: User; index: number }) => {
    return (
      <UserCard
        user={{
          ...user,
          fullName: user.fullName || `User#${index + 1}`,
        }}
        onPress={() => setSelectedUserFullName(user.fullName)}
      />
    );
  };

  const renderHiddenItem = () => {
    return (
      <View className="flex w-full h-full flex-row-reverse items-center pb-[8px]">
        <Button
          variant="delete"
          onPress={() => setIsSheetOpen(true)}
          className="flex justify-center items-center bg-[#FE4A6D] rounded-r-[3px]"
        >
          <DeleteIcon />
        </Button>
        <Button
          variant="edit"
          onPress={() => console.log('Edit')}
          className="flex justify-center items-center bg-[#01A0FF]"
        >
          <EditIcon />
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
