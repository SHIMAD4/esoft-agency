import { Formik } from 'formik';
import { Text, View } from 'react-native';
import { Button } from '../../Button';
import { Input } from '../../Input';
import { EventType, ExtendedErrorType } from '@/shared/types';
import { useEffect, useState } from 'react';
import { setDisabledState } from '@/scripts/helpers';
import { router, useGlobalSearchParams } from 'expo-router';
import clsx from 'clsx';
import { API } from '@/shared/api';
import { AddEventOnSubmitSchema } from '@/scripts/submitingSchemes';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { handleSaveEvents, handleSaveUpcomingEvents } from '@/shared/slices/eventsSlice';
import { EventTitles } from '@/scripts/constants';

const eventTypes = [
  { id: 1, label: EventTitles.MEETING, value: 'MEETING' },
  { id: 2, label: EventTitles.SHOW, value: 'SHOW' },
  { id: 3, label: EventTitles.CALL, value: 'CALL' },
];

export const EditEventForm = () => {
  const dispatch = useAppDispatch();
  const { id } = useGlobalSearchParams();
  const [event, setEvent] = useState<EventType>({
    type: '',
    id: '',
    name: '',
    startAt: '',
    endAt: '',
    eventType: 'SHOW',
    comment: '',
  });

  useEffect(() => {
    API.eventBlock.getEventById(id as string).then(({ data }) => setEvent(data));
  }, [id]);

  return (
    <Formik
      initialValues={{
        name: event.name || '',
        startDate: event.startAt.split('T')[0] || '',
        startTime: event.startAt.split('T')[1] || '',
        endDate: event.endAt.split('T')[0] || '',
        endTime: event.endAt.split('T')[1] || '',
        type: event.eventType || '',
        comment: event.comment || '',
      }}
      enableReinitialize={true}
      onSubmit={(data, errors) => {
        if (!!errors) {
          let formattedData = {
            ...data,
            name: data.name.length !== 0 ? data.name : null,
            endDate: data.endDate.length !== 0 ? data.endDate : null,
            endTime: data.endTime.length !== 0 ? data.endTime : null,
            comment: data.comment.length !== 0 ? data.comment : null,
          };

          API.eventBlock.editEvent(id as string, formattedData).then((data) => console.log(data));

          setTimeout(() => {
            router.navigate('/events/');

            API.eventBlock
              .getAllEvents()
              .then(({ data }) => dispatch(handleSaveEvents({ groupedEvents: data })));

            API.eventBlock
              .getAllUpcomingEvents()
              .then(({ data }) => dispatch(handleSaveUpcomingEvents({ upcomingEvents: data })));
          }, 150);
        }
      }}
      validationSchema={AddEventOnSubmitSchema}
    >
      {({ handleChange, handleSubmit, values, errors }) => {
        const extendedErrors: ExtendedErrorType = errors;
        const [disabled, setDisabled] = useState(true);

        useEffect(() => {
          setDisabledState(setDisabled, {
            fields: {
              startDate: values.startDate,
              startTime: values.startTime,
              type: values.type,
            },
            errors: {
              startDate: errors.startDate,
              startTime: errors.startTime,
              type: errors.type,
            },
            allFieldsRequired: !!extendedErrors.allFieldsRequired,
          });
        }, [
          values.startDate,
          values.startTime,
          values.type,
          errors.startDate,
          errors.startTime,
          errors.type,
          extendedErrors.allFieldsRequired,
        ]);

        return (
          <View className="py-3 mx-6 gap-y-4">
            <View>
              <Input
                variant="text"
                label="Название"
                placeholder="Введите название"
                value={values.name}
                onChangeText={handleChange('name')}
              />
            </View>
            <View className="py-9">
              <Input
                variant="date"
                label="Дата начало"
                placeholder="Введите дату начала (YYYY.MM.DD)"
                value={values.startDate}
                onChangeText={handleChange('startDate')}
                containerClassNames="mb-4"
                error={errors.startDate}
                extendedError={extendedErrors.allFieldsRequired}
              />
              <Input
                variant="time"
                label="Время начала"
                placeholder="Введите время начала (HH:MM)"
                value={values.startTime}
                onChangeText={handleChange('startTime')}
                containerClassNames="mb-4"
                error={errors.startTime}
                extendedError={extendedErrors.allFieldsRequired}
              />
              <Input
                variant="date"
                label="Дата конца"
                placeholder="Дата конца (YYYY.MM.DD)"
                value={values.endDate}
                onChangeText={handleChange('endDate')}
                containerClassNames="mb-4"
              />
              <Input
                variant="time"
                label="Время конца"
                placeholder="Введите время конца (HH:MM)"
                value={values.endTime}
                onChangeText={handleChange('endTime')}
              />
            </View>
            <View>
              <Input
                variant="select"
                label="Тип события"
                placeholder="Выберите тип"
                className="mb-9"
                value={values.type}
                onChangeText={handleChange('type')}
                error={errors.type}
                extendedError={extendedErrors.allFieldsRequired}
                data={eventTypes}
              />
              <Input
                multiline={true}
                numberOfLines={5}
                variant="text"
                label="Описание"
                placeholder="Нужно рассказать про новый объект"
                value={values.comment}
                onChangeText={handleChange('comment')}
                style={{ textAlignVertical: 'top' }}
              />
            </View>
            {extendedErrors.atLeastOneRequiredError && (
              <Text className="text-[#FF1644] text-center">
                {extendedErrors.atLeastOneRequiredError}
              </Text>
            )}
            <Button
              variant="default"
              text="Сохранить"
              buttonClassNames={clsx(
                'w-full bg-[#0091EA] flex justify-center items-center py-[14.5px] rounded-[3px]',
                disabled && 'bg-[#01A0FF]',
              )}
              textClassNames={clsx('text-[#FFFFFF] text-[16px]', disabled && 'text-[#70C9FF]')}
              onPress={handleSubmit}
              disabled={disabled}
            />
          </View>
        );
      }}
    </Formik>
  );
};
