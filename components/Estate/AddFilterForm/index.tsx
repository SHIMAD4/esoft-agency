import { Formik } from 'formik';
import { View } from 'react-native';
import { Button } from '../../Button';
import { Input } from '../../Input';
import { EstateType } from '@/scripts/constants';

export const AddFilterForm = () => {
  // TODO: Разобраться с районами и сортировкой
  // TODO: Отправлять данные (Жду бэк)
  return (
    <Formik
      initialValues={{ type: '', district: '', sort: '' }}
      onSubmit={(data, errors) => !!errors && console.log('submit data: ', data)}
    >
      {({ handleChange, handleSubmit, values }) => {
        return (
          <View className="mx-6 gap-y-4">
            <Input
              variant="select"
              label="Тип недвижимости"
              placeholder="Выберите тип"
              value={values.type}
              onChangeText={handleChange('type')}
              data={[
                { id: 1, label: 'Квартира', value: EstateType.APARTMENT },
                { id: 2, label: 'Дом', value: EstateType.HOUSE },
                { id: 3, label: 'Земля', value: EstateType.LAND },
              ]}
            />
            <Input
              variant="select"
              label="Район"
              placeholder="Выберите район"
              value={values.district}
              onChangeText={handleChange('district')}
              data={[
                { id: 1, label: 'Район 1', value: 'Район 1' },
                { id: 2, label: 'Район 2', value: 'Район 2' },
                { id: 3, label: 'Район 3', value: 'Район 3' },
                { id: 4, label: 'Район 4', value: 'Район 4' },
              ]}
            />
            <Input
              variant="select"
              label="Сортировка"
              placeholder="Выберите тип сортировки"
              value={values.sort}
              onChangeText={handleChange('sort')}
              data={[
                { id: 1, label: 'По алфавиту (адреса)', value: 'По алфавиту' },
                { id: 2, label: 'По алфавиту реверс (адреса)', value: 'По алфавиту реверс' },
                {
                  id: 3,
                  label: 'По возрастанию (номер дома)',
                  value: 'По возрастанию (номер дома)',
                },
                { id: 4, label: 'По убыванию (номер дома)', value: 'По убыванию (номер дома)' },
                {
                  id: 5,
                  label: 'По возрастанию (номер квартиры)',
                  value: 'По возрастанию (номер квартиры)',
                },
                {
                  id: 6,
                  label: 'По убыванию (номер квартиры)',
                  value: 'По убыванию (номер квартиры)',
                },
              ]}
            />
            <Button
              variant="default"
              text="Найти"
              buttonClassNames="w-full bg-[#0091EA] flex justify-center items-center py-[14.5px] rounded-[3px]"
              textClassNames="text-[#FFFFFF] text-[16px]"
              onPress={handleSubmit}
            />
          </View>
        );
      }}
    </Formik>
  );
};
