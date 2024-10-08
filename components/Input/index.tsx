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
