import { View, TouchableOpacity } from 'react-native';
import { TabBarIcon } from './TabBarIcon';
import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs/src/types';

export const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            key={route.key}
            className="flex-1 justify-center items-center h-[90px]"
          >
            <TabBarIcon title={label as string} name={isFocused ? 'Filled' : 'Empty'} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
