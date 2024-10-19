import { Icons } from '../Icons';

type TabBarIconType = {
  fill: boolean;
  title: string;
};

export function TabBarIcon({ fill, title }: TabBarIconType) {
  switch (title) {
    case 'home':
      return <Icons.HomeIcon size={36} fill={fill ? '#0281D1' : 'none'} />;
    case 'users':
      return <Icons.UsersIcon size={36} fill={fill ? '#0281D1' : 'none'} />;
    case 'estate':
      return <Icons.EstatesIcon size={36} fill={fill ? '#0281D1' : 'none'} />;
    default:
      return null;
  }
}
