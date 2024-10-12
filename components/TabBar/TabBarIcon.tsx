import { HomeIcon, UsersIcon } from '../Icons';

type TabBarIconType = {
  fill: boolean;
  title: string;
};

export function TabBarIcon({ fill, title }: TabBarIconType) {
  switch (title) {
    case 'home':
      return <HomeIcon width={36} height={36} fill={fill ? '#0281D1' : 'none'} />;
    case 'users':
      return <UsersIcon width={36} height={36} fill={fill ? '#0281D1' : 'none'} />;
    default:
      return null;
  }
}
