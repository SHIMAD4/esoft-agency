import { FC } from 'react';
import { Text, TouchableOpacity } from 'react-native';

type ButtonProps = {
  variant: 'add' | string;
  onPress?: () => void;
  // Остальные свойства, чтобы компонент мог принимать любые пропсы.
  [key: string]: any;
};

export const Button: FC<ButtonProps> = ({ variant, onPress, ...props }) => {
  switch (variant) {
    case 'add':
      return <AddButtonSquare onPress={onPress} {...props} />;
    default:
      return null;
  }
};

const AddButtonSquare: FC<{ onPress?: () => void }> = ({ onPress, ...props }) => {
  return (
    <TouchableOpacity
      className="flex justify-center items-center w-10 h-10 border-[1px] border-[#0091EA] rounded-[3px]"
      onPress={onPress}
      {...props}
    >
      <Text className="text-[16px] text-[#01A0FF]">+</Text>
    </TouchableOpacity>
  );
};
