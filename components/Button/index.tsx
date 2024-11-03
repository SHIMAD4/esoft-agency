import { FC } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import clsx from 'clsx';
import { Icons } from '../Icons';

type ButtonProps = {
  variant: 'default' | 'add' | 'edit' | 'delete' | string;
  onPress?: () => void;
  // Остальные свойства, чтобы компонент мог принимать любые пропсы.
  [key: string]: any;
};

export const Button: FC<ButtonProps> = ({ variant, onPress, ...props }) => {
  switch (variant) {
    case 'default':
      return <DefaultButton onPress={onPress} {...props} />;
    case 'add':
      return <AddButtonSquare onPress={onPress} {...props} />;
    case 'hidden':
      return <CardHiddenButton onPress={onPress} {...props} />;
    case 'filter':
      return <FilterButtonSquare onPress={onPress} {...props} />;
    default:
      return null;
  }
};

const DefaultButton: FC<{
  onPress?: () => void;
  buttonClassNames?: string;
  text?: string;
  textClassNames?: string;
}> = ({ onPress, buttonClassNames, text, textClassNames, ...props }) => {
  return (
    <TouchableOpacity className={buttonClassNames} onPress={onPress} {...props}>
      <Text className={textClassNames}>{text}</Text>
    </TouchableOpacity>
  );
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

const CardHiddenButton: FC<{ onPress?: () => void; children?: string; className?: string }> = ({
  onPress,
  children,
  className,
  ...props
}) => {
  return (
    <TouchableOpacity
      className={clsx('flex justify-center w-[60px] h-full', className)}
      onPress={onPress}
      {...props}
    >
      <Text>{children}</Text>
    </TouchableOpacity>
  );
};

const FilterButtonSquare: FC<{ onPress?: () => void }> = ({ onPress, ...props }) => {
  return (
    <TouchableOpacity
      className="flex justify-center items-center w-10 h-10 border-[1px] border-[#37464F] rounded-[3px]"
      onPress={onPress}
      {...props}
    >
      <Icons.FilterIcon />
    </TouchableOpacity>
  );
};
