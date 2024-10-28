import { Formik } from 'formik';
import { View, Text } from 'react-native';
import { Button } from '../../Button';
import { Input } from '../../Input';
import { useEffect, useState } from 'react';
import { API } from '@/shared/api';

type FiltersType = {
  districts: { id: number; name: string }[];
  sortVariants: string[];
  types: string[];
};

type LabelsType = {
  [key in string]: string;
};

export const AddFilterForm = () => {
  const [filters, setFilters] = useState<FiltersType>({
    districts: [],
    sortVariants: [],
    types: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.estateBlock
      .getFilters()
      .then(({ data }) => {
        setFilters(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to load filters:', error);
        setLoading(false);
      });
  }, []);

  const typeLabels: LabelsType = {
    APARTMENT: 'Квартира',
    HOUSE: 'Дом',
    LAND: 'Земля',
  };

  const sortVariantLabels: LabelsType = {
    ADDRESS: 'Адрес',
    HOUSE: 'Номер дома',
    NUMBER: 'Номер квартиры',
  };

  const formattedSortVariants = () => {
    if (!filters.sortVariants) return [];

    const variants: { id: number; label: string; value: string; sortDirection: string }[] = [];

    filters.sortVariants.forEach((variant, index) => {
      if (sortVariantLabels[variant]) {
        if (variant === 'ADDRESS') {
          variants.push(
            {
              id: index * 2 + 3,
              label: `От А до Я (${sortVariantLabels[variant]})`,
              value: `${variant}_ASC`,
              sortDirection: '0',
            },
            {
              id: index * 2 + 4,
              label: `От Я до А (${sortVariantLabels[variant]})`,
              value: `${variant}_DESC`,
              sortDirection: '-1',
            },
          );
        } else {
          variants.push({
            id: index * 2 + 1,
            label: `По возрастанию (${sortVariantLabels[variant]})`,
            value: `${variant}_ASC`,
            sortDirection: '0',
          });
          variants.push({
            id: index * 2 + 2,
            label: `По убыванию (${sortVariantLabels[variant]})`,
            value: `${variant}_DESC`,
            sortDirection: '-1',
          });
        }
      }
    });

    return variants;
  };

  const formattedDistricts = () => {
    if (!filters.districts) return [];

    return filters.districts.map((district) => ({
      id: district.id,
      label: district.name,
      value: district.id.toString(),
    }));
  };

  const formattedTypes = () => {
    if (!filters.types) return [];

    return filters.types.map((type, index) => ({
      id: index + 1,
      label: typeLabels[type] || type,
      value: type,
    }));
  };

  if (loading) {
    return (
      <View className="flex justify-center items-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Formik
      initialValues={{ type: '', district: '', sortVariant: '' }}
      onSubmit={(data, errors) => {
        if (!!errors) {
          const sortBy = data.sortVariant.split('_')[0];
          const sortDirection = data.sortVariant.split('_')[1];

          const formattedData = {
            district: data.district,
            type: data.type,
            'sort-by': sortBy,
            'sort-direction': sortDirection === 'ASC' ? 0 : -1,
          };

          console.log('submit data: ', formattedData);
        }
      }}
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
              data={formattedTypes()}
            />
            <Input
              variant="select"
              label="Район"
              placeholder="Выберите район"
              value={values.district}
              onChangeText={handleChange('district')}
              data={formattedDistricts()}
            />
            <Input
              variant="select"
              label="Сортировка"
              placeholder="Выберите тип сортировки"
              value={values.sortVariant}
              onChangeText={handleChange('sortVariant')}
              data={formattedSortVariants()}
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
