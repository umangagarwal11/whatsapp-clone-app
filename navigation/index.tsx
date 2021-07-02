/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName, Text, View, Image } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList, AuthStackParamList } from '../types';
import MainTabNavigator from './MainTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

import colors from '../constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import LoginScreen from '../screens/LoginScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, logout } from '../features/userSlice';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {

  const stack =() =>{
    const user = useSelector(selectUser);

    if (!user) return <AuthNavigator />
    else return <RootNavigator />
  }

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {stack()}
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const dispatch = useDispatch();
  return (
    <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: colors.light.tint,
          shadowOpacity: 0,
          elevation: 0
        },
        headerTintColor: colors.light.background,
        headerTitleAlign: 'left',
      }}>
      <Stack.Screen 
          name="Root" 
          component={MainTabNavigator} 
          options = {{
            title: 'Realtime-ChatApp',
            headerRight: () => (
              <View style = {{
                marginRight: 20
              }}>
                <MaterialIcons name='logout' size={22} onPress={() => dispatch(logout())} color={colors.light.background} />
              </View>
            ) 
          }}
      />
      <Stack.Screen 
        name="ChatRoom" 
        component={ChatRoomScreen} 
        options={({ route }) => ({
            // title: null, 
            title:(
                    <View style={{flexDirection: 'row'}}>
              <Image source={{ uri: route.params.photoUrl || "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"}} style={{borderRadius: 40, height: 50, width: 50, marginRight: 20, }} />
                      <Text style = {{fontWeight: 'bold', fontSize: 18, color: '#fff', marginTop: 7}}>{route.params.displayName}</Text>
                    </View>
                  ),
          })}
      />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

const Stack1 = createStackNavigator<AuthStackParamList>();

function AuthNavigator() {

  return (
    <Stack1.Navigator 
      initialRouteName="Root"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.light.tint,
          shadowOpacity: 0,
          elevation: 0
        },
        headerTintColor: colors.light.background,
        headerTitleAlign: 'left',
      }}>
      <Stack1.Screen
        name="Root"
        component={LoginScreen}
        options={{
          title: 'Realtime-ChatApp',
        }}
      />
    </Stack1.Navigator>
  );
}
