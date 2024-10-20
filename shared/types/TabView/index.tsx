import { SceneRendererProps } from 'react-native-tab-view';
import { Dispatch, ReactNode } from 'react';

type CustomTabViewProps = {
  navigationState: NavigationStateType;
  scene: (props: SceneRendererProps & { route: RouteType }) => ReactNode;
  setFunc: Dispatch<React.SetStateAction<number>>;
};

type NavigationStateType = {
  index: number;
  routes: RouteType[];
};

type RouteType = {
  key: string;
  title: string;
};

export { CustomTabViewProps };
