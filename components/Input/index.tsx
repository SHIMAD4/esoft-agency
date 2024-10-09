import React, { FC, useState } from 'react';
import { SafeAreaView, TextInput, View } from 'react-native';
import { SearchIcon } from '../Icons';

type InputProps = {
  variant: 'search' | string;
  placeholder?: string;
  // Остальные свойства, чтобы компонент мог принимать любые пропсы.
  [key: string]: any;
};

export const Input: FC<InputProps> = ({ variant, placeholder, ...props }) => {
  switch (variant) {
    case 'search':
      return <SearchInput placeholder={placeholder} {...props} />;
    case 'text':
      return <CustomTextInput placeholder={placeholder} {...props} />;
    case 'tel':
      return <TelInput placeholder={placeholder} {...props} />;
    case 'email':
      return <EmailInput placeholder={placeholder} {...props} />;
    default:
      return null;
  }
};

const SearchInput: FC<{ placeholder?: string }> = ({ placeholder, ...props }) => {
  const [searchText, onChangeSearchText] = useState('');

  return (
    <SafeAreaView {...props}>
      <View className="flex-row items-center relative mt-6">
        <TextInput
          className="w-full border-[1px] border-[#CFD8DB] pt-[18px] pb-[18px] pl-[40px] rounded-[3px]"
          onChangeText={onChangeSearchText}
          value={searchText}
          placeholder={placeholder}
        />
        <View className="absolute left-4">
          <SearchIcon />
        </View>
      </View>
    </SafeAreaView>
  );
};

const CustomTextInput: FC<{ placeholder?: string }> = ({ placeholder, ...props }) => {
  const [text, onChangeText] = useState('');

  return (
    <View className="flex-row items-center relative" {...props}>
      <TextInput
        className="w-full border-[1px] border-[#CFD8DB] py-6 pl-4 rounded-[3px]"
        onChangeText={onChangeText}
        value={text}
        inputMode="text"
        placeholder={placeholder}
      />
    </View>
  );
};

const TelInput: FC<{ placeholder?: string }> = ({ placeholder, ...props }) => {
  const [tel, onChangeTel] = useState('');

  // TODO: Добавить валидацию
  return (
    <View className="flex-row items-center relative" {...props}>
      <TextInput
        className="w-full border-[1px] border-[#CFD8DB] py-6 pl-4 rounded-[3px]"
        onChangeText={onChangeTel}
        value={tel}
        inputMode="tel"
        placeholder={placeholder}
      />
    </View>
  );
};

const EmailInput: FC<{ placeholder?: string }> = ({ placeholder, ...props }) => {
  const [email, onChangeEmail] = useState('');

  // TODO: Добавить валидацию
  return (
    <View className="flex-row items-center relative" {...props}>
      <TextInput
        className="w-full border-[1px] border-[#CFD8DB] py-6 pl-4 rounded-[3px]"
        onChangeText={onChangeEmail}
        value={email}
        inputMode="email"
        placeholder={placeholder}
      />
    </View>
  );
};
