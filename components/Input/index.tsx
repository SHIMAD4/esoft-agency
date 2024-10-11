import { FC, useState } from 'react';
import { SafeAreaView, TextInput, View, Text } from 'react-native';
import { SearchIcon } from '../Icons';
import MaskInput from 'react-native-mask-input/src/MaskInput';
import { EMAILVALIDITYMASK, PHONEINPUTMASK } from '@/scripts/constants';
import clsx from 'clsx';

type InputProps = {
  variant: 'search' | 'text' | 'phone' | 'email' | string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  extendedError?: string;
  // Остальные свойства, чтобы компонент мог принимать любые пропсы.
  [key: string]: any;
};

type InputBaseProps = {
  value: string;
  onChangeText: (text: string) => void;
  // Остальные свойства, чтобы компонент мог принимать любые пропсы.
  [key: string]: any;
};

type SearchInputProps = { placeholder?: string };
type CustomTextInputProps = InputBaseProps & { placeholder?: string };
type PhoneInputProps = InputBaseProps & { placeholder?: string; required?: boolean };
type EmailInputProps = InputBaseProps & {
  placeholder?: string;
  required?: boolean;
};

export const Input: FC<InputProps> = ({
  variant,
  placeholder,
  required,
  error,
  extendedError,
  ...props
}) => {
  switch (variant) {
    case 'search':
      return <SearchInput placeholder={placeholder} {...props} />;
    case 'text':
      return (
        <CustomTextInput
          placeholder={placeholder}
          value={props.value}
          onChangeText={props.onChangeText}
          {...props}
        />
      );
    case 'phone':
      return (
        <PhoneInput
          placeholder={placeholder}
          required={required}
          value={props.value}
          onChangeText={props.onChangeText}
          error={error}
          extendedError={extendedError}
          {...props}
        />
      );
    case 'email':
      return (
        <EmailInput
          placeholder={placeholder}
          required={required}
          value={props.value}
          onChangeText={props.onChangeText}
          error={error}
          extendedError={extendedError}
          {...props}
        />
      );
    default:
      return null;
  }
};

const SearchInput: FC<SearchInputProps> = ({ placeholder, ...props }) => {
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

const CustomTextInput: FC<CustomTextInputProps> = ({ placeholder, ...props }) => {
  return (
    <View className="flex-row items-center relative">
      <TextInput
        className="w-full border-[1px] border-[#CFD8DB] py-6 pl-4 rounded-[3px]"
        inputMode="text"
        placeholder={placeholder}
        {...props}
      />
    </View>
  );
};

const PhoneInput: FC<PhoneInputProps> = ({
  placeholder,
  required,
  error,
  extendedError,
  ...props
}) => {
  const { value, onChangeText } = props;

  return (
    <View className="flex" {...props}>
      <MaskInput
        className={clsx(
          'w-full border-[1px] border-[#CFD8DB] py-6 pl-4 rounded-[3px]',
          error || (extendedError && 'border-[#E3002C]'),
        )}
        value={value}
        onChangeText={(masked, unmasked) => {
          onChangeText(unmasked);
        }}
        placeholderTextColor={error || extendedError ? '#E3002C' : undefined}
        placeholder={placeholder}
        inputMode="tel"
        mask={PHONEINPUTMASK}
      />
      {error && <Text className="mt-1 text-[#FF1644]">{error}</Text>}
    </View>
  );
};

const EmailInput: FC<EmailInputProps> = ({
  placeholder,
  required,
  error,
  extendedError,
  ...props
}) => {
  const { value, onChangeText } = props;

  return (
    <View className="flex" {...props}>
      <TextInput
        className={clsx(
          'w-full border-[1px] border-[#CFD8DB] py-6 pl-4 rounded-[3px]',
          (error || extendedError) && 'border-[#E3002C]',
        )}
        onChangeText={(text) => {
          onChangeText(text);
        }}
        value={value}
        inputMode="email"
        placeholderTextColor={error || extendedError ? '#E3002C' : undefined}
        placeholder={placeholder}
      />
      {error && <Text className="mt-1 text-[#FF1644]">{error}</Text>}
    </View>
  );
};
