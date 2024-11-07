import { Tabs } from 'expo-router';
import React from 'react';
import { TabBar } from '@/components';

const TabsScreens = [
  { id: 1, name: 'index', title: 'home' },
  { id: 2, name: 'users', title: 'users' },
  { id: 3, name: 'estate', title: 'estate' },
  { id: 4, name: 'deal', title: 'deal' },
  { id: 5, name: 'events', title: 'events' },
];

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        headerShadowVisible: false,
      }}
    >
      {TabsScreens.map((screen) => (
        <Tabs.Screen
          key={screen.id}
          name={screen.name}
          options={{
            title: screen.title,
          }}
        />
      ))}
    </Tabs>
  );
}
