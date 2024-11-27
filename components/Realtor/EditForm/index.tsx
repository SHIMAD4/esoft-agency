import { Formik } from 'formik';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../Button';
import { Input } from '../../Input';
import { useEffect, useState } from 'react';
import { setDisabledState } from '@/scripts/helpers';
import clsx from 'clsx';
import { Realtor } from '@/shared/types';
import { API } from '@/shared/api';
import { router, useGlobalSearchParams } from 'expo-router';
import { handleSaveRealtors } from '@/shared/slices/realtorSlice';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { AddRealtorOnSubmitSchema } from '@/scripts/submitingSchemes';
import { Icons } from '../../Icons';
import * as ImagePicker from 'expo-image-picker';

export const EditRealtorForm = () => {
  const dispatch = useAppDispatch();
  const { id } = useGlobalSearchParams();
  const [user, setUser] = useState<Realtor>({
    type: '',
    id: '',
    fullName: '',
    dealShare: '',
    firstName: '',
    lastName: '',
    middleName: '',
    avatar: '',
  });

  useEffect(() => {
    API.appBlock.getUserById(id as string).then(({ data }) => setUser(data));
  }, [id]);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Необходимо разрешение для доступа к вашей галерее.');
      return false;
    }
    return true;
  };

  const fetchUpload = async (uri: string) => {
    const formData = new FormData();
    const fileName = uri.split('/').pop();
    formData.append('file', { uri, name: fileName, type: 'image/jpeg' } as any);

    await API.appBlock.saveAvatarById(id as string, formData);
  };

  const handleImagePick = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      await fetchUpload(imageUri);
    } else {
      console.log('User cancelled image picker');
    }
  };

  return (
    <Formik
      initialValues={{
        lastName: user.lastName || '',
        firstName: user.firstName || '',
        middleName: user.middleName || '',
        dealShare: user.dealShare.toString() || '',
        avatar: user.avatar || '',
      }}
      enableReinitialize={true}
      onSubmit={(data, errors) => {
        if (!!errors) {
          API.realtorBlock.editRealtor(id as string, data).then((data) => console.log(data));

          setTimeout(() => {
            router.navigate('/users/');

            API.realtorBlock
              .getAllUsers()
              .then(({ data }) => dispatch(handleSaveRealtors({ realtors: data })));
          }, 150);
        }
      }}
      validationSchema={AddRealtorOnSubmitSchema}
    >
      {({ handleChange, handleSubmit, values, errors }) => {
        const [disabled, setDisabled] = useState(true);

        useEffect(() => {
          setDisabledState(setDisabled, {
            fields: {
              lastName: values.lastName,
              firstName: values.firstName,
              middleName: values.middleName,
            },
            errors: {
              lastName: errors.lastName,
              firstName: errors.firstName,
              middleName: errors.middleName,
            },
          });
        }, [
          values.lastName,
          values.firstName,
          values.middleName,
          errors.lastName,
          errors.firstName,
          errors.middleName,
        ]);

        return (
          <View className="mx-6 gap-y-4">
            <View className="flex justify-center items-center w-full mb-2">
              {values.avatar ? (
                <Image
                  source={{ uri: `http://esoft.api.miv-dev.ru:8000/${user.avatar}` }}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />
              ) : user.avatar ? (
                <Image
                  source={{ uri: `http://esoft.api.miv-dev.ru:8000/${user.avatar}` }}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />
              ) : (
                <Icons.DefaultAvatar size={100} />
              )}
              <TouchableOpacity onPress={handleImagePick}>
                <Text className="mt-2 text-[#0091EA]">Выбрать фотографию</Text>
              </TouchableOpacity>
            </View>
            <Input
              variant="text"
              placeholder="Фамилия"
              value={values.firstName}
              onChangeText={handleChange('firstName')}
              error={errors.firstName}
            />
            <Input
              variant="text"
              placeholder="Имя"
              value={values.middleName}
              onChangeText={handleChange('middleName')}
              error={errors.middleName}
            />
            <Input
              variant="text"
              placeholder="Отчество"
              value={values.lastName}
              onChangeText={handleChange('lastName')}
              error={errors.lastName}
            />
            <Input
              variant="number"
              placeholder="Процентная ставка"
              value={values.dealShare}
              onChangeText={handleChange('dealShare')}
            />
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
