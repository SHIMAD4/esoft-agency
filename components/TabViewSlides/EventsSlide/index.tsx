import { View, Text, SectionList } from 'react-native';
import { Button } from '../../Button';
import { CardList } from '../../CardList';
import { FC, useEffect } from 'react';
import { router } from 'expo-router';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { EventColors, EventTitles } from '@/scripts/constants';
import { API } from '@/shared/api';
import { handleSaveEvents } from '@/shared/slices/eventsSlice';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { formatDate } from '@/scripts/helpers';
import { EventType } from '@/shared/types';

const eventsTooltip = [
  { id: 1, title: EventTitles.MEETING, color: EventColors.MEETING, width: 80 },
  { id: 2, title: EventTitles.SHOW, color: EventColors.SHOW, width: 100 },
  { id: 3, title: EventTitles.CALL, color: EventColors.CALL, width: 140 },
];

export const EventsSlide: FC = () => {
  const dispatch = useAppDispatch();
  const { groupedEvents } = useAppSelector((state) => state.eventsSlice);

  const handleAddEventClick = () => {
    router.navigate('../events/addPage');
  };

  useEffect(() => {
    API.eventBlock
      .getAllEvents()
      .then(({ data }) => dispatch(handleSaveEvents({ groupedEvents: data })));
  }, []);

  const sections: { title: string; data: EventType[] }[] = Object.keys(groupedEvents || {}).map(
    (date) => ({
      title: formatDate(date).split('- ')[0],
      data: groupedEvents[date],
    }),
  );

  return (
    <View className="flex mx-6 h-[735px] pb-[100px]">
      <Button variant="add" onPress={handleAddEventClick} style={{ marginBottom: 24 }} />
      <View className="flex flex-row justify-between items-center mb-6">
        {eventsTooltip.map((tip) => (
          <View
            className="flex flex-row justify-center items-center"
            key={tip.id}
            style={{ width: tip.width }}
          >
            <View
              className="w-[8px] h-[8px] rounded-[3px] mr-[8px]"
              style={{ backgroundColor: tip.color }}
            ></View>
            <Text>{tip.title}</Text>
          </View>
        ))}
      </View>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-lg font-semibold mb-4">{title}</Text>
        )}
        renderItem={({ item }) => <CardList data={[item]} />}
      />
    </View>
  );
};
