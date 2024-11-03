import { FC, useState } from 'react';
import { ListRenderItemInfo, View } from 'react-native';
import { Client, Estate, Realtor, Offer, Demand, Deal } from '@/shared/types';
import { Card } from '../Card';
import { Button } from '../Button';
import { BottomSheet } from '../BottomSheet';
import { router } from 'expo-router';
import { Icons } from '../Icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { EntityType } from '@/scripts/constants';

type Entity = Client | Realtor | Estate | Offer | Demand | Deal;

type UserCardProps = {
  data: Entity[];
};

export const CardList: FC<UserCardProps> = ({ data }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedEntity, setSelectedEntity] = useState('');
  const [selectedLabel, setSelectedLabel] = useState('');
  const [selectedTitleToDelete, setSelectedTitleToDelete] = useState('');
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const renderItem = ({ item }: ListRenderItemInfo<Entity>) => {
    let title: string;

    switch (item.type) {
      case EntityType.CLIENT:
        item = item as Client;
        title = `${item.firstName} ${item.lastName} ${item.middleName}`;

        return (
          <Card
            entity={EntityType.CLIENT}
            dt={{
              ...item,
              firstName: item.firstName,
              lastName: item.lastName,
              middleName: item.middleName,
            }}
            onPress={() => {
              setSelectedLabel(EntityType.CLIENT);
              setSelectedTitle(title);
              setSelectedTitleToDelete('Удалить пользователя');
            }}
          />
        );
      case EntityType.REALTOR:
        item = item as Realtor;
        title = `${item.firstName} ${item.lastName} ${item.middleName}`;

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
            onPress={() => {
              setSelectedLabel(EntityType.REALTOR);
              setSelectedTitle(title);
              setSelectedTitleToDelete('Удалить пользователя');
            }}
          />
        );
      case EntityType.ESTATE:
        item = item as Estate;
        title = item.addressStreet;

        return (
          <Card
            entity={EntityType.ESTATE}
            dt={{ ...item }}
            onPress={() => {
              setSelectedLabel(EntityType.ESTATE);
              setSelectedTitle(title);
              setSelectedTitleToDelete('Удалить объект');
            }}
          />
        );
      case EntityType.OFFER:
        item = item as Offer;
        title = item.estate.addressStreet;

        return (
          <Card
            entity={EntityType.OFFER}
            dt={{ ...item }}
            onPress={() => {
              setSelectedLabel(EntityType.OFFER);
              setSelectedTitle(title);
              setSelectedTitleToDelete('Удалить предложение');
            }}
          />
        );
      case EntityType.DEMAND:
        item = item as Demand;
        title = item.name;

        return (
          <Card
            entity={EntityType.DEMAND}
            dt={{ ...item }}
            onPress={() => {
              setSelectedLabel(EntityType.DEMAND);
              setSelectedTitle(title);
              setSelectedTitleToDelete('Удалить потребность');
            }}
          />
        );
      case EntityType.DEAL:
        item = item as Deal;
        title = item.name;

        return (
          <Card
            entity={EntityType.DEAL}
            dt={{ ...item }}
            onPress={() => {
              setSelectedLabel(EntityType.DEAL);
              setSelectedTitle(title);
              setSelectedTitleToDelete('Удалить сделку');
            }}
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
      case EntityType.DEAL:
        navigateURL = '../deal/editPage';
        break;
      case EntityType.OFFER:
        navigateURL = '../deal/offer/editPage';
        break;
      case EntityType.DEMAND:
        navigateURL = '../deal/demand/editPage';
        break;
      default:
        return null;
    }

    return (
      <View className="flex w-full h-full flex-row-reverse items-center pb-[8px]">
        <Button
          variant="hidden"
          onPress={() => {
            setSelectedEntity(entityId);
            setIsSheetOpen(true);
          }}
          className="flex justify-center items-center bg-[#FE4A6D] rounded-r-[3px]"
        >
          <Icons.DeleteIcon />
        </Button>
        <Button
          variant="hidden"
          onPress={() => {
            setSelectedEntity(entityId);
            router.push(`${navigateURL}?id=${entityId}`);
          }}
          className="flex justify-center items-center bg-[#01A0FF]"
        >
          <Icons.EditIcon />
        </Button>
        {item.type === EntityType.CLIENT || item.type === EntityType.REALTOR ? (
          <Button
            variant="hidden"
            onPress={() => {
              setSelectedEntity(entityId);
              router.push(`/user/?id=${entityId}`);
            }}
            className="flex justify-center items-center bg-[#00D9BB]"
          >
            <Icons.EyeIcon />
          </Button>
        ) : null}
      </View>
    );
  };

  return (
    <View className="flex flex-col">
      <SwipeListView
        data={data}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        keyExtractor={(item: Entity) => item.id}
        rightOpenValue={
          (data[0] && data[0].type === EntityType.CLIENT) ||
          (data[0] && data[0].type === EntityType.REALTOR)
            ? -175
            : -115
        }
        disableRightSwipe={true}
        swipeToOpenPercent={1}
        swipeToOpenVelocityContribution={15}
        closeOnRowBeginSwipe={true}
        scrollEnabled={scrollEnabled}
        onRowOpen={() => setScrollEnabled(false)}
        onRowClose={() => setScrollEnabled(true)}
      />
      <BottomSheet
        title={selectedTitleToDelete}
        description="без возможности восстановления?"
        userFullName={selectedTitle}
        titleToClose="Отмена"
        titleToDelete="Удалить"
        entityToDeleteLabel={selectedLabel}
        entityToDeleteID={selectedEntity}
        handleClickToOpen={isSheetOpen}
        setIsSheetOpen={setIsSheetOpen}
      />
    </View>
  );
};
