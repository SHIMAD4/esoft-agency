import React, { FC, memo } from 'react';
import { Text, StyleSheet } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import { CustomTabViewProps } from '@/types';

enum Colors {
  Active = '#0281D1',
  Inactive = '#37464F',
}

export const CustomTabView: FC<CustomTabViewProps> = memo(({ navigationState, scene, setFunc }) => {
  return (
    <TabView
      navigationState={navigationState}
      renderScene={scene}
      onIndexChange={setFunc}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          activeColor={Colors.Active}
          inactiveColor={Colors.Inactive}
          indicatorStyle={styles.indicatorStyle}
          indicatorContainerStyle={styles.indicatorContainerStyle}
          tabStyle={styles.tabStyle}
          style={styles.tabBar}
          renderLabel={({ route, color }) => (
            <Text style={[styles.labelStyle, { color }]}>{route.title}</Text>
          )}
        />
      )}
    />
  );
});

const styles = StyleSheet.create({
  indicatorStyle: {
    backgroundColor: Colors.Active,
  },
  indicatorContainerStyle: {
    backgroundColor: '#E7EBEE',
    maxHeight: 2,
  },
  tabStyle: {
    backgroundColor: 'transparent',
  },
  tabBar: {
    backgroundColor: 'transparent',
    shadowColor: 'transparent',
    width: 240,
    flexDirection: 'column-reverse',
  },
  labelStyle: {
    margin: 16,
  },
});
