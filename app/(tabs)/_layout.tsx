import { Tabs } from 'expo-router';
import React from 'react';
import { TabBar } from '@/components';

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
      <Tabs.Screen
        name="index"
        options={{
          title: 'home',
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: 'users',
        }}
      />
      {/*<Tabs.Screen*/}
      {/*  name="estate"*/}
      {/*  options={{*/}
      {/*    title: 'estate',*/}
      {/*  }}*/}
      {/*/>*/}
    </Tabs>
  );
}
