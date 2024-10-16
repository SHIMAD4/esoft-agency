import { FC } from 'react';
import { SafeAreaView, TextInput, View, Text } from 'react-native';
import MaskInput from 'react-native-mask-input/src/MaskInput';
import { PHONEINPUTMASK } from '@/scripts/constants';
import clsx from 'clsx';
import { Icons } from '../Icons';

type InputProps = {
  variant: 'search' | 'text' | 'number' | 'phone' | 'email' | string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  extendedError?: string;
  // Остальные свойства, чтобы компонент мог принимать любые пропсы.
  [key: string]: any;
};

type InputBaseProps = {
  value?: string;
  onChangeText: (text: string) => void;
  // Остальные свойства, чтобы компонент мог принимать любые пропсы.
  [key: string]: any;
};

type SearchInputProps = InputBaseProps & {
  placeholder?: string;
};
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
  onChangeText = () => {},
  ...props
}) => {
  switch (variant) {
    case 'search':
      return <SearchInput placeholder={placeholder} onChangeText={onChangeText} {...props} />;
    case 'text':
      return (
        <CustomTextInput
          placeholder={placeholder}
          value={props.value}
          onChangeText={onChangeText}
          error={error}
          {...props}
        />
      );
    case 'number':
      return (
        <NumberInput
          placeholder={placeholder}
          required={required}
          value={props.value}
          onChangeText={onChangeText}
          error={error}
          extendedError={extendedError}
          {...props}
        />
      );
    case 'phone':
      return (
        <PhoneInput
          placeholder={placeholder}
          required={required}
          value={props.value}
          onChangeText={onChangeText}
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
          onChangeText={onChangeText}
          error={error}
          extendedError={extendedError}
          {...props}
        />
      );
    default:
      return null;
  }
};

const SearchInput: FC<SearchInputProps> = ({ placeholder, onChangeText, ...props }) => (
  <SafeAreaView {...props}>
    <View className="flex-row items-center relative mt-6">
      <TextInput
        className="w-full border-[1px] border-[#CFD8DB] pt-[18px] pb-[18px] pl-[40px] rounded-[3px]"
        onChangeText={(text) => onChangeText(text)}
        placeholder={placeholder}
      />
      <View className="absolute left-4">
        <Icons.SearchIcon />
      </View>
    </View>
  </SafeAreaView>
);

const CustomTextInput: FC<CustomTextInputProps> = ({ placeholder, error, ...props }) => {
  return (
    <View className="flex">
      <TextInput
        className={clsx(
          'w-full border-[1px] border-[#CFD8DB] py-6 pl-4 rounded-[3px]',
          error && 'border-[#E3002C]',
        )}
        inputMode="text"
        placeholder={placeholder}
        placeholderTextColor={error ? '#E3002C' : undefined}
        {...props}
      />
      {error && <Text className="mt-1 text-[#FF1644]">{error}</Text>}
    </View>
  );
};

const NumberInput: FC<PhoneInputProps> = ({
  placeholder,
  required,
  error,
  extendedError,
  onChangeText,
  ...props
}) => {
  const handleTextChange = (text: string) => {
    let numericValue = parseInt(text, 10);

    if (isNaN(numericValue)) {
      numericValue = 0;
    } else if (numericValue > 100) {
      numericValue = 100;
    } else if (numericValue < 0) {
      numericValue = 0;
    }

    if (onChangeText) {
      onChangeText(numericValue.toString());
    }
  };

  return (
    <View className="flex-row items-center relative">
      <TextInput
        className={clsx(
          'w-full border-[1px] border-[#CFD8DB] py-6 pl-4 rounded-[3px]',
          extendedError && 'border-[#E3002C]',
        )}
        inputMode="numeric"
        keyboardType={'number-pad'}
        placeholder={placeholder}
        placeholderTextColor={extendedError ? '#E3002C' : undefined}
        onChangeText={handleTextChange}
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
          (error || extendedError) && 'border-[#E3002C]',
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
