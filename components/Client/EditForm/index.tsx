import { Formik } from 'formik';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../Button';
import { Input } from '../../Input';
import { Client, ExtendedErrorType } from '@/shared/types';
import { useEffect, useState } from 'react';
import { setDisabledState } from '@/scripts/helpers';
import { router, useGlobalSearchParams } from 'expo-router';
import clsx from 'clsx';
import { API } from '@/shared/api';
import { handleSaveClients } from '@/shared/slices/clientSlice';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { AddClientOnSubmitSchema } from '@/scripts/submitingSchemes';
import { Icons } from '../../Icons';
import * as ImagePicker from 'expo-image-picker';

export const EditClientForm = () => {
  const dispatch = useAppDispatch();
  const { id } = useGlobalSearchParams();
  const [user, setUser] = useState<Client>({
    type: '',
    id: '',
    lastName: '',
    firstName: '',
    middleName: '',
    phone: '',
    email: '',
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
        phone: user.phone || '',
        email: user.email || '',
        avatar: user.avatar || '',
      }}
      enableReinitialize={true}
      onSubmit={(data, errors) => {
        if (!!errors) {
          API.clientBlock.editClient(id as string, data).then((data) => console.log(data));

          setTimeout(() => {
            router.navigate('/users/');

            API.clientBlock
              .getAllUsers()
              .then(({ data }) => dispatch(handleSaveClients({ clients: data })));
          }, 150);
        }
      }}
      validationSchema={AddClientOnSubmitSchema}
    >
      {({ handleChange, handleSubmit, values, errors }) => {
        const extendedErrors: ExtendedErrorType = errors;
        const [disabled, setDisabled] = useState(true);

        useEffect(() => {
          setDisabledState(setDisabled, {
            fields: {
              phone: values.phone,
              email: values.email,
            },
            errors: {
              phone: errors.phone,
              email: errors.email,
            },
            atLeastOneRequiredError: extendedErrors.atLeastOneRequiredError,
          });
        }, [
          values.phone,
          values.email,
          errors.phone,
          errors.email,
          extendedErrors.atLeastOneRequiredError,
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
            />
            <Input
              variant="text"
              placeholder="Имя"
              value={values.middleName}
              onChangeText={handleChange('middleName')}
            />
            <Input
              variant="text"
              placeholder="Отчество"
              value={values.lastName}
              onChangeText={handleChange('lastName')}
            />
            <Input
              variant="phone"
              placeholder="Номер"
              value={values.phone}
              onChangeText={handleChange('phone')}
              error={errors.phone}
              extendedError={extendedErrors.atLeastOneRequiredError}
            />
            <Input
              variant="email"
              placeholder="Электронная почта"
              value={values.email}
              onChangeText={handleChange('email')}
              error={errors.email}
              extendedError={extendedErrors.atLeastOneRequiredError}
            />
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
