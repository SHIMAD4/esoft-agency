import { FC, useState } from 'react';
import { ListRenderItemInfo, View } from 'react-native';
import { Client, Estate, Realtor } from '@/shared/types';
import { Card } from '../Card';
import { Button } from '../Button';
import { BottomSheet } from '../BottomSheet';
import { router } from 'expo-router';
import { Icons } from '../Icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { EntityType } from '@/scripts/constants';

type Entity = Client | Realtor | Estate;

type UserCardProps = {
  data: Entity[];
};

export const CardList: FC<UserCardProps> = ({ data }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedEntity, setSelectedEntity] = useState('');

  const renderItem = ({ item }: ListRenderItemInfo<Entity>) => {
    let fullName: string;

    switch (item.type) {
      case EntityType.CLIENT:
        item = item as Client;
        fullName = `${item.firstName} ${item.lastName} ${item.middleName}`;

        return (
          <Card
            entity={EntityType.CLIENT}
            dt={{
              ...item,
              firstName: item.firstName,
              lastName: item.lastName,
              middleName: item.middleName,
            }}
            onPress={() => setSelectedTitle(fullName)}
          />
        );
      case EntityType.REALTOR:
        item = item as Realtor;
        fullName = `${item.firstName} ${item.lastName} ${item.middleName}`;

        return (
          <Card
            entity={EntityType.REALTOR}
            dt={{
              ...item,
              firstName: item.firstName,
              lastName: item.lastName,
              middleName: item.middleName,
              dealShare: item.dealShare,
            }}
            onPress={() => setSelectedTitle(fullName)}
          />
        );
      case EntityType.ESTATE:
        item = item as Estate;
        let addressStreet = item.addressStreet;

        return (
          <Card
            entity={EntityType.ESTATE}
            dt={{ ...item }}
            onPress={() => setSelectedTitle(addressStreet)}
          />
        );
      default:
        return null;
    }
  };

  const renderHiddenItem = (rowData: ListRenderItemInfo<Entity>) => {
    const { item } = rowData;
    let entityId = item.id;

    let navigateURL = '';

    switch (item.type) {
      case EntityType.CLIENT:
        navigateURL = '../client/editPage';
        break;
      case EntityType.REALTOR:
        navigateURL = '../realtor/editPage';
        break;
      case EntityType.ESTATE:
        navigateURL = '../estate/editPage';
        break;
      default:
        return null;
    }

    return (
      <View className="flex w-full h-full flex-row-reverse items-center pb-[8px]">
        <Button
          variant="delete"
          onPress={() => {
            setSelectedEntity(entityId);
            setIsSheetOpen(true);
          }}
          className="flex justify-center items-center bg-[#FE4A6D] rounded-r-[3px]"
        >
          <Icons.DeleteIcon />
        </Button>
        <Button
          variant="edit"
          onPress={() => {
            setSelectedEntity(entityId);
            router.push(`${navigateURL}?id=${entityId}`);
          }}
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
        keyExtractor={(item: Entity) => item.id}
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
        entityToDeleteID={selectedEntity}
        handleClickToOpen={isSheetOpen}
        setIsSheetOpen={setIsSheetOpen}
      />
    </View>
  );
};
