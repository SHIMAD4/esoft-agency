import { SafeAreaView } from 'react-native-safe-area-context';
import { FC, useEffect, useState } from 'react';
import { Header, Icons } from '@/components';
import { useGlobalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';
import { API } from '@/shared/api';
import { EventType } from '@/shared/types';
import { formatDate } from '@/scripts/helpers';
import { EventTitles } from '@/scripts/constants';

export default function EventPage() {
  const [event, setEvent] = useState<EventType>({
    type: '',
    id: '',
    name: '',
    startAt: '',
    eventType: 'CALL',
    endAt: '',
    comment: '',
  });
  const { id } = useGlobalSearchParams();

  useEffect(() => {
    API.eventBlock.getEventById(id as string).then(({ data }) => setEvent(data));
  }, []);

  return (
    <>
      <SafeAreaView className="mx-6 mt-6 mb-9">
        <Header
          title="Просмотр"
          icon={<Icons.ArrowIcon rotateToLeft={true} size={16} />}
          link="/(tabs)/events"
        />
      </SafeAreaView>
      <View className="mx-6 mb-9">
        <View>
          <Text className="text-[#000000] text-[12px] mb-2">Название</Text>
          <Text className="text-[#37464F] text-[18px] font-bold mb-9">{event.name}</Text>
        </View>
        <View className="mb-9">
          <EventDescriptionPiece
            title="Начало"
            data={formatDate(event.startAt)}
            style={{ marginBottom: event.endAt ? 16 : 0 }}
          />
          {event.endAt ? (
            <EventDescriptionPiece title="Конец" data={formatDate(event.endAt)} />
          ) : null}
        </View>
        <EventDescriptionPiece
          title="Тип события"
          data={EventTitles[event.eventType]}
          style={{ marginBottom: 36 }}
        />
        {event.comment ? <EventDescriptionPiece title="Описание" data={event.comment} /> : null}
      </View>
    </>
  );
}

const EventDescriptionPiece: FC<{
  title: string;
  data: string;
  style?: { marginBottom: number };
}> = ({ title, data, style }) => {
  return (
    <View style={style}>
      <Text className="text-[#78909C] text-[12px] mb-2">{title}</Text>
      <Text className="text-[#37464F] text-[14px]">{data}</Text>
    </View>
  );
};
