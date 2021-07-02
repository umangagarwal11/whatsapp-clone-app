/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ChatScreen from '../screens/ChatScreen';
import NewChatScreen from '../screens/NewChatScreen';
import { MainTabParamList, TabOneParamList, ChatParamList, NewChatParamList } from '../types';

import { Fontisto } from '@expo/vector-icons';
import NotFoundScreen from '../screens/NotFoundScreen';

const MainTab = createMaterialTopTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <MainTab.Navigator
      initialRouteName="Chats"
      tabBarOptions={{ 
        activeTintColor: Colors[colorScheme].background, 
        style: {
          backgroundColor: Colors[colorScheme].tint,
        },
        indicatorStyle: {
          backgroundColor: Colors[colorScheme].background,
          height: 4
        },
        labelStyle: {
          fontWeight: 'bold'
        },
        showIcon: true,
        }}>
      <MainTab.Screen
        name="Camera"
        component={TabOneNavigator}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color }) => <Fontisto name="camera" color={color} size={18} />,
        }}
      />
      <MainTab.Screen
        name="Chats"
        component={ChatNavigator}
      />
      <MainTab.Screen
        name="NewChat"
        component={NewChatNavigator}
      />
      <MainTab.Screen
        name="Calls"
        component={TabOneNavigator}
      />
    </MainTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={NotFoundScreen}
        options={{ headerShown: false }}
      />
    </TabOneStack.Navigator>
  );
}

const ChatStack = createStackNavigator<ChatParamList>();

function ChatNavigator() {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
    </ChatStack.Navigator>
  );
}

const NewChatStack = createStackNavigator<NewChatParamList>();

function NewChatNavigator() {
  return (
    <NewChatStack.Navigator>
      <NewChatStack.Screen
        name="NewChatScreen"
        component={NewChatScreen}
        options={{ headerShown: false }}
      />
    </NewChatStack.Navigator>
  );
}