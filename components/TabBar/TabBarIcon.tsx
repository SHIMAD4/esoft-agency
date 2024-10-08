import { Image } from 'expo-image';

type TabBarIconType = {
  name: string;
  title: string;
};

type iconsType = {
  [key in string]: {
    [key in string]: string;
  };
};

// Создаем объект, который маппит комбинации значений к соответствующим путям к иконкам
const icons: iconsType = {
  home: {
    Filled: require('../../assets/images/icons/homeIcons/homeIconFilled.svg'),
    Empty: require('../../assets/images/icons/homeIcons/homeIconEmpty.svg'),
  },
  users: {
    Filled: require('../../assets/images/icons/usersIcons/usersIconFilled.svg'),
    Empty: require('../../assets/images/icons/usersIcons/usersIconEmpty.svg'),
  },
};

export function TabBarIcon({ name, title }: TabBarIconType) {
  const Icon = icons[title][name];

  return <Image source={Icon} className="w-9 h-9" />;
}
